from properties.serializers.populated import PopulatedPropertySerializer
from properties.serializers.common import PropertySerializer
from reviews.serializers.common import ReviewSerializer
from ..serializers.common import UserSerializer
from offers.serializers.populated import PopulatedOfferSerializer

class PopulatedUserSerializer(UserSerializer):

    created_property = PopulatedPropertySerializer(many=True)
    posted_reviews = ReviewSerializer(many=True)
    favorited_property = PropertySerializer(many=True)
    followed_user = UserSerializer(many=True)  
    posted_offers = PopulatedOfferSerializer(many=True)
    # offers = PopulatedOfferSerializer(many=True)
