from django.urls import path
from .views import PropertyViews
from .views import SearchView

app_name = 'properties'
urlpatterns = [
    path('property/', PropertyViews.as_view(), name='property'),
    path('search/', SearchView.as_view({'get': 'get'}), name='search')
]
