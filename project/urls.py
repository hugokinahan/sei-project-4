from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/properties/', include('properties.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/types/', include('property_types.urls')),
    path('api/offers/', include('offers.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    re_path(r'^.*$', index)
]
