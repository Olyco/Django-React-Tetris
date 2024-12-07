from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


# Create your models here.
class Record(models.Model):
    player = models.OneToOneField(User, on_delete=models.CASCADE, related_name="record")
    score = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-score']
        verbose_name = "record"
        verbose_name_plural = "records"

    def __str__(self):
        return self.player.username

def create_record(sender, instance, created, **kwargs):
    # Create Record for every new User
    if created:
        Record.objects.create(player=instance)

post_save.connect(create_record, sender=User, weak=False,
                        dispatch_uid='models.create_record')