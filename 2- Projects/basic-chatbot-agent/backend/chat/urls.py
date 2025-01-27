from django.urls import path
from chat.views import ChatViewSet

urlpatterns = [
    path('api/chat/', ChatViewSet.as_view({'post': 'post'}), name='chat'),
]
