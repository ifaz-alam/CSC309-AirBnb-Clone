from django.urls import path
from .views import PropertyViews

app_name = 'properties'
urlpatterns = [
    path('property/', PropertyViews.as_view(), name='property') # POST create
]
