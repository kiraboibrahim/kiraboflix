$(document).ready(function () {
    window.page = 1;
    let search_results_elem = $("#search-modal .search-results");
    let load_more = $("#search-modal .load-more");
    let fetch_request_completed = true; // Ensure that no other fetch request is made when there is one in progress
    let no_more_search_results = false; // Flag to indicate that no more pages are remaining
    let load_more_pages = function () {
        let search_url = `${base_url}/movies/search/${window.q}/page/${window.page}`;
        fetch_search_results(search_url, render_search_results);
    }
    let change_search_status = function (searching) {
        if(searching) {
            fetch_request_completed = false;
            $("div.search-modal").attr("data-status", "searching");
        }
        else {
            fetch_request_completed = true
            $("div.search-modal").attr("data-status", "done");
        }
    }
    async function render_search_results(json_data) {
        /*
            // Example of a search result Element
            <div>
                <div class="poster">
                </div>
                <div class="title">
                    Rings
                 </div>
            </div>
        */
        if (Object.keys(json_data).length != 0) {
            Object.keys(json_data).forEach(function (key) {
                let pk = json_data[key].pk;
                let poster_field = json_data[key].fields.poster;
                let title_field = json_data[key].fields.title;

                let wrapper = $("<div></div>");
                let poster = $("<div></div>").addClass("poster");
                let title = $("<div></div>").addClass("title");
                let img = $("<img/>");
                let mangled_title = title_field.replace(/\s/g, "-");
                let a = $("<a></a>").attr("href", `${base_url}/movies/play/${mangled_title}/${pk}`).addClass("stretched-link title-link").text(title_field);
                // Remove background once the image is fully downloaded
                img.on("load", function () {
                   poster.css("background-image", "none");
                });
                poster.css("background-image", `url(${poster_base_url}${poster_field}?tr=w-1,h-1:w-240,h-360)`);
                img.attr("src", `${poster_base_url}${poster_field}?tr=w-240,h-360`);
                poster.append(img);
                title.addClass("text-truncate").append(a);
                wrapper.append(poster).append(title);
                search_results_elem.append(wrapper);

            }); //end forEach
        }
        else{
            // Empty Json data indicates end of results
            no_more_search_results = true;
            if(window.page == 2) {
                alert_info("Search", "No results found.");
            }
        }
    }
    let fetch_search_results = function (url, callback) {
        if (fetch_request_completed && !no_more_search_results) {
            change_search_status(true);
            fetch(url).then(function(response) {
                change_search_status(false);
                if (response.status == 200) {
                    response.json()
                    .then(function (json_data) {
                        //  Increment the page so that if user loads another, the right page is displayed
                        window.page++;
                        callback(json_data);
                    })
                    .catch(function (error) {
                        change_search_status(false);
                        alert_error("An error has occurred");
                    }); //end json catch block
                }
                else {
                    alert_error("Resource Error");
                }

            })
            .catch(function (error) {
                change_search_status(false);
                alert_error(error);
            }); //end fetch catch block
        }
    }
    $(".search-modal form").submit(function (event) {
        event.preventDefault();
        window.page = 1;
        let q = $("#q").val();
        window.q = q;
        search_url = `${base_url}/movies/search/${q}/page/${window.page}`;
        search_results_elem.empty();
        // For a new search, set the no_more_search_results flag to false to let request go through
        no_more_search_results = false;
        fetch_search_results(search_url, render_search_results);

    }); // end submit

    /*load_more.click(function (event) {
        load_more_pages();
        event.preventDefault();
    }); */
    $(".search-modal").on('scroll', function (e) {
        // If user is at the bottom of the page, then load more movies
        let search_modal_elem_document_height = $(".search-top-bar").outerHeight() + $(".search-results").outerHeight() + $(".padding").outerHeight() + $(".search-status").outerHeight();
        if(($(this).scrollTop() + $(window).height()) >= search_modal_elem_document_height) {
            load_more_pages();
        }
    }); // end scroll
}); //end ready
