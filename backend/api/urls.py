from django.urls import path
from .views import LeaderboardView, GetPlayerScoreView, UpdatePlayerScore

urlpatterns = [
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),
    path("myscore/", GetPlayerScoreView.as_view(), name="my_score"),
    path("update/",UpdatePlayerScore.as_view(), name="update"),
]