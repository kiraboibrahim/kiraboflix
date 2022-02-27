import random
import base64
from datetime import date
from django import template
from ..models import Genre
register = template.Library()  # Enable us register our custom filters so that django knows about them


def base64_encode(value):
    return base64.b64encode(value.encode('utf-8')).decode('utf-8')


def urlsafe_base64_encode(value):
    data = base64_encode(value).replace("+", "-")
    data = data.replace("/", "_")  # Remove forward slashes
    data = data.replace("=", "")   # Remove = sign that is used for padding
    return data


@register.filter(name='get_random_genre')
def get_random_genre(genres):
    return random.choice(genres).id


@register.filter(name="base64encode")
def base64encode(value):
    return urlsafe_base64_encode(value)


@register.filter(name="map_genre_name_to_genre_id")
def map_genre_name_to_genre_id(value):
    return Genre.objects.filter(name__exact=value)[0].id


@register.filter(name="current_year")
def current_year(value):
    return date.today().year
