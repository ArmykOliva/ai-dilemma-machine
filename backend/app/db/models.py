from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship, Column, DateTime
from sqlalchemy import func
import uuid


class GameSession(SQLModel, table=True):
    """
    A game session for tracking player choices across dilemmas.
    """
    __tablename__ = "game_sessions"
    
    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True,
        max_length=36
    )
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    completed_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True), nullable=True)
    )
    
    # Relationship to choices
    choices: List["DilemmaChoice"] = Relationship(back_populates="session")


class DilemmaChoice(SQLModel, table=True):
    """
    A single choice made by a player for a dilemma.
    """
    __tablename__ = "dilemma_choices"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    dilemma_id: str = Field(max_length=100, index=True)  # e.g., "digital-afterlife"
    choice: str = Field(max_length=1)  # "A" or "B"
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    
    # Session relationship
    session_id: str = Field(foreign_key="game_sessions.id", max_length=36)
    session: Optional[GameSession] = Relationship(back_populates="choices")
