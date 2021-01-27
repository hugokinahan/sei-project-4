from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from .serializers.common import OfferSerializer
from .models import Offer

class OfferListView(APIView):
    """ Controller for post request to /offers endpoint """

    def post(self, request):
        offer_to_create = OfferSerializer(data=request.data)
        if offer_to_create.is_valid():
            offer_to_create.save()
            return Response(offer_to_create.data, status=status.HTTP_201_CREATED)
        return Response(offer_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class OfferDetailView(APIView):
    """ Controller for delete requests to /offers/id(pk) endpoint """

    def delete(self, _request, pk):
        try:
            offer_to_delete = Offer.objects.get(pk=pk)
            offer_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Offer.DoesNotExist:
            raise NotFound()