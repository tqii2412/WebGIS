from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Tạo router cho API
router = DefaultRouter()
router.register(r'api/museums', views.MuseumViewSet, basename='museum')

urlpatterns = [
    path('', views.home_view, name='home'),  # Frontend home.html
    path('', include(router.urls)),          # API endpoints tự sinh
]
