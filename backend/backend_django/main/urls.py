from django.urls import path
from .views import register, login_view, logout_view, create_event
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('schema/', get_schema_view(
        title="Meet2Gether",
        description="API schema",
        version="1.0.0"
    ), name='openapi-schema'),
    path('docs/', include_docs_urls(title='Meet2Gether')),
    path('events/', create_event, name='create_event'),
]