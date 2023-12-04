#!/usr/bin/env python3
"""The chat model"""

from sqlalchemy import Column, String, ForeignKey, Text, JSON
from models.base_model import BaseModel, Base

class Chat(BaseModel, Base):
    """Defines a chat object"""

    __tablename__ = "chats"

    userID = Column(String(60), ForeignKey('users.id'), nullable=False)
    chat = Column(JSON, nullable=False)
