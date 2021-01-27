from django.urls import path
from .views import PropertyTypeListView

urlpatterns = [
    path("", PropertyTypeListView.as_view()),
]
