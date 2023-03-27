from rest_framework import serializers
from ..models import Account

class AccountSerializerNoComments(serializers.ModelSerializer):
    """Serializer for an Account
    """
        
    class Meta:
        model = Account
        fields = ['username', 'pk', 'first_name', 'last_name', 'phone_number', 'biography', 'guest_rating']