from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
from django.contrib.auth import logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event
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
