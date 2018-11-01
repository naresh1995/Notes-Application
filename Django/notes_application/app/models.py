	# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=128)
    is_active =  models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Version(models.Model):

	note = models.ForeignKey(Note, related_name='versions', on_delete=models.CASCADE)
	notes = models.TextField()
	modified_date = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.note.title
