<<<<<<< HEAD
# subjects/admin.py
from django.contrib import admin
from .models import Subject, Chapter

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['display_name', 'name', 'created_at']
    search_fields = ['name', 'display_name']
    readonly_fields = ['created_at']

@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'standard', 'chapter_number', 'created_at']
    list_filter = ['subject', 'standard', 'created_at']
    search_fields = ['title', 'subject__display_name']
    ordering = ['subject', 'standard', 'chapter_number']
=======
# subjects/admin.py
from django.contrib import admin
from .models import Subject, Chapter

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['display_name', 'name', 'created_at']
    search_fields = ['name', 'display_name']
    readonly_fields = ['created_at']

@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'standard', 'chapter_number', 'created_at']
    list_filter = ['subject', 'standard', 'created_at']
    search_fields = ['title', 'subject__display_name']
    ordering = ['subject', 'standard', 'chapter_number']
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
    readonly_fields = ['created_at']