<<<<<<< HEAD
# accounts/admin.py
from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'standard', 'standard_selected', 'created_at']
    list_filter = ['standard', 'standard_selected', 'created_at']
    search_fields = ['user__username', 'user__email', 'clerk_user_id']
=======
# accounts/admin.py
from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'standard', 'standard_selected', 'created_at']
    list_filter = ['standard', 'standard_selected', 'created_at']
    search_fields = ['user__username', 'user__email', 'clerk_user_id']
>>>>>>> 50b94bd00b5467019713ceacbdd16c2c3a09963a
    readonly_fields = ['created_at', 'updated_at']