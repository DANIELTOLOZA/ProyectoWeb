from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Puedes ajustar esta redirección
        else:
            messages.error(request, 'Usuario o contraseña incorrectos')
    return render(request, 'login/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')
