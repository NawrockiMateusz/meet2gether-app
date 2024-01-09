from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    date = models.DateTimeField()
    description = models.TextField()
    location = models.CharField(max_length=200)

    objects = models.Manager()

    def __str__(self):
        return self.title