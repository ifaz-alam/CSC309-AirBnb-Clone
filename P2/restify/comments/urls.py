from django.urls import path
from .views import CommentViews

app_name = 'comments'
urlpatterns = [
    path('', CommentViews.as_view(), name='login'),
]
