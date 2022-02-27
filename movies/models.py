import time
from django.db import models
from django.db import models
from django.urls import reverse

# Create your models here.


class Movie(models.Model):
    imdb_id = models.CharField("IMDB ID", max_length=10)
    tmdb_id = models.IntegerField("TMDB ID", null=True, unique=True, help_text="TMDB movie ID")
    title = models.CharField(max_length=50)
    genre = models.ManyToManyField('Genre')
    plot = models.TextField("Synopsis")
    poster = models.CharField(max_length=100)
    trailer_url = models.TextField("Trailer", null=True, help_text="Url for the movie trailer")
    directors = models.TextField("Movie Directors", null=True, blank=True)
    release_date = models.CharField(max_length=15, null=True, blank=True)
    duration = models.CharField(max_length=10, null=True, blank=True)
    web_rip_720p_url = models.TextField("WEB RIP 720P URL", null=True, blank=True)
    web_rip_1080p_url = models.TextField("WEB RIP 1080P URL", null=True, blank=True)
    blu_ray_720p_url = models.TextField("BLU RAY 720P URL", null=True, blank=True)
    blu_ray_1080p_url = models.TextField("BLU RAY 1080P URL", null=True, blank=True)
    upload_timestamp = models.FloatField(default=time.time())

    VIDEO_QUALITY = (
        ('HD', '720p'),
        ('FHD', '1080p'),
        ('QHD', '1440p')
    )
    quality = models.CharField(max_length=10, choices=VIDEO_QUALITY, default='720p', help_text='Video quality of the movie')

    class Meta:
        ordering = ['upload_timestamp']

    def get_absolute_url(self):
        """
        Get details about a movie based on the id
        """
        return reverse('movie-detail', args =[str(self.id)]) # Generate url to a movie based on the view name

    def generate_slug(self):
        return self.title.replace(" ", "-")

    def generate_embed_url(self):
        base_url = "https://youtube.com/embed/"
        return base_url + self.trailer_url

    def generate_watch_url(self):
        base_url = "https://youtube.com/watch/"
        return base_url + self.trailer_url

    def get_release_year(self):
        return self.release_date.split("-")[0] if self.title else " "

    def __str__(self):
        """
        String representation of the model
        """
        return self.title


class Genre(models.Model):
    name = models.CharField(max_length=15, help_text='Movie genre')
    genre_id = models.IntegerField("Global Genre ID", null=True, help_text="Globally Known Genres IDs", unique=True)

    def __str__(self):
        """
        String representation of the model
        """
        return self.name


class UserComplaints(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
