from django.db import models
from accounts.models import Account
from django.contrib.contenttypes.fields import GenericRelation
from comments.models import Comment 
#from reservation import Reservation
from images.models import Image
from django.core.validators import MaxValueValidator, MinValueValidator

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
    # TODO: blank=true to anything allowed to be null
    owner = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='properties')
    #TODO: multiple images
    images = models.ForeignKey(Image,on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(max_length=1000)
    rating = models.IntegerField(null=True, validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ]) 
    # rating can be null if the property hasnt been rated yet. #TODO set default to null
    location = models.CharField(max_length=200)
    #available_times= models.DateTimeField(required=True)
    #stated in piazza bonus to do price per day/month
    #prices_by_month = models.JSONField(required=True)
    price_per_night = models.IntegerField(validators=[
            MinValueValidator(1)
        ])
    max_guests = models.IntegerField()
    
    status_choices = (
        ("available", "available"),
        ("reserved", "reserved")

    )
    current_status = models.CharField(choices=status_choices, default="available", max_length=12)
    current_renter = models.ForeignKey(Account,null=True, on_delete=models.SET_NULL, related_name="rented_properties", blank =True)
    #reservations implicitly declared in reservation model, 
    #reservations = models.ForeignKey(Reservation, null=True)
    banned = models.ManyToManyField(Account, related_name="banned_properties")
    comments = GenericRelation(Comment, related_query_name='property')

    #Amenities
    bathrooms = models.IntegerField()
    bedrooms = models.IntegerField()
    backyard = models.BooleanField()
    pool = models.BooleanField()
    wifi = models.BooleanField()
    kitchen = models.BooleanField()
    free_parking = models.BooleanField()
    pets_allowed = models.BooleanField()