<<<<<<< HEAD
# chatbot/admin.py
from django.contrib import admin
from .models import ChatSession, ChatMessage

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['student', 'subject', 'chapter', 'created_at', 'updated_at']
    list_filter = ['subject', 'created_at']
    search_fields = ['student__user__username', 'subject__display_name']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'message_type', 'content_preview', 'timestamp']
    list_filter = ['message_type', 'timestamp']
    search_fields = ['session__student__user__username', 'content']
    readonly_fields = ['timestamp']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
=======
# chatbot/admin.py
from django.contrib import admin
from .models import ChatSession, ChatMessage

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['student', 'subject', 'chapter', 'created_at', 'updated_at']
    list_filter = ['subject', 'created_at']
    search_fields = ['student__user__username', 'subject__display_name']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'message_type', 'content_preview', 'timestamp']
    list_filter = ['message_type', 'timestamp']
    search_fields = ['session__student__user__username', 'content']
    readonly_fields = ['timestamp']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
    content_preview.short_description = 'Content Preview'