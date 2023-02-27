from django.db import models
from accounts.models import Account
from django.contrib.contenttypes.fields import GenericRelation
from comments.models import Comment


class Property(models.Model):
    owner = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='properties')
    
    
    comments = GenericRelation(Comment, related_query_name='property')