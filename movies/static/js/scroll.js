
$(document).ready(function () {
    let poster_size = $("#poster").innerWidth();
    let scroll_right_x = 0;
    // get some relevant size for the paddle triggering point
    let paddle_margin = 100;
    let poster_containers = $(".genre-movies");

    let scroll_handler = function (target) {
        let scroll_left_x = $(target).scrollLeft();
        let total_posters_size = $(target).children(".movie").length * poster_size;
        let target_width = $(target).innerWidth();
        paddle_parent = $(target).parent(".genre-wrapper");
        scroll_left_x > poster_size - paddle_margin ? paddle_parent.children(".left-paddle").removeClass("hidden") : paddle_parent.children(".left-paddle").addClass("hidden");
        scroll_left_x + target_width >= total_posters_size ? paddle_parent.children(".right-paddle").addClass("hidden") : paddle_parent.children(".right-paddle").removeClass("hidden");
    }
    let display_paddles_where_necessary = function () {
          poster_containers.each(function (index) {
            let overflow = true;
            //console.log($(this).children(".movie").length * posterSize);
            // If posters don't overflow their container, hide the paddles
            genre_movies_width = $(this).outerWidth(true)
            let total_posters_size = $(this).children(".movie").length * poster_size;
            paddle_parent = $(this).parent(".genre-wrapper");
            if ( total_posters_size < genre_movies_width) {

                  paddle_parent.children(".paddle").addClass("hidden");
                  overflow = false;
            }
            if (overflow) {
                paddle_parent.children(".right-paddle").removeClass("hidden");
            }
            scroll_handler(this);

        }); //end each
    }
    display_paddles_where_necessary();
    // the wrapper is responsive
    $(window).on('resize', function() {
        poster_size = $("#poster").outerWidth(true);
        display_paddles_where_necessary();

    });
    // duration of scroll animation
    let scrollDuration = 300;
    // paddles
    let left_paddle = $('.left-paddle');
    let right_paddle = $('.right-paddle');

    // finally, what happens when we are actually scrolling the menu
    poster_containers.on('scroll', function(event) {
        scroll_handler(event.target);
    });

    // scroll to left
    $(right_paddle).on('click', function() {
        let scroll_left_x =  $(this).siblings(".genre-movies").scrollLeft() + poster_size + paddle_margin;
        //scroll_right_x =scroll_right_x + (poster_size - paddle_margin)
        $(this).siblings(".genre-movies").animate( { scrollLeft: `${scroll_left_x}` }, scrollDuration);
    });

    // scroll to right
    $(left_paddle).on('click', function() {
        $(this).siblings(".genre-movies").animate( { scrollLeft: `-${poster_size}` }, scrollDuration);
        console.log("clicked Left");
    });

}); //end ready
