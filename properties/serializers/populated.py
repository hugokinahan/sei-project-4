from reviews.serializers.common import ReviewSerializer
from offers.serializers.common import OfferSerializer
from ..serializers.common import PropertySerializer
from property_types.serializers.common import PropertyTypeSerializer

class PopulatedPropertySerializer(PropertySerializer):

    reviews = ReviewSerializer(many=True)
    types = PropertyTypeSerializer(many=True)
    offers = OfferSerializer(many=True)