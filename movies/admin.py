from django.contrib import admin

from .models import Movie, Genre
# Register your models here.
admin.site.register(Movie)


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("id", "genre_id", "name")


