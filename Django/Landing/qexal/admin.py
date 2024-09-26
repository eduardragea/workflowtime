from django.contrib import admin
from .models import EmailOpenEvent

@admin.register(EmailOpenEvent)
class EmailOpenEventAdmin(admin.ModelAdmin):
    list_display = ['email_id', 'opened_at', 'ip_address']  # Fields to display in the admin list view
    list_filter = ['opened_at']  # Add filters for dates
    search_fields = ['email_id']  # Add search capability by email
