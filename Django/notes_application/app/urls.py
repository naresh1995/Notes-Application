from django.conf.urls import url
from .import views	

urlpatterns = [
	url(r'^create_note$',views.create_note),
	url(r'^update_note$',views.update_note),
	url(r'^update_title$',views.update_title),
	url(r'^get_all_note$',views.get_all_note),
	url(r'^delete_note$',views.delete_note),
	url(r'^get_all_version$',views.get_all_version),
	]
	