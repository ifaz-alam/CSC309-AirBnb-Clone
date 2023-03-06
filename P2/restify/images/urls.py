

from django.urls import path, include
from .views import ImageUploadViewSet, ImageView

app_name = 'images'

urlpatterns = [
    path('upload/', ImageUploadViewSet.as_view({'post':'post'}), name='upload'),
    path('', ImageView.as_view(), name='image'),   
]