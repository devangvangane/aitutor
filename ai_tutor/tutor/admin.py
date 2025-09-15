#tutor/admin.py
from django.contrib import admin
from .models import Subject, Chapter

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']

@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'standard', 'order', 'created_at']
    list_filter = ['subject', 'standard']
    ordering = ['subject', 'standard', 'order']