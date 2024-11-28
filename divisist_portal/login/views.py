from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user_type = request.POST.get("user_type")  # Nuevo campo
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            # Redirige según el tipo de usuario
            if user_type == "profesor":
                return redirect("profesor_dashboard")
            elif user_type == "estudiante":
                return redirect("estudiante_dashboard")
            elif user_type == "administrativo":
                return redirect("administrativo_dashboard")
        else:
            messages.error(request, "Credenciales inválidas")
    return render(request, "login/login.html")
