from passlib.context import CryptContext

pass_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password: str):

    return pass_context.hash(password)

def verify_password(plain_password: str,hashed_password: str):

    return pass_context.verify(
        plain_password,
        hashed_password
    )