from jwt_auth.serializers.common import NestedUserSerializer
from ..serializers.common import ReviewSerializer

class PopulatedReviewSerializer(ReviewSerializer):

    owner = NestedUserSerializer()
