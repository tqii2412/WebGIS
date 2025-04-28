from rest_framework import serializers
from .models import Museum

class MuseumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Museum
        fields = [
            'id',
            'name',
            'address',
            'description',
            'opening_hours',
            'ticket_price', 
            'latitude',
            'longitude',
            'youtube_link'            
        ]
