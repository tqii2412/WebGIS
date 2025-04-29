from rest_framework import viewsets
from django.shortcuts import render
from .models import Museum
from .serializers import MuseumSerializer


#Render view Home
def home_view(request):
    return render(request, 'baotang/home.html')

def about_view(request):
    return render(request, 'baotang/about.html')


# API view
class MuseumViewSet(viewsets.ModelViewSet):
    queryset = Museum.objects.all()
    serializer_class = MuseumSerializer