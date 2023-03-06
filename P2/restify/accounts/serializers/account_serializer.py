from rest_framework import serializers
from ..models import Account
from comments.serializers import CommentSerializer
from images.serializers import ImageUploadSerializer

class AccountSerializer(serializers.ModelSerializer):
    """Serializer for an Account
    """
    
    comments = CommentSerializer(many=True)
    profile_picture = ImageUploadSerializer()
    
    class Meta:
        model = Account
        fields = ['username', 'pk', 'first_name', 'last_name', 'phone_number', 'biography', 'profile_picture', 'guest_rating', 'comments']