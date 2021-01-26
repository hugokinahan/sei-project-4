from django.db import models

class Property(models.Model):
    name = models.CharField(max_length=30, unique=True)
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    continent = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    property_image = models.CharField(max_length=300)
    is_available = models.BooleanField(default=False)
    latitude = models.IntegerField()
    longitude = models.IntegerField()
  
    def __str__(self):
      return f"{self.name} - {self.city}"