from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/properties/', include('properties.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/types/', include('property_types.urls')),
     path('api/offers/', include('offers.urls'))

]