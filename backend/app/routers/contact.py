from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.email_service import send_contact_notification
from app.models import ContactSubmission
from app.schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/", response_model=ContactResponse)
def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    submission = ContactSubmission(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
    )
    db.add(submission)
    db.commit()

    emailed = send_contact_notification(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
    )

    if emailed:
        return ContactResponse(message="Thank you! Your message has been sent.")
    return ContactResponse(
        message="Thank you! Your message has been received."
    )
