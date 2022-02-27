$(document).ready(function() {
  let lazyloadImages;
// Testing support for IntersectionObserver api
  if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll("img.lazy");
        let imageObserver = new IntersectionObserver(function(entries, observer) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                      var image = entry.target;
                      image.classList.remove("lazy");
                      // Preload the before removing the background image
                      image.onload = function (e) {
                            image.parentNode.style.backgroundImage  = "none";
                      }

                      image.setAttribute("src" , image.getAttribute("data-src"));
                      imageObserver.unobserve(image);
                }
              });
        });

        lazyloadImages.forEach(function(image) {
          imageObserver.observe(image);
        });
  } else { // Fallback if the Intersection Observer is not supported
    let lazyloadThrottleTimeout;
    lazyloadImages = $("img.lazy");

    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = $(window).scrollTop();
          lazyloadImages.each(function() {
              var el = $(this);
              if(el.offset().top - scrollTop < window.innerHeight + 200) { // Load Images that are also 200px below the viewport
                el.removeClass("lazy");
               // Preload the before removing the background image
                el.onload = function (e) {
                    // Remove the background image and show the image
                    $(this).parent("#poster").css("background-image", "none");
                }
                el.onerror = function (e) {
                    console.log("Image failed to load");
                }
                el.setAttribute("src" , el.getAttribute("data-src"));
                lazyloadImages = $(".lazy");
              }
          });
          if(lazyloadImages.length == 0) {
            $(document).off("scroll");
            $(window).off("resize");
          }
      }, 20);
    }

    $(document).on("scroll", lazyload);
    $(window).on("resize", lazyload);
  }
})
