from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

# Password hashing context
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
