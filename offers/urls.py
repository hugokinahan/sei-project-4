from django.urls import path
from .views import OfferListView, OfferDetailView

urlpatterns = [
    path("", OfferListView.as_view()),
    path("<int:pk>/", OfferDetailView.as_view())
]