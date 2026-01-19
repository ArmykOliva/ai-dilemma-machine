"""
Game API endpoints for the AI Dilemma Machine.

Handles session creation, choice recording, and statistics.
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.db.database import get_session
from app.db.models import GameSession, DilemmaChoice
from app.schemas.game import (
    SessionResponse,
    ChoiceCreate,
    ChoiceResponse,
    DilemmaStats,
    SessionSummary,
)

router = APIRouter(prefix="/game", tags=["game"])


@router.post("/sessions", response_model=SessionResponse)
async def create_session(db: AsyncSession = Depends(get_session)):
    """Create a new game session and return its ID."""
    session = GameSession()
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session


@router.get("/sessions/{session_id}", response_model=SessionResponse)
async def get_session_info(session_id: str, db: AsyncSession = Depends(get_session)):
    """Get information about a specific session."""
    session = await db.get(GameSession, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.post("/sessions/{session_id}/choices", response_model=ChoiceResponse)
async def record_choice(
    session_id: str,
    choice_data: ChoiceCreate,
    db: AsyncSession = Depends(get_session)
):
    """Record a player's choice for a dilemma and return statistics."""
    # Validate session exists
    session = await db.get(GameSession, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Validate choice
    if choice_data.choice not in ("A", "B"):
        raise HTTPException(status_code=400, detail="Choice must be 'A' or 'B'")
    
    # Check if choice already exists for this dilemma in this session
    result = await db.execute(
        select(DilemmaChoice).where(
            DilemmaChoice.session_id == session_id,
            DilemmaChoice.dilemma_id == choice_data.dilemma_id
        )
    )
    existing = result.scalars().first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Choice already recorded for this dilemma")
    
    # Create the choice
    choice = DilemmaChoice(
        session_id=session_id,
        dilemma_id=choice_data.dilemma_id,
        choice=choice_data.choice
    )
    db.add(choice)
    await db.commit()
    await db.refresh(choice)
    
    # Calculate percentage of players who made the same choice
    total_result = await db.execute(
        select(func.count(DilemmaChoice.id)).where(
            DilemmaChoice.dilemma_id == choice_data.dilemma_id
        )
    )
    total_count = total_result.scalar() or 0
    
    same_result = await db.execute(
        select(func.count(DilemmaChoice.id)).where(
            DilemmaChoice.dilemma_id == choice_data.dilemma_id,
            DilemmaChoice.choice == choice_data.choice
        )
    )
    same_count = same_result.scalar() or 0
    
    percentage_same = (same_count / total_count * 100) if total_count > 0 else 100.0
    
    return ChoiceResponse(
        id=choice.id,
        dilemma_id=choice.dilemma_id,
        choice=choice.choice,
        session_id=choice.session_id,
        percentage_same=round(percentage_same, 1)
    )


@router.get("/stats/{dilemma_id}", response_model=DilemmaStats)
async def get_dilemma_stats(dilemma_id: str, db: AsyncSession = Depends(get_session)):
    """Get statistics for a specific dilemma."""
    total_result = await db.execute(
        select(func.count(DilemmaChoice.id)).where(
            DilemmaChoice.dilemma_id == dilemma_id
        )
    )
    total = total_result.scalar() or 0
    
    choice_a_result = await db.execute(
        select(func.count(DilemmaChoice.id)).where(
            DilemmaChoice.dilemma_id == dilemma_id,
            DilemmaChoice.choice == "A"
        )
    )
    choice_a = choice_a_result.scalar() or 0
    choice_b = total - choice_a
    
    return DilemmaStats(
        dilemma_id=dilemma_id,
        total_responses=total,
        choice_a_count=choice_a,
        choice_b_count=choice_b,
        choice_a_percentage=round(choice_a / total * 100, 1) if total > 0 else 50.0,
        choice_b_percentage=round(choice_b / total * 100, 1) if total > 0 else 50.0
    )


@router.post("/sessions/{session_id}/complete", response_model=SessionSummary)
async def complete_session(session_id: str, db: AsyncSession = Depends(get_session)):
    """Mark a session as complete and return the summary."""
    session = await db.get(GameSession, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Mark as completed
    session.completed_at = datetime.utcnow()
    db.add(session)
    await db.commit()
    
    # Get all choices for this session
    result = await db.execute(
        select(DilemmaChoice).where(DilemmaChoice.session_id == session_id)
    )
    choices = result.scalars().all()
    
    choice_responses = []
    stats_list = []
    seen_dilemmas = set()
    
    for choice in choices:
        # Calculate percentage for each choice
        total_result = await db.execute(
            select(func.count(DilemmaChoice.id)).where(
                DilemmaChoice.dilemma_id == choice.dilemma_id
            )
        )
        total = total_result.scalar() or 0
        
        same_result = await db.execute(
            select(func.count(DilemmaChoice.id)).where(
                DilemmaChoice.dilemma_id == choice.dilemma_id,
                DilemmaChoice.choice == choice.choice
            )
        )
        same = same_result.scalar() or 0
        
        percentage = (same / total * 100) if total > 0 else 100.0
        
        choice_responses.append(ChoiceResponse(
            id=choice.id,
            dilemma_id=choice.dilemma_id,
            choice=choice.choice,
            session_id=choice.session_id,
            percentage_same=round(percentage, 1)
        ))
        
        # Collect stats for each unique dilemma
        if choice.dilemma_id not in seen_dilemmas:
            seen_dilemmas.add(choice.dilemma_id)
            choice_a_result = await db.execute(
                select(func.count(DilemmaChoice.id)).where(
                    DilemmaChoice.dilemma_id == choice.dilemma_id,
                    DilemmaChoice.choice == "A"
                )
            )
            choice_a = choice_a_result.scalar() or 0
            choice_b = total - choice_a
            
            stats_list.append(DilemmaStats(
                dilemma_id=choice.dilemma_id,
                total_responses=total,
                choice_a_count=choice_a,
                choice_b_count=choice_b,
                choice_a_percentage=round(choice_a / total * 100, 1) if total > 0 else 50.0,
                choice_b_percentage=round(choice_b / total * 100, 1) if total > 0 else 50.0
            ))
    
    return SessionSummary(
        session_id=session_id,
        choices=choice_responses,
        stats=stats_list
    )
