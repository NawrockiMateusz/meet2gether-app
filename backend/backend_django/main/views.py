import django_filters.rest_framework
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
from django.contrib.auth import logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from .serializers import EventSerializer


@api_view(['POST'])
def create_event(request):
    permission_classes = (IsAuthenticated,)
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_events(request):
    permission_classes = (IsAuthenticated,)
    query = Q()
    id = request.GET.get('id')
    title = request.GET.get('title')
    category = request.GET.get('category')
    location = request.GET.get('location')
    dateFrom = request.GET.get('dateFrom')
    dateTo = request.GET.get('dateTo')
    if id:
        query &= Q(id=id)
    if title:
        query &= Q(title=title)
    if category:
        query &= Q(category=category)
    if location:
        query &= Q(location=location)
    if dateFrom:
        query &= Q(date__gte=dateFrom)
    if dateTo:
        query &= Q(date__lte=dateTo)
    events = Event.objects.filter(query)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_all_events(request):
    permission_classes = (IsAuthenticated,)
    Event.objects.all().delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)
