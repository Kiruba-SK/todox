from django.urls import path
import apiApp.views as v

urlpatterns = [
    path("csrf/", v.csrf_token_view, name="csrf"),
    path("",v.index,name='index'),
    path('login',v.login,name='login'),
    path('create_todo',v.create_todo,name='create_todo'),
    path('intial_call',v.intial_call,name='intial_call'),
    path('completed',v.completed,name='completed'),
    path('in_progress',v.in_progress,name='in_progress'),
    path('archieved',v.archieved,name='archieved'),
    path('complete_task',v.complete_task,name='complete_task'),
    path('archieved_task',v.archieved_task,name='archieved_task'),
    path('delete_task',v.delete_task,name='delete_task'),
    path('update_task',v.update_task,name='update_task'),
    path('create_user',v.create_user,name='create_user'),
] 