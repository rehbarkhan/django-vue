from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.conf import settings
from django.shortcuts import render, redirect
from django.views import View


class Login(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/app/')
        return render(request, 'login.html')
    def post(self, request):
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            next = request.GET.get('next', '/app/')
            if not next.startswith('/app/'):
                next = '/app/'
            return redirect(next)
        messages.error(request, 'Login failed')
        return render(request, 'login.html', {'username': username, 'password': password})
    


class App(LoginRequiredMixin, View):
    def get(self, request):
        if settings.DEBUG:
            return render(request, 'vue.html')     # this is for dev env
        return render(request, 'dist/index.html')   # this is for poduction