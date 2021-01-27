from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .serializers.common import PropertyTypeSerializer

from .serializers.populated import PopulatedPropertyTypeSerializer
from .models import PropertyType

class PropertyTypeListView(APIView):
    """ Controller for get request /types """
    def get(self, _request):
        property_types = PropertyType.objects.all()
        serialized_property_types = PopulatedPropertyTypeSerializer(property_types, many=True)
        return Response(serialized_property_types.data, status=status.HTTP_200_OK)
