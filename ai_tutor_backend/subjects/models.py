<<<<<<< HEAD
# subjects/models.py

from django.db import models

SUBJECT_CHOICES = [
    ('mathematics', 'Mathematics'),
    ('science', 'Science'),
    ('english', 'English'),
    ('social_studies', 'Social Studies'),
]

class Subject(models.Model):
    name = models.CharField(max_length=50, choices=SUBJECT_CHOICES, unique=True)
    display_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)  # For storing icon class names
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.display_name

    class Meta:
        db_table = 'subjects'

class Chapter(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='chapters')
    standard = models.CharField(max_length=2)
    chapter_number = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chapters'
        unique_together = ['subject', 'standard', 'chapter_number']
        ordering = ['chapter_number']

    def __str__(self):
=======
# subjects/models.py

from django.db import models

SUBJECT_CHOICES = [
    ('mathematics', 'Mathematics'),
    ('science', 'Science'),
    ('english', 'English'),
    ('social_studies', 'Social Studies'),
]

class Subject(models.Model):
    name = models.CharField(max_length=50, choices=SUBJECT_CHOICES, unique=True)
    display_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)  # For storing icon class names
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.display_name

    class Meta:
        db_table = 'subjects'

class Chapter(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='chapters')
    standard = models.CharField(max_length=2)
    chapter_number = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chapters'
        unique_together = ['subject', 'standard', 'chapter_number']
        ordering = ['chapter_number']

    def __str__(self):
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
        return f"Class {self.standard} - {self.subject.display_name} - Chapter {self.chapter_number}: {self.title}"