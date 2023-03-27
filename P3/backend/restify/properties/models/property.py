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
    Reservation: the reservation of this property, can be null if a reservation hasnt been made yet.
    
    ##fields address: str
    name: str
    owner: User -> pk int of that user
    images: Image -> pk int of that image
    description: str
    rating: int
    location: str
    price_per_night: int
    max_guests: int
    current_status: str: "available" or "reserved"
    current_renter: User
    banned: User -> pk int of that user

    
    bathrooms: integer
    bedrooms: integer

    the following amenities can be stated if they exist, defaults to false
    backyard: boolean
    pool: boolean
    wifi: boolean
    kitchen: boolean
    free_parking: boolean
    pets_allowed: boolean

    banned holds the pks of the banned users.

    -order-by will be price and max_guests
    -filter by will be price, max_guests, location, and rating
    
    atleast one image should be required.
    """
    address = models.CharField(max_length=120)
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='properties')
    images = models.ForeignKey(Image,on_delete=models.SET_NULL, null=True)
    description = models.TextField(max_length=1000)
    rating = models.IntegerField(null=True, blank=True, validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]) 
    location = models.CharField(max_length=200)
    #available_times= models.DateTimeField(required=True)
    price_per_night = models.IntegerField(validators=[
            MinValueValidator(1)
        ])
    max_guests = models.IntegerField(validators=[
            MinValueValidator(1)
        ])
    
    status_choices = (
        ("available", "available"),
        ("reserved", "reserved")

    )
    current_status = models.CharField(choices=status_choices, default="available", max_length=12)
    current_renter = models.ForeignKey(Account,null=True, on_delete=models.SET_NULL, related_name="rented_properties", blank =True) 
    
    banned = models.ManyToManyField(Account, related_name="banned_properties")
    comments = GenericRelation(Comment, related_query_name='property')

    bathrooms = models.IntegerField()
    bedrooms = models.IntegerField()
    #Amenities
    backyard = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    kitchen = models.BooleanField(default=False)
    free_parking = models.BooleanField(default=False)
    pets_allowed = models.BooleanField(default=False)