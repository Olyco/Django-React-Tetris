from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Record

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class RecordSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Record
        fields = ["id", "player", "score"]
        extra_kwargs = {"player": {"read_only": True}}

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["player"] = instance.player.username
        return rep