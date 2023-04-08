#!/bin/bash
./restify/manage.py shell
from accounts.models import Account
from properties.models import Property
from comments.models import Comment
u = Account.objects.get(pk=1)
u2 = Account.objects.get(pk=2)
p = u.properties.all()[0]
new_comment = Comment(author=u, comment="Testing!", rating=5,  object_id = p.pk, content_object = p)
new_comment.save()
new_reply = Comment(author=u2, comment="Testing!", rating=5,  object_id = new_comment.pk, content_object = new_comment)
new_reply.save()
new_comment2= Comment(author=u, comment="Testing!", rating=5,  object_id = p.pk, content_object = p)
new_comment2.save()
new_comment3 = Comment(author=u, comment="Testing!", rating=5,  object_id = p.pk, content_object = p)
new_comment3.save()
new_comment4 = Comment(author=u, comment="Testing!", rating=5,  object_id = p.pk, content_object = p)
new_comment4.save()
new_comment5 = Comment(author=u, comment="Testing!", rating=5,  object_id = p.pk, content_object = p)
new_comment5.save()
