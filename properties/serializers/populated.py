from reviews.serializers.populated import PopulatedReviewSerializer
from offers.serializers.populated import PopulatedOfferSerializer
from ..serializers.common import PropertySerializer
from property_types.serializers.common import PropertyTypeSerializer
from jwt_auth.serializers.common import NestedUserSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedPropertySerializer(PropertySerializer):

    reviews = PopulatedReviewSerializer(many=True)
    types = PropertyTypeSerializer(many=True)
    offers = PopulatedOfferSerializer(many=True)
    owner = NestedUserSerializer()
    favorited_by = NestedUserSerializer(many=True)
    