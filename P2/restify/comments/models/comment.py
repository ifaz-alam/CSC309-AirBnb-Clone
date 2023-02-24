from django.db import models
from accounts.models import Account
# Create your models here.

class Comment(models.Model):
    Author = models.ForeignKey(Account, on_delete=models.SET_NULL, related_name='comments', null=True)
    # TODO More