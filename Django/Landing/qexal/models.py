# models.py
from django.db import models
from django.utils import timezone

class EmailOpenEvent(models.Model):
    email_id = models.EmailField()
    opened_at = models.DateTimeField(default=timezone.now)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return f"Email {self.email_id} opened at {self.opened_at}"
