from django.db import models
from accounts.models import Account
from django.contrib.contenttypes.fields import GenericRelation
from comments.models import Comment 
from reservation import Reservation
from images.models import Image

class Property(models.Model):
    """
    Represents a Property. 
    has implicit fields from foreign keys:
    owner: the account who owns the property
    images: images of the property 
    current_renter: the user who is currently renting the property


    The following amenities must be stated(grabbed from airbnb.com): additional amenities can be added in the description of the property,
    but wont be searchable or filterable
    
    bathrooms: integer
    bedrooms: integer
    backyard: boolean
    pool: boolean
    wifi: boolean
    kitchen: boolean
    free_parking: boolean
    pets_allowed: boolean

    -order-by will be price and max_guests
    -filter by will be price, max_guests, location, and rating
    """

    owner = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='properties')
    images = models.ForeignKey(Image,on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(required=True, max_length=1000)
    # TODO: add rating validator minvalue validator and max value
    rating = models.IntegerField(null=True) # rating can be null if the property hasnt been rated yet. #TODO set default to null
    #TODO: implement location field: https://django-location-field.readthedocs.io/en/latest/install.html or just validate?
    location = models.CharField(required=True)
    #TODO: implement many to one relationship or possibly jsonfield with validation. 
    #seems like a bonus possibly just check with reservations if time requested is valid
    available_times= models.DateTimeField(required=True)
    #stated in piazza bonus to do price per day/month
    #prices_by_month = models.JSONField(required=True)
    price_per_night = models.IntegerField(required=True)
    max_guests = models.IntegerField(required=True)
    
    #inherit from reservation? or available or not
    current_status = models.TextChoices('available', 'reserved',required=True, default='available')
    current_renter = models.ForeignKey(Account)
    reservations = models.ForeignKey(Reservation)
    banned = models.ForeignKey(Account)
    comments = GenericRelation(Comment, related_query_name='property')

    #Amenities
    bathrooms = models.IntegerField(required=True)
    bedrooms = models.IntegerField(required=True)
    backyard = models.BooleanField(required=True)
    pool = models.BooleanField(required=True)
    wifi = models.BooleanField(required=True)
    kitchen = models.BooleanField(required=True)
    free_parking = models.BooleanField(required=True)
    pets_allowed = models.BooleanField(required=True)