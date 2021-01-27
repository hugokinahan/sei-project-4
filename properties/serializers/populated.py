from reviews.serializers.common import ReviewSerializer
from ..serializers.common import PropertySerializer

class PopulatedPropertySerializer(PropertySerializer):

    reviews = ReviewSerializer(many=True)