from reviews.serializers.populated import PopulatedReviewSerializer
from offers.serializers.common import OfferSerializer
from ..serializers.common import PropertySerializer
from property_types.serializers.common import PropertyTypeSerializer
from jwt_auth.serializers.common import NestedUserSerializer

class PopulatedPropertySerializer(PropertySerializer):

    reviews = PopulatedReviewSerializer(many=True)
    types = PropertyTypeSerializer(many=True)
    offers = OfferSerializer(many=True)
    owner = NestedUserSerializer()
    favorited_by = NestedUserSerializer(many=True)
    