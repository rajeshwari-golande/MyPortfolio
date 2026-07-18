"""Send contact-form notifications via Resend or Web3Forms."""

import logging

import httpx

from app.config import settings

logger = logging.getLogger(__name__)


def send_contact_notification(
    *,
    name: str,
    email: str,
    subject: str,
    message: str,
) -> bool:
    """
    Notify the portfolio owner that someone submitted the contact form.
    Returns True if an email provider accepted the request.
    """
    if settings.resend_api_key.strip():
        return _send_via_resend(name=name, email=email, subject=subject, message=message)

    if settings.web3forms_access_key.strip():
        return _send_via_web3forms(name=name, email=email, subject=subject, message=message)

    logger.warning(
        "Contact saved to DB only — set RESEND_API_KEY or WEB3FORMS_ACCESS_KEY to receive email."
    )
    return False


def _send_via_resend(*, name: str, email: str, subject: str, message: str) -> bool:
    to_email = settings.contact_to_email.strip()
    if not to_email:
        logger.error("CONTACT_TO_EMAIL is not set")
        return False

    from_email = settings.resend_from_email.strip() or "Portfolio Contact <onboarding@resend.dev>"
    payload = {
        "from": from_email,
        "to": [to_email],
        "reply_to": email,
        "subject": f"[Portfolio] {subject}",
        "text": (
            f"New message from your portfolio contact form.\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Subject: {subject}\n\n"
            f"Message:\n{message}\n"
        ),
    }

    try:
        response = httpx.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.resend_api_key.strip()}",
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=20.0,
        )
        if response.is_success:
            return True
        logger.error("Resend failed (%s): %s", response.status_code, response.text)
        return False
    except Exception:
        logger.exception("Resend request failed")
        return False


def _send_via_web3forms(*, name: str, email: str, subject: str, message: str) -> bool:
    payload = {
        "access_key": settings.web3forms_access_key.strip(),
        "name": name,
        "email": email,
        "subject": f"[Portfolio] {subject}",
        "message": message,
        "from_name": "Portfolio Contact Form",
    }
    if settings.contact_to_email.strip():
        payload["to"] = settings.contact_to_email.strip()

    try:
        response = httpx.post(
            "https://api.web3forms.com/submit",
            json=payload,
            timeout=20.0,
        )
        if response.is_success:
            data = response.json()
            return bool(data.get("success", True))
        logger.error("Web3Forms failed (%s): %s", response.status_code, response.text)
        return False
    except Exception:
        logger.exception("Web3Forms request failed")
        return False
