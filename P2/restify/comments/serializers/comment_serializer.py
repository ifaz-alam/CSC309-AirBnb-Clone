from rest_framework import serializers
from ..models import Comment
from accounts.models import Account 
from accounts.serializers.account_serializer_no_comments import AccountSerializerNoComments
from properties.models import Property

class CommentObjectRelatedField(serializers.RelatedField):
    """Serializer for the related field. Accepts: Comment, Account, or Property.
    
    TODO: ADD PROPERTY SERIALIZER
    """
    
    def to_representation(self, value):
        if (isinstance(value, Account)):
            return AccountSerializerNoComments(value).data
        elif (isinstance(value, Property)):
            pass
        elif (isinstance(value, Comment)):
            return CommentSerializer(value).data
        
        # return serializer.data

class CommentSerializer(serializers.ModelSerializer):
    """Serializer for a comment object

    """
    parent = CommentObjectRelatedField(source='content_object', queryset = 'content_object')
    author_username = serializers.CharField(source='author.username')
    
    class Meta:
        model = Comment
        fields = ['pk', 'author', 'author_username', 'comment', 'rating', 'parent', ]

