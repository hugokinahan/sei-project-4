from django.db import models

class Property(models.Model):
    name = models.CharField(max_length=50, unique=True)
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    continent = models.CharField(max_length=30)
    description = models.CharField(max_length=600)
    property_image = models.CharField(max_length=500)
    is_available = models.BooleanField(default=False)
    longitude = models.DecimalField(max_digits=30, decimal_places=20)
    latitude = models.DecimalField(max_digits=30, decimal_places=20)
  
    def __str__(self):
      return f"{self.name} - {self.city}"