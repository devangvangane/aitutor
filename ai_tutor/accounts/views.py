# accounts/views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db import transaction
import json
from .models import StudentProfile

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            
            # Validation
            if not username or not email or not password:
                return JsonResponse({'error': 'All fields are required'}, status=400)
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)
            
            # Create user and profile
            with transaction.atomic():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password
                )
                StudentProfile.objects.create(user=user)
            
            return JsonResponse({
                'message': 'Registration successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=400)
            
            try:
                user = User.objects.get(email=email)
                user = authenticate(request, username=user.username, password=password)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
            
            if user:
                login(request, user)
                profile = StudentProfile.objects.get(user=user)
                
                return JsonResponse({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'standard_selected': profile.standard_selected,
                        'standard': profile.standard
                    }
                })
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'})

@login_required
@csrf_exempt
def select_standard_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            standard = data.get('standard')
            
            if not standard:
                return JsonResponse({'error': 'Standard is required'}, status=400)
            
            profile = StudentProfile.objects.get(user=request.user)
            profile.standard = standard
            profile.standard_selected = True
            profile.save()
            
            return JsonResponse({
                'message': 'Standard selected successfully',
                'standard': standard
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except StudentProfile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@login_required
def user_info_view(request):
    try:
        profile = StudentProfile.objects.get(user=request.user)
        return JsonResponse({
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'standard_selected': profile.standard_selected,
                'standard': profile.standard
            }
        })
    except StudentProfile.DoesNotExist:
        return JsonResponse({'error': 'Profile not found'}, status=404)
