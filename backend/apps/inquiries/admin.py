from django.contrib import admin

from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "contact", "subject", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "contact", "subject", "message")
    readonly_fields = ("name", "contact", "subject", "message", "created_at", "updated_at")
    fieldsets = (
        ("Inquiry", {"fields": ("name", "contact", "subject", "message", "created_at")}),
        ("Triage", {"fields": ("status", "internal_note")}),
    )
    list_editable = ("status",)
    date_hierarchy = "created_at"

    def has_add_permission(self, request):
        # Inquiries only ever arrive through the public form.
        return False
