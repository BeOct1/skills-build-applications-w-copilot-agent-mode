from rest_framework import viewsets
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from django.conf import settings
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Helper to get codespace URL from environment or fallback
CODESPACE_URL = os.environ.get('CODESPACE_URL', 'http://localhost:8000')

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': f'{CODESPACE_URL}/api/users/',
        'teams': f'{CODESPACE_URL}/api/teams/',
        'activity': f'{CODESPACE_URL}/api/activity/',
        'leaderboard': f'{CODESPACE_URL}/api/leaderboard/',
        'workouts': f'{CODESPACE_URL}/api/workouts/',
    })
