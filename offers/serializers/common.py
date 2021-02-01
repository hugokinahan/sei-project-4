from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import Offer

class OfferSerializer(ModelSerializer):

    class Meta:
        model = Offer
        fields = '__all__'


class NestedOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('is_accepted', )
       
