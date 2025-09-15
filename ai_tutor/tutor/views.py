# tutor/views.py
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Subject, Chapter

@login_required
def subjects_view(request):
    subjects = Subject.objects.all()
    subjects_data = [
        {
            'id': subject.id,
            'name': subject.name
        }
        for subject in subjects
    ]
    return JsonResponse({'subjects': subjects_data})

@login_required
def chapters_view(request, subject_id):
    try:
        from accounts.models import StudentProfile
        profile = StudentProfile.objects.get(user=request.user)
        
        if not profile.standard_selected:
            return JsonResponse({'error': 'Standard not selected'}, status=400)
        
        chapters = Chapter.objects.filter(
            subject_id=subject_id,
            standard=profile.standard
        )
        
        chapters_data = [
            {
                'id': chapter.id,
                'title': chapter.title,
                'order': chapter.order
            }
            for chapter in chapters
        ]
        
        return JsonResponse({'chapters': chapters_data})
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)