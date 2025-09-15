<<<<<<< HEAD
from django.db import models

# Create your models here.
# accounts/models.py

from django.db import models
from django.contrib.auth.models import User

STANDARD_CHOICES = [
    ('8', 'Class 8'),
    ('9', 'Class 9'),
    ('10', 'Class 10'),
    ('11', 'Class 11'),
    ('12', 'Class 12'),
]

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clerk_user_id = models.CharField(max_length=255, unique=True)
    standard = models.CharField(max_length=2, choices=STANDARD_CHOICES, null=True, blank=True)
    standard_selected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Class {self.standard}"

    class Meta:
=======
from django.db import models

# Create your models here.
# accounts/models.py

from django.db import models
from django.contrib.auth.models import User

STANDARD_CHOICES = [
    ('8', 'Class 8'),
    ('9', 'Class 9'),
    ('10', 'Class 10'),
    ('11', 'Class 11'),
    ('12', 'Class 12'),
]

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clerk_user_id = models.CharField(max_length=255, unique=True)
    standard = models.CharField(max_length=2, choices=STANDARD_CHOICES, null=True, blank=True)
    standard_selected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Class {self.standard}"

    class Meta:
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
        db_table = 'students'