from django.urls import path 
from .views import PropertyListView, PropertyDetailView

urlpatterns = [
  path('', PropertyListView.as_view()),
  path("<int:pk>/", PropertyDetailView.as_view()),
]