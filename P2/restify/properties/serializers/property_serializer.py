from rest_framework import serializers
from ..models import Property
from accounts.serializers import AccountSerializer
from comments.serializers import CommentSerializer
from images.serializers import ImageUploadSerializer

class PropertySerializer(serializers.ModelSerializer):
    """Serializer for a Property
    """
    owner = AccountSerializer()
    comments = CommentSerializer(many=True)
    images= ImageUploadSerializer(many=True)
    
    class Meta:
        model = Property
        
        fields = ['pk', 'name', 'owner', 'images', 'description', 'rating', 'location', 
                  'price_per_night', 'max_guests', 'current_status', 'current_renter', 
                  'banned', 'comments', 'bathrooms', 'bedrooms', 'backyard', 'pool', 'wifi', 
                  'kitchen', 'free_parking', 'pets_allowed']