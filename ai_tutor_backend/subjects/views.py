<<<<<<< HEAD
# subjects/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Subject, Chapter
from accounts.models import Student

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_subjects(request):
    """Get all available subjects"""
    try:
        subjects = Subject.objects.all()
        subjects_data = []
        
        for subject in subjects:
            subjects_data.append({
                'id': subject.id,
                'name': subject.name,
                'display_name': subject.display_name,
                'description': subject.description,
                'icon': subject.icon
            })
        
        return JsonResponse({'subjects': subjects_data})
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chapters(request, subject_name, student_id):
    """Get chapters for a specific subject and student's standard"""
    try:
        # Get student to find their standard
        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return JsonResponse({'error': 'Student not found'}, status=404)
        
        if not student.standard_selected:
            return JsonResponse({'error': 'Student has not selected standard yet'}, status=400)
        
        # Get subject
        try:
            subject = Subject.objects.get(name=subject_name)
        except Subject.DoesNotExist:
            return JsonResponse({'error': 'Subject not found'}, status=404)
        
        # Get chapters for the subject and student's standard
        chapters = Chapter.objects.filter(
            subject=subject,
            standard=student.standard
        ).order_by('chapter_number')
        
        chapters_data = []
        for chapter in chapters:
            chapters_data.append({
                'id': chapter.id,
                'chapter_number': chapter.chapter_number,
                'title': chapter.title,
                'description': chapter.description
            })
        
        return JsonResponse({
            'subject': {
                'name': subject.name,
                'display_name': subject.display_name
            },
            'standard': student.standard,
            'chapters': chapters_data
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chapter_detail(request, chapter_id):
    """Get detailed information about a specific chapter"""
    try:
        chapter = Chapter.objects.get(id=chapter_id)
        
        return JsonResponse({
            'id': chapter.id,
            'subject': {
                'name': chapter.subject.name,
                'display_name': chapter.subject.display_name
            },
            'standard': chapter.standard,
            'chapter_number': chapter.chapter_number,
            'title': chapter.title,
            'description': chapter.description
        })
        
    except Chapter.DoesNotExist:
        return JsonResponse({'error': 'Chapter not found'}, status=404)
    except Exception as e:
=======
# subjects/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Subject, Chapter
from accounts.models import Student

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_subjects(request):
    """Get all available subjects"""
    try:
        subjects = Subject.objects.all()
        subjects_data = []
        
        for subject in subjects:
            subjects_data.append({
                'id': subject.id,
                'name': subject.name,
                'display_name': subject.display_name,
                'description': subject.description,
                'icon': subject.icon
            })
        
        return JsonResponse({'subjects': subjects_data})
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chapters(request, subject_name, student_id):
    """Get chapters for a specific subject and student's standard"""
    try:
        # Get student to find their standard
        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return JsonResponse({'error': 'Student not found'}, status=404)
        
        if not student.standard_selected:
            return JsonResponse({'error': 'Student has not selected standard yet'}, status=400)
        
        # Get subject
        try:
            subject = Subject.objects.get(name=subject_name)
        except Subject.DoesNotExist:
            return JsonResponse({'error': 'Subject not found'}, status=404)
        
        # Get chapters for the subject and student's standard
        chapters = Chapter.objects.filter(
            subject=subject,
            standard=student.standard
        ).order_by('chapter_number')
        
        chapters_data = []
        for chapter in chapters:
            chapters_data.append({
                'id': chapter.id,
                'chapter_number': chapter.chapter_number,
                'title': chapter.title,
                'description': chapter.description
            })
        
        return JsonResponse({
            'subject': {
                'name': subject.name,
                'display_name': subject.display_name
            },
            'standard': student.standard,
            'chapters': chapters_data
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chapter_detail(request, chapter_id):
    """Get detailed information about a specific chapter"""
    try:
        chapter = Chapter.objects.get(id=chapter_id)
        
        return JsonResponse({
            'id': chapter.id,
            'subject': {
                'name': chapter.subject.name,
                'display_name': chapter.subject.display_name
            },
            'standard': chapter.standard,
            'chapter_number': chapter.chapter_number,
            'title': chapter.title,
            'description': chapter.description
        })
        
    except Chapter.DoesNotExist:
        return JsonResponse({'error': 'Chapter not found'}, status=404)
    except Exception as e:
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
        return JsonResponse({'error': str(e)}, status=500)