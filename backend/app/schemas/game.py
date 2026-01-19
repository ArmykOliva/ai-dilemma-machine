from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SessionCreate(BaseModel):
    """Request to create a new game session."""
    pass


class SessionResponse(BaseModel):
    """Response with session details."""
    id: str
    created_at: datetime
    completed_at: Optional[datetime] = None


class ChoiceCreate(BaseModel):
    """Request to record a choice."""
    dilemma_id: str
    choice: str  # "A" or "B"


class ChoiceResponse(BaseModel):
    """Response after recording a choice."""
    id: int
    dilemma_id: str
    choice: str
    session_id: str
    percentage_same: float  # Percentage of players who made the same choice


class DilemmaStats(BaseModel):
    """Statistics for a single dilemma."""
    dilemma_id: str
    total_responses: int
    choice_a_count: int
    choice_b_count: int
    choice_a_percentage: float
    choice_b_percentage: float


class SessionSummary(BaseModel):
    """Summary of a completed game session."""
    session_id: str
    choices: list[ChoiceResponse]
    stats: list[DilemmaStats]
