from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Static page
    path('discover/', views.group_movies_by_genre, name="movie-listing"),
    path('discover/<str:genre>/<int:pk>', views.render_genre_movie_listing, name='render-genre-movie-listing'),
    path('discover/<str:genre>/<int:pk>/page/<int:page_number>', views.genre_movie_listing, name='genre-movie-listing'),
    path("play/<str:title>/<int:pk>", views.MovieDetailView.as_view(), name='movie-detail'),
    path("watch/<str:title>/<int:pk>/<int:genre_id>", views.watch_movie, name='movie-stream'),
    path('search/<str:q>/page/<int:page_number>', views.search, name="movie-search"),  # Will return JSON
]
