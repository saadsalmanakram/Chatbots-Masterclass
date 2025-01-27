from django.contrib import admin
from django.urls import path, include
from chat.views import ChatViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', ChatViewSet.as_view(), name='chat'),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
]