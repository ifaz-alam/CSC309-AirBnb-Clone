from django.db import models
from accounts.models import Account
from django.contrib.contenttypes.fields import GenericRelation
from comments.models import Comment 
from reservation import Reservation


class Property(models.Model):
    owner = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='properties')
    #images TODO
    description = models.TextField()
    rating = models.IntegerField()
    location = models.DateField()
    available_times= models.DateTimeField()
    prices = models.JSONField()
    max_guests = models.IntegerField()
    bathrooms = models.IntegerField()
    #current_status = models. TODO
    current_renter = models.ForeignKey(Account)
    reservations = models.ForeignKey(Reservation)
    banned = models.user()
    comments = GenericRelation(Comment, related_query_name='property')