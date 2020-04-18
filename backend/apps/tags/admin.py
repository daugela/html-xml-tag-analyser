from django.contrib import admin
from .models import Tag, Count, Url

admin.site.register(Tag)
admin.site.register(Count)
admin.site.register(Url)