from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from comments.models import Comment
from images.models import Image

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
    profile_picture = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, blank=True)
    email= models.EmailField(blank=False, null=False, unique=True)
    
    comments = GenericRelation(Comment, related_query_name='account')
    
