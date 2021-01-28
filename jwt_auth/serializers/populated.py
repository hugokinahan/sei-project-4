from properties.serializers.common import PropertySerializer
from reviews.serializers.common import ReviewSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):

    created_property = PropertySerializer(many=True)
    posted_reviews = ReviewSerializer(many=True)
    favorited_property = PropertySerializer(many=True)
    followed_user = UserSerializer(many=True)  
