<<<<<<< HEAD
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_subjects, name='get_subjects'),
    path('<str:subject_name>/chapters/<int:student_id>/', views.get_chapters, name='get_chapters'),
    path('chapters/<int:chapter_id>/', views.get_chapter_detail, name='get_chapter_detail'),
=======
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_subjects, name='get_subjects'),
    path('<str:subject_name>/chapters/<int:student_id>/', views.get_chapters, name='get_chapters'),
    path('chapters/<int:chapter_id>/', views.get_chapter_detail, name='get_chapter_detail'),
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
]