from django.shortcuts import render
import json
import os
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import render
from django.contrib.auth.hashers import make_password,check_password
from apiApp.models import user_cred,todo_data
from collections import Counter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.middleware.csrf import get_token

# Create your views here.

def csrf_token_view(request):
    return JsonResponse({"csrfToken": get_token(request)})

def index(request):
    manifest_path = os.path.join(settings.BASE_DIR, "Frontend", "build", "asset-manifest.json")

    try:
        with open(manifest_path) as f:
            manifest = json.load(f)
            main_js = manifest["files"].get("main.js", "/static/js/main.js")
            main_css = manifest["files"].get("main.css", "/static/css/main.css")
    except (FileNotFoundError, KeyError):
        main_js = "/static/js/main.js"  # Fallback if manifest is missing
        main_css = "/static/css/main.css"  # Fallback if manifest is missing

    return render(request, "index.html", {"main_js": main_js, "main_css": main_css})

def get_stats():
    all_todos = list(todo_data.objects.values())  # Fetch all tasks
    status_counts = Counter(todo['status'] for todo in all_todos)  # Count statuses
    
    return [
        {'label': 'All', 'value': len(all_todos)},
        {'label': 'Completed', 'value': status_counts.get('completed', 0)},
        {'label': 'In Progress', 'value': status_counts.get('in progress', 0)},
        {'label': 'Archieved', 'value': status_counts.get('archieved', 0)},
    ]

@api_view(['POST'])
def login(request,format=None):
    username = request.data['username']
    password = request.data['password']
    try:
        user_get = user_cred.objects.get(username = username)
    except:
        return Response({'message': 'user does not exist'})
    
    if(check_password(password, user_get.password)):
        return Response({
                        'message':'Successfully logined',
                        })
    else:
        return Response({
                        'message': 'Wrong Credentials',  
                        })

@api_view(['POST'])
def create_todo(request, format=None):
    title_input = request.data.get('title', '')  # Use .get() to avoid KeyErrors
    desc_input = request.data.get('desc', '')
    
    status_input = 'in progress'

    obj = todo_data.objects.create(
        title=title_input,
        desc=desc_input,
        status=status_input
    )
    obj.save()

    # Fetch all todos
    all_todos = list(todo_data.objects.values())


    return Response({
        'message': 'Todo Created Successfully',
        'todo_data': all_todos,
        'stats': get_stats()
    })

@api_view(['GET'])
def intial_call(request,format=None):

    # all = todo_data.objects.all().values().count()
    # completed = todo_data.objects.filter(status = 'completed').values().count()
    # inprogress = todo_data.objects.filter(status = 'in progress').values().count()
    # archieved =todo_data.objects.filter(status = 'archieved').values().count()
    # stats = [
    #         { 
    #         "label": "All", 
    #         "value": all 
    #         },
    #         { 
    #         "label": "Completed", 
    #         "value":  completed
    #         },
    #         { 
    #         "label": "In Progress", 
    #         "value": inprogress
    #         },
    #         { 
    #         "label": "Archieved", 
    #         "value":  archieved
    #         }
    # ]

    todo = todo_data.objects.exclude(status = "archieved").all().values('id','title','desc','status')
    return Response({
                    'message':'sucessfull',
                    'stats': get_stats(),
                    'todo_data': todo,
                    })

@api_view(['GET'])
def completed(request,format=None):
    obj = todo_data.objects.filter(status='completed').values('id','title','desc','status')

    return Response({
                    'message':'successfull',
                    'todo_data': obj,
                    'stats': get_stats(), 
    })

@api_view(['GET'])
def in_progress(request,format=None):
    obj = todo_data.objects.filter(status='in progress').values('id','title','desc','status')
    
    return Response({
                    'message':'successfull',
                    'todo_data': obj,
                    'stats': get_stats(),
    })

@api_view(['GET'])
def archieved(request,format=None):
    obj = todo_data.objects.filter(status='archieved').values('id','title','desc','status')
    
    return Response({
                    'message':'successfull',
                    'todo_data': obj,
                    'stats': get_stats(),
    })

@api_view(['POST'])
def complete_task(request,format=None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).update(status = 'completed')

    # all = todo_data.objects.all().values().count()
    # completed = todo_data.objects.filter(status = 'completed').values().count()
    # inprogress = todo_data.objects.filter(status = 'in progress').values().count()
    # archieved =todo_data.objects.filter(status = 'archieved').values().count()
    # stat = [
    #         { 
    #         "label": "All", 
    #         "value": all 
    #         },
    #         { 
    #         "label": "Completed", 
    #         "value":  completed
    #         },
    #         { 
    #         "label": "In Progress", 
    #         "value": inprogress
    #         },
    #         { 
    #         "label": "Archieved", 
    #         "value":  archieved
    #         }
    # ]

    todo = todo_data.objects.exclude(status = "archieved").all().values('id','title','desc','status')
    return Response({
                    'message':'sucessfull',
                    'stats':  get_stats(),
                    'todo_data': todo,
                    })

@api_view(['POST'])
def archieved_task(request,format=None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).update(status = 'archieved')

    # all = todo_data.objects.all().values().count()
    # completed = todo_data.objects.filter(status = 'completed').values().count()
    # inprogress = todo_data.objects.filter(status = 'in progress').values().count()
    # archieved =todo_data.objects.filter(status = 'archieved').values().count()
    # stat = [
    #         { 
    #         "label": "All", 
    #         "value": all 
    #         },
    #         { 
    #         "label": "Completed", 
    #         "value":  completed
    #         },
    #         { 
    #         "label": "In Progress", 
    #         "value": inprogress
    #         },
    #         { 
    #         "label": "Archieved", 
    #         "value":  archieved
    #         }
    # ]

    todo = todo_data.objects.exclude(status = "archieved").all().values('id','title','desc','status')
    return Response({
                    'message':'sucessfull',
                    'stats':  get_stats(),
                    'todo_data': todo,
                    })

@api_view(['DELETE'])
def delete_task(request,format=None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).delete()

    # all = todo_data.objects.all().values().count()
    # completed = todo_data.objects.filter(status = 'completed').values().count()
    # inprogress = todo_data.objects.filter(status = 'in progress').values().count()
    # archieved =todo_data.objects.filter(status = 'archieved').values().count()
    # stat = [
    #         { 
    #         "label": "All", 
    #         "value": all 
    #         },
    #         { 
    #         "label": "Completed", 
    #         "value":  completed
    #         },
    #         { 
    #         "label": "In Progress", 
    #         "value": inprogress
    #         },
    #         { 
    #         "label": "Archieved", 
    #         "value":  archieved
    #         }
    # ]

    todo = todo_data.objects.exclude(status = "archieved").all().values('id','title','desc','status')
    return Response({
                    'message':'sucessfull',
                    'stats':  get_stats(),
                    'todo_data': todo,
                    })  

@api_view(['PUT'])
def update_task(request,format=None):
    task_id = request.data['id']
    task_title = request.data['title']
    task_desc = request.data['desc']

    obj = todo_data.objects.filter(id = task_id).update(title = task_title, desc = task_desc)
   
    # all = todo_data.objects.all().values().count()
    # completed = todo_data.objects.filter(status = 'completed').values().count()
    # inprogress = todo_data.objects.filter(status = 'in progress').values().count()
    # archieved =todo_data.objects.filter(status = 'archieved').values().count()
    # stat = [
    #         { 
    #         "label": "All", 
    #         "value": all 
    #         },
    #         { 
    #         "label": "Completed", 
    #         "value":  completed
    #         },
    #         { 
    #         "label": "In Progress", 
    #         "value": inprogress
    #         },
    #         { 
    #         "label": "Archieved", 
    #         "value":  archieved
    #         }
    # ]

    todo = todo_data.objects.exclude(status = "archieved").all().values('id','title','desc','status')
    return Response({
                    'message':'sucessfull',
                    'stats':  get_stats(),
                    'todo_data': todo,
                    })



@api_view(['POST'])
def create_user(request,format=None):
    try:
        user = request.data.get('username')
        password = request.data.get('password')

        if user_cred.objects.filter(username=user).exists():
            return Response({'error': 'Username already exists'}, status=400)

        enc_pass = make_password(password)
        obj = user_cred(username=user, password=enc_pass)
        obj.save()

        return Response({'message': 'User created'}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
     

#makepassword and checkpassword