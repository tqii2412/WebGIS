from django.db import models

class Museum(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=500)
    description = models.TextField(blank=True, null=True)
    opening_hours = models.CharField(max_length=255, blank=True, null=True) 
    ticket_price = models.CharField(max_length=255, blank=True, null=True)
    longitude = models.FloatField()  # x
    latitude = models.FloatField()   # y
    youtube_link = models.URLField(max_length=500, blank=True, null=True) 

    def __str__(self):
        return self.name
