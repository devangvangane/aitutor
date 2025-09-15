# accounts/views.py

import json
import requests
from django.conf import settings
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Student

def verify_clerk_token(clerk_token):
    """Verify Clerk JWT token"""
    try:
        headers = {
            'Authorization': f'Bearer {settings.CLERK_SECRET_KEY}',
            'Content-Type': 'application/json'
        }
        
        response = requests.post(
            'https://api.clerk.dev/v1/sessions/verify',
            headers=headers,
            json={'token': clerk_token}
        )
        
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"Error verifying Clerk token: {e}")
        return None

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_or_login(request):
    """Handle user registration/login with Clerk"""
    try:
        data = json.loads(request.body)
        clerk_token = data.get('clerk_token')
        clerk_user_id = data.get('clerk_user_id')
        email = data.get('email')
        username = data.get('username')
        
        if not all([clerk_token, clerk_user_id, email]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        
        # Verify Clerk token
        clerk_data = verify_clerk_token(clerk_token)
        if not clerk_data:
            return JsonResponse({'error': 'Invalid Clerk token'}, status=401)
        
        # Check if student already exists
        try:
            student = Student.objects.get(clerk_user_id=clerk_user_id)
            return JsonResponse({
                'message': 'Login successful',
                'student_id': student.id,
                'standard_selected': student.standard_selected,
                'standard': student.standard
            })
        except Student.DoesNotExist:
            pass
        
        # Create new user and student
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create_user(
                username=username or email,
                email=email,
                password=None  # Clerk handles authentication
            )
        
        student = Student.objects.create(
            user=user,
            clerk_user_id=clerk_user_id
        )
        
        return JsonResponse({
            'message': 'Registration successful',
            'student_id': student.id,
            'standard_selected': False,
            'standard': None
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def select_standard(request):
    """Handle standard selection for new students"""
    try:
        data = json.loads(request.body)
        student_id = data.get('student_id')
        standard = data.get('standard')
        
        if not all([student_id, standard]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        
        try:
            student = Student.objects.get(id=student_id)
            
            if student.standard_selected:
                return JsonResponse({'error': 'Standard already selected'}, status=400)
            
            student.standard = standard
            student.standard_selected = True
            student.save()
            
            return JsonResponse({
                'message': 'Standard selected successfully',
                'standard': standard
            })
            
        except Student.DoesNotExist:
            return JsonResponse({'error': 'Student not found'}, status=404)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_student_profile(request, student_id):
    """Get student profile information"""
    try:
        student = Student.objects.get(id=student_id)
        
        return JsonResponse({
            'student_id': student.id,
            'username': student.user.username,
            'email': student.user.email,
            'standard': student.standard,
            'standard_selected': student.standard_selected
        })
        
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)