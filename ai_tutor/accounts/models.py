from django.db import models
from django.contrib.auth.models import User

class StudentProfile(models.Model):
    STANDARD_CHOICES = [
        ('8', 'Standard 8'),
        ('9', 'Standard 9'),
        ('10', 'Standard 10'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    standard = models.CharField(max_length=2, choices=STANDARD_CHOICES, null=True, blank=True)
    standard_selected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Standard {self.standard}"