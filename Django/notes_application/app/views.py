# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

import json
from .models import Note,Version

# Create your views here.
@csrf_exempt
def create_note(request):
	title = ""
	notes = ""
	new_note = Note.objects.create(title=title)
	version = Version.objects.create(notes=notes, note=new_note)
	get_id = Note.objects.latest('id')

	return JsonResponse({'id':get_id.id}, status=200)

@csrf_exempt
def update_title(request):
	payload = json.loads(request.body)
	note_id = payload.get('id')
	title = payload.get('title')
	note_info = Note.objects.get(id=note_id)
	old_title = note_info.title
	if title != "" and old_title != title:
		note_info.title = title
		note_info.save()

	return JsonResponse({'message':'Title Saved Successfully'}, status=200)

@csrf_exempt
def update_note(request):
	payload = json.loads(request.body)
	note_id = payload.get('id')
	new_note = payload.get('notes')
	note_info = Note.objects.get(id=note_id)
	version = note_info.versions.all()
	for i in version:
		if i.notes == "":
			i.notes = new_note
			i.save()
		else:
			version = note_info.versions.create(notes=new_note)
			break

	return JsonResponse({'message':'Note Saved Successfully'}, status=200)

@csrf_exempt
def get_all_note(request):
	jsonData = []
	note_list = Note.objects.filter(is_active=True)
	for note in note_list:
		ver = note.versions.order_by('-modified_date')[:1]
		for i in ver:
			data = {'id':i.note.id, 'title' : i.note.title, 'notes' : i.notes}
			jsonData.append(data)
			jsonData.sort()

	return JsonResponse({'data':jsonData}, status=200)

@csrf_exempt
def delete_note(request):
	payload = json.loads(request.body)
	note_id = payload.get('id')
	note_info = Note.objects.get(id=note_id)
	note_info.is_active=False
	note_info.save()

	return JsonResponse({'message':'Note Deleted Successfully'}, status=200)

@csrf_exempt	
def get_all_version(request):
	jsonData = []
	payload = json.loads(request.body)
	note_id = payload.get('id')
	note_info = Note.objects.get(id=note_id)
	version = note_info.versions.all().order_by('-modified_date')
	for i in version:
		data = {'id':i.note.id, 'title' : i.note.title, 'notes' : i.notes, 'modified_date':i.modified_date.strftime("%Y-%m-%d %H:%M:%S")}
		jsonData.append(data)

	return JsonResponse({'data':jsonData}, status=200)