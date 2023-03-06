from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from comments.models import Comment
from rest_framework import serializers

# from notifications.models import Notification


class Image(models.Model):
    pass

class Account(AbstractUser):
    """An account within the system

    Has implicit fields from Foreign Keys:
    properties: List of properties this user owns
    guest_reservations: List of reservations this user has made
    host_reservations: List of reservations this user has hosted
    notifications: List of notifications this user has
    
    Inherited fields:
    username
    password
    first_name
    last_name
    """
    phone_number = models.CharField(null=False, blank=False, max_length=12)
    biography = models.CharField(blank=True, null=True, max_length=500)
    guest_rating = models.IntegerField(blank=False, null=False, default=0)
    profile_picture = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)
    comments = GenericRelation(Comment, related_query_name='account')

    # notifications = models.ManyToManyField(Notification, blank=True)
    
class AccountSerializer(serializers.Serializer):
    """Serializer for an Account
    
    #TODO
    Serialize the comments
    
    """
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_number = serializers.CharField(max_length=12)
    biography = serializers.CharField(max_length=500)
    guest_rating = serializers.IntegerField()