from django.contrib import admin
from .models import Museum

@admin.register(Museum)
class MuseumAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name', 
        'address', 
        'description',
        'opening_hours', 
        'ticket_price', 
        'longitude', 
        'latitude', 
        'youtube_link'
    )
    search_fields = ('name', 'address')
    list_filter = ('opening_hours',)
