<<<<<<< HEAD
# chatbot/views.py

import json
import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import ChatSession, ChatMessage
from accounts.models import Student
from subjects.models import Subject, Chapter

def call_ai_model(prompt, context=""):
    """Call the AI model API"""
    try:
        headers = {
            'Authorization': f'Bearer {settings.AI_MODEL_API_KEY}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'prompt': prompt,
            'context': context,
            'max_tokens': 500,
            'temperature': 0.7
        }
        
        response = requests.post(
            settings.AI_MODEL_API_URL,
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json().get('response', 'Sorry, I could not generate a response.')
        else:
            return "Sorry, I'm having trouble connecting to the AI service right now."
            
    except Exception as e:
        print(f"AI Model API Error: {e}")
        # Fallback response for development
        return f"This is a sample AI response to your question: '{prompt}'. In production, this would be replaced with actual AI model responses."

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def start_chat_session(request):
    """Start a new chat session"""
    try:
        data = json.loads(request.body)
        student_id = data.get('student_id')
        subject_name = data.get('subject_name')
        chapter_id = data.get('chapter_id')  # Optional
        
        if not all([student_id, subject_name]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        
        try:
            student = Student.objects.get(id=student_id)
            subject = Subject.objects.get(name=subject_name)
        except (Student.DoesNotExist, Subject.DoesNotExist) as e:
            return JsonResponse({'error': 'Student or Subject not found'}, status=404)
        
        chapter = None
        if chapter_id:
            try:
                chapter = Chapter.objects.get(id=chapter_id)
            except Chapter.DoesNotExist:
                pass
        
        # Create new chat session
        session = ChatSession.objects.create(
            student=student,
            subject=subject,
            chapter=chapter
        )
        
        return JsonResponse({
            'session_id': session.id,
            'message': 'Chat session started successfully'
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def send_message(request):
    """Send a message in a chat session"""
    try:
        data = json.loads(request.body)
        session_id = data.get('session_id')
        message_content = data.get('message')
        
        if not all([session_id, message_content]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        
        try:
            session = ChatSession.objects.get(id=session_id)
        except ChatSession.DoesNotExist:
            return JsonResponse({'error': 'Chat session not found'}, status=404)
        
        # Save user message
        user_message = ChatMessage.objects.create(
            session=session,
            message_type='user',
            content=message_content
        )
        
        # Prepare context for AI model
        context = f"Subject: {session.subject.display_name}, Standard: Class {session.student.standard}"
        if session.chapter:
            context += f", Chapter: {session.chapter.title}"
        
        # Get previous conversation for context (last 5 messages)
        previous_messages = ChatMessage.objects.filter(session=session).order_by('-timestamp')[:5]
        conversation_history = ""
        for msg in reversed(previous_messages):
            conversation_history += f"{msg.message_type}: {msg.content}\n"
        
        full_context = f"{context}\n\nConversation History:\n{conversation_history}"
        
        # Call AI model
        ai_response = call_ai_model(message_content, full_context)
        
        # Save AI response
        ai_message = ChatMessage.objects.create(
            session=session,
            message_type='ai',
            content=ai_response
        )
        
        # Update session timestamp
        session.save()
        
        return JsonResponse({
            'user_message_id': user_message.id,
            'ai_message_id': ai_message.id,
            'ai_response': ai_response,
            'timestamp': ai_message.timestamp.isoformat()
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chat_sessions(request, student_id):
    """Get all chat sessions for a student"""
    try:
        student = Student.objects.get(id=student_id)
        sessions = ChatSession.objects.filter(student=student)
        
        sessions_data = []
        for session in sessions:
            last_message = session.messages.last()
            sessions_data.append({
                'id': session.id,
                'subject': {
                    'name': session.subject.name,
                    'display_name': session.subject.display_name
                },
                'chapter': {
                    'id': session.chapter.id if session.chapter else None,
                    'title': session.chapter.title if session.chapter else None
                } if session.chapter else None,
                'session_title': session.session_title,
                'created_at': session.created_at.isoformat(),
                'updated_at': session.updated_at.isoformat(),
                'last_message': last_message.content[:100] + '...' if last_message and len(last_message.content) > 100 else last_message.content if last_message else None
            })
        
        return JsonResponse({'sessions': sessions_data})
        
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chat_messages(request, session_id):
    """Get all messages for a specific chat session"""
    try:
        session = ChatSession.objects.get(id=session_id)
        messages = session.messages.all()
        
        messages_data = []
        for message in messages:
            messages_data.append({
                'id': message.id,
                'message_type': message.message_type,
                'content': message.content,
                'timestamp': message.timestamp.isoformat()
            })
        
        return JsonResponse({
            'session_id': session.id,
            'subject': {
                'name': session.subject.name,
                'display_name': session.subject.display_name
            },
            'chapter': {
                'id': session.chapter.id if session.chapter else None,
                'title': session.chapter.title if session.chapter else None
            } if session.chapter else None,
            'messages': messages_data
        })
        
    except ChatSession.DoesNotExist:
        return JsonResponse({'error': 'Chat session not found'}, status=404)
    except Exception as e:
=======
# chatbot/views.py

import json
import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import ChatSession, ChatMessage
from accounts.models import Student
from subjects.models import Subject, Chapter

def call_ai_model(prompt, context=""):
    """Call the AI model API"""
    try:
        headers = {
            'Authorization': f'Bearer {settings.AI_MODEL_API_KEY}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'prompt': prompt,
            'context': context,
            'max_tokens': 500,
            'temperature': 0.7
        }
        
        response = requests.post(
            settings.AI_MODEL_API_URL,
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json().get('response', 'Sorry, I could not generate a response.')
        else:
            return "Sorry, I'm having trouble connecting to the AI service right now."
            
    except Exception as e:
        print(f"AI Model API Error: {e}")
        # Fallback response for development
        return f"This is a sample AI response to your question: '{prompt}'. In production, this would be replaced with actual AI model responses."

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def start_chat_session(request):
    """Start a new chat session"""
    try:
        data = json.loads(request.body)
        student_id = data.get('student_id')
        subject_name = data.get('subject_name')
        chapter_id = data.get('chapter_id')  # Optional
        
        if not all([student_id, subject_name]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        
        try:
            student = Student.objects.get(id=student_id)
            subject = Subject.objects.get(name=subject_name)
        except (Student.DoesNotExist, Subject.DoesNotExist) as e:
            return JsonResponse({'error': 'Student or Subject not found'}, status=404)
        
        chapter = None
        if chapter_id:
            try:
                chapter = Chapter.objects.get(id=chapter_id)
            except Chapter.DoesNotExist:
                pass
        
        # Create new chat session
        session = ChatSession.objects.create(
            student=student,
            subject=subject,
            chapter=chapter
        )
        
        return JsonResponse({
            'session_id': session.id,
            'message': 'Chat session started successfully'
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def send_message(request):
    """Send a message in a chat session"""
    try:
        data = json.loads(request.body)
        session_id = data.get('session_id')
        message_content = data.get('message')
        
        if not all([session_id, message_content]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)
        
        try:
            session = ChatSession.objects.get(id=session_id)
        except ChatSession.DoesNotExist:
            return JsonResponse({'error': 'Chat session not found'}, status=404)
        
        # Save user message
        user_message = ChatMessage.objects.create(
            session=session,
            message_type='user',
            content=message_content
        )
        
        # Prepare context for AI model
        context = f"Subject: {session.subject.display_name}, Standard: Class {session.student.standard}"
        if session.chapter:
            context += f", Chapter: {session.chapter.title}"
        
        # Get previous conversation for context (last 5 messages)
        previous_messages = ChatMessage.objects.filter(session=session).order_by('-timestamp')[:5]
        conversation_history = ""
        for msg in reversed(previous_messages):
            conversation_history += f"{msg.message_type}: {msg.content}\n"
        
        full_context = f"{context}\n\nConversation History:\n{conversation_history}"
        
        # Call AI model
        ai_response = call_ai_model(message_content, full_context)
        
        # Save AI response
        ai_message = ChatMessage.objects.create(
            session=session,
            message_type='ai',
            content=ai_response
        )
        
        # Update session timestamp
        session.save()
        
        return JsonResponse({
            'user_message_id': user_message.id,
            'ai_message_id': ai_message.id,
            'ai_response': ai_response,
            'timestamp': ai_message.timestamp.isoformat()
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chat_sessions(request, student_id):
    """Get all chat sessions for a student"""
    try:
        student = Student.objects.get(id=student_id)
        sessions = ChatSession.objects.filter(student=student)
        
        sessions_data = []
        for session in sessions:
            last_message = session.messages.last()
            sessions_data.append({
                'id': session.id,
                'subject': {
                    'name': session.subject.name,
                    'display_name': session.subject.display_name
                },
                'chapter': {
                    'id': session.chapter.id if session.chapter else None,
                    'title': session.chapter.title if session.chapter else None
                } if session.chapter else None,
                'session_title': session.session_title,
                'created_at': session.created_at.isoformat(),
                'updated_at': session.updated_at.isoformat(),
                'last_message': last_message.content[:100] + '...' if last_message and len(last_message.content) > 100 else last_message.content if last_message else None
            })
        
        return JsonResponse({'sessions': sessions_data})
        
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def get_chat_messages(request, session_id):
    """Get all messages for a specific chat session"""
    try:
        session = ChatSession.objects.get(id=session_id)
        messages = session.messages.all()
        
        messages_data = []
        for message in messages:
            messages_data.append({
                'id': message.id,
                'message_type': message.message_type,
                'content': message.content,
                'timestamp': message.timestamp.isoformat()
            })
        
        return JsonResponse({
            'session_id': session.id,
            'subject': {
                'name': session.subject.name,
                'display_name': session.subject.display_name
            },
            'chapter': {
                'id': session.chapter.id if session.chapter else None,
                'title': session.chapter.title if session.chapter else None
            } if session.chapter else None,
            'messages': messages_data
        })
        
    except ChatSession.DoesNotExist:
        return JsonResponse({'error': 'Chat session not found'}, status=404)
    except Exception as e:
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
        return JsonResponse({'error': str(e)}, status=500)