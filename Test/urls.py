from django.contrib import admin
from django.urls import path
from common import views
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_view, name='home'),
    path('clearance/', include("clearance_system.urls"))
]
