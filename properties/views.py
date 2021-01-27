from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from .models import Property
from .serializers.common import PropertySerializer

class PropertyListView(APIView):

    def get(self, _request):
        properties = Property.objects.all() #querying property from index
        serialized_property = PropertySerializer(properties, many=True) #expect a list
        return Response(serialized_property.data, status=status.HTTP_200_OK)

    def post(self, request):
        property_to_create = PropertySerializer(data=request.data)
        if property_to_create.is_valid():
            property_to_create.save()
            return Response(property_to_create.data, status=status.HTTP_201_CREATED)
        return Response(property_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
class PropertyDetailView(APIView):
    """ Controller responsible for get/put/delete requests to /properties/id endpoint """

    def get_property(self, pk):

        """ retrives property from db by its pk(id) or responds 404 not found """

        try:
            return Property.objects.get(pk=pk)
        except Property.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):

        """ retrives property from db by its pk(id) or responds 404 not found """

        property = self.get_property(pk=pk)
        serialized_property = PropertySerializer(property)
        return Response(serialized_property.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        property_to_update = self.get_property(pk=pk)
        updated_property = PropertySerializer(property_to_update, data=request.data)
        if updated_property.is_valid():
          updated_property.save()
          return Response(updated_property.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_property.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        property_to_delete = self.get_property(pk=pk)
        property_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
