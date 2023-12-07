#!/usr/bin/env python3
"""The recipe display picture model"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class RecipeDP(BaseModel, Base):
    """Defines a recipe DP object"""

    __tablename__ = 'recipe_dps'

    filePath = Column(String(384), nullable=False, default="https://icons.iconarchive.com/icons/mcdo-design/closed-notes/256/Diary-Recipe-icon.png")
    fileType = Column(String(30), nullable=False, default="link")
    recipeID = Column(String(60), ForeignKey('recipes.id'), nullable=False)
    recipe = relationship('Recipe', backref='dps', cascade='all, delete')
