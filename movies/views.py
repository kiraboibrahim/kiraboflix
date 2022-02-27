from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic
from movies.models import Movie, Genre, UserComplaints
from django.db.models import Count
from django.conf import settings
from django.core.serializers import serialize
from movies.forms import ContactForm, NewUserForm
from django.contrib.auth import login
from django.contrib import messages

HttpResponseRedirect.allowed_schemes.append("mailto")
# Create your views here.

number_of_results_per_page = 6


def get_genre_name(pk):
    return Genre.objects.get(pk=pk).name


def index(request):
    return render(request, 'index.html')


def group_movies_by_genre(request):
    genres = Genre.objects.all()
    context = {
                "poster_base_url": settings.POSTER_BASE_URL,
                'data': {}
               }
    # iterate over the genres as you fetch the movies that fall in that genre
    for genre in genres:
        context['data'][genre.name] = Movie.objects.filter(genre__exact=genre.id)[:10]

    return render(request, 'discover_movies.html', context=context)


def render_genre_movie_listing(request, genre, pk):
    context = {
        "genre": genre,
        "pk": pk,
    }
    return render(request, "genre_movies_list.html", context=context)


def genre_movie_listing(request, genre, pk, page_number):
    results_per_page = number_of_results_per_page
    genre_name = get_genre_name(pk)

    start_offset = (page_number-1) * results_per_page
    end_offset = results_per_page * page_number
    search_results = Movie.objects.only('title').filter(genre__exact=pk)[start_offset: end_offset]
    json_data = serialize("json", search_results, fields=('title', 'poster'))
    return HttpResponse(json_data, content_type='application/json')


class MovieDetailView(generic.DetailView):
    """
        Get details of a specific Movie
    """
    model = Movie
    context_object_name = "movie_details"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['poster_base_url'] = settings.POSTER_BASE_URL
        return context


def watch_movie(request, title, pk, genre_id):
    similar_movies = Movie.objects.filter(genre__exact=genre_id)[:10]
    movie_details = Movie.objects.get(pk=pk)
    context = {
        "similar_movies": similar_movies,
        "movie_details": movie_details,
        "poster_base_url": settings.POSTER_BASE_URL,
    }
    return render(request, 'watch_movie.html', context)


def search(request, q, page_number):
    results_per_page = number_of_results_per_page
    start_offset = (page_number-1) * results_per_page
    end_offset = results_per_page * page_number
    search_results = Movie.objects.only('title').filter(title__icontains=q)[start_offset: end_offset]
    json_data = serialize("json", search_results, fields=('title', 'poster'))
    return HttpResponse(json_data, content_type='application/json')


def privacy_policy(request):
    return render(request, "privacy_policy.html")


def contact(request):
    if request.method == "POST":
        # Create a form and populate it with data from the request
        form = ContactForm(request.POST)
        # Invoke the form cleaning validation
        if form.is_valid():
            cleaned_data = form.cleaned_data
            complaint = UserComplaints(first_name=cleaned_data['first_name'] , last_name=cleaned_data['last_name'], email=cleaned_data['email'], message=cleaned_data['message'])

            # Save the data
            complaint.save()

            # Redirect to success url
            return HttpResponseRedirect(reverse("contact-success"))  # 302 redirect
    else:
        form = ContactForm()
        # form loading for the first time- unbound
    context = {
        "form": form,
    }
    return render(request, "contact.html", context=context)


def contact_success(request):
    url = reverse("index")
    return HttpResponse("Your message has been successfully recieved, You will be given feedback within 48 hours. <a href='" + url + "'>Go back home</a>")


def about_us(request):
    return render(request, 'about_us.html')


def email_contact(request):
    return HttpResponseRedirect("mailto:kiraboibra268@gmail.com")


def attribute(request):
    return render(request, 'attribution.html')

