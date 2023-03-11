from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from django.core.validators import MaxValueValidator, MinValueValidator

class Comment(models.Model):
    """A comment within the system

    # Has implicit fields from Foreign Keys:
    comments: A list of comments (replying this this comment)
    """
    author = models.ForeignKey('accounts.Account', on_delete=models.SET_NULL, related_name='written_comments', null=True)
    comment = models.CharField(max_length=500)
    rating = models.IntegerField(default=0, validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]) # If the parent is User or Property, this field is used
    
    # Content Type is the parent -> What the comment is placed on (User, Property, Comment)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    # TODO More
    
    comments = GenericRelation('self', related_query_name='comment_parent')
    
    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]
        
    def __str__(self):
        return f"{self.author}'s comment"

