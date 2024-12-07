from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RecordSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from .models import Record

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    # def handle_exception(self, exc):
    #     """
    #     Handle any exception that occurs, by returning an appropriate response,
    #     or re-raising the error.
    #     """

    #     exception_handler = self.get_exception_handler()
    #     context = self.get_exception_handler_context()
    #     response = exception_handler(exc, context)

    #     if isinstance(exc, ValidationError):
    #         print("DATA: ", response.data)
    #         print("STATUS: ", response.status_code)
    #         print("exc details: ", exc.get_full_details())

    #     if response is None:
    #         self.raise_uncaught_exception(exc)

    #     response.exception = True

    #     print(response.headers)
    #     return response

class LeaderboardView(generics.ListAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]

class GetPlayerScoreView(generics.RetrieveAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # print(self.request.user)
        username = self.request.user
        return Record.objects.get(player=username)
    
class UpdatePlayerScore(generics.UpdateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        username = self.request.user
        return Record.objects.get(player=username)





# class UpdateRecordView(generics.UpdateAPIView):

#     def update_record(self):
#         player = 

