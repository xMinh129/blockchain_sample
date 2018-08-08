from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from blockchain_hack.main import bcrypt
from blockchain_hack.main import db_session

Base = declarative_base()


class Users(Base):
    __tablename__ = 'Users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True)
    userName = Column(String(255), unique=True)
    fullName = Column(String(255))
    password = Column(String(255))

    def __init__(self, email, userName, fullName, password):
        self.email = email
        self.userName = userName
        self.fullName = fullName
        self.active = True
        self.password = Users.hashed_password(password)

    def __repr__(self):
        """Show this object (database record)"""
        return "User(%d, %s, %s, %s, %s)" % (
            self.id, self.email, self.userName, self.fullName, self.password)

    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")

    @staticmethod
    def get_user_with_username_and_password(userName, password):
        user = db_session.query(Users).filter_by(userName=userName).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None
