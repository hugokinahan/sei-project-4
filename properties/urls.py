from django.urls import path 
from .views import PropertyListView, PropertyDetailView, PropertyFavoriteView

urlpatterns = [
  path('', PropertyListView.as_view()),
  path("<int:pk>/", PropertyDetailView.as_view()),
  path('<int:pk>/favorite/', PropertyFavoriteView.as_view())
]