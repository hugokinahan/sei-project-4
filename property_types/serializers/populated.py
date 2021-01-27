from properties.serializers.common import PropertySerializer
from ..serializers.common import PropertyTypeSerializer

class PopulatedPropertyTypeSerializer(PropertyTypeSerializer):
    """ Used for all outgoing serialization, includes populated Property """
    properties = PropertySerializer(many=True)