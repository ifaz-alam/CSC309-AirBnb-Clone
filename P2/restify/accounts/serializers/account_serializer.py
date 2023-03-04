from rest_framework import serializers
from ..models import Account
from comments.serializers import CommentSerializer

class AccountSerializer(serializers.ModelSerializer):
    """Serializer for an Account
    """
    
    comments = CommentSerializer(many=True)
    
    class Meta:
        model = Account
        fields = ['username', 'pk', 'first_name', 'last_name', 'phone_number', 'biography', 'guest_rating', 'comments']