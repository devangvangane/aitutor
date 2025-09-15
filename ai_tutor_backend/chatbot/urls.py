<<<<<<< HEAD
# chatbot/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('start-session/', views.start_chat_session, name='start_chat_session'),
    path('send-message/', views.send_message, name='send_message'),
    path('sessions/<int:student_id>/', views.get_chat_sessions, name='get_chat_sessions'),
    path('messages/<int:session_id>/', views.get_chat_messages, name='get_chat_messages'),
=======
# chatbot/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('start-session/', views.start_chat_session, name='start_chat_session'),
    path('send-message/', views.send_message, name='send_message'),
    path('sessions/<int:student_id>/', views.get_chat_sessions, name='get_chat_sessions'),
    path('messages/<int:session_id>/', views.get_chat_messages, name='get_chat_messages'),
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
]