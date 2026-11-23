from api.config import settings


def get_current_user_id() -> str:
    """Temporary: always returns the dev user.

    Sai's login ticket replaces this with the real Clerk user.
    """
    return settings.dev_user_id