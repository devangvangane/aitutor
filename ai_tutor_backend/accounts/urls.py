<<<<<<< HEAD
from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.register_or_login, name='register_or_login'),
    path('select-standard/', views.select_standard, name='select_standard'),
    path('profile/<int:student_id>/', views.get_student_profile, name='get_student_profile'),
=======
from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.register_or_login, name='register_or_login'),
    path('select-standard/', views.select_standard, name='select_standard'),
    path('profile/<int:student_id>/', views.get_student_profile, name='get_student_profile'),
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
]