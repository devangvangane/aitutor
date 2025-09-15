# accounts/admin.py
from django.contrib import admin
from .models import StudentProfile

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'standard', 'standard_selected', 'created_at']
    list_filter = ['standard', 'standard_selected']
