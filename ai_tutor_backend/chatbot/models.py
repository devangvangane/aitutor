<<<<<<< HEAD
# chatbot/models.py

from django.db import models
from accounts.models import Student
from subjects.models import Subject, Chapter

class ChatSession(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='chat_sessions')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, null=True, blank=True)
    session_title = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'chat_sessions'
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.student.user.username} - {self.subject.display_name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

class ChatMessage(models.Model):
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('ai', 'AI'),
    ]

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chat_messages'
        ordering = ['timestamp']

    def __str__(self):
=======
# chatbot/models.py

from django.db import models
from accounts.models import Student
from subjects.models import Subject, Chapter

class ChatSession(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='chat_sessions')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, null=True, blank=True)
    session_title = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'chat_sessions'
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.student.user.username} - {self.subject.display_name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

class ChatMessage(models.Model):
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('ai', 'AI'),
    ]

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chat_messages'
        ordering = ['timestamp']

    def __str__(self):
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
        return f"{self.message_type}: {self.content[:50]}..."