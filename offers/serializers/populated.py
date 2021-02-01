from jwt_auth.serializers.common import NestedUserSerializer
from ..serializers.common import OfferSerializer
from properties.serializers.common import NestedPropertySerializer


class PopulatedOfferSerializer(OfferSerializer):

    owner = NestedUserSerializer()
    offered_property = NestedPropertySerializer()
    requested_property = NestedPropertySerializer()