from jwt_auth.serializers.common import NestedUserSerializer
from ..serializers.common import OfferSerializer

class PopulatedOfferSerializer(OfferSerializer):

    owner = NestedUserSerializer()