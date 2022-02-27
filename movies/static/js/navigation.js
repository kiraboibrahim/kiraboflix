$(document).ready(function () {
    if (localStorage.getItem("theme") != "light") {
        localStorage.setItem("theme", "dark");
    }
    let theme = localStorage.getItem("theme") || "light";
    if (theme == "dark") {
        $("body").addClass("dark-theme");
        // Reflect the change in the dark mode switch by checking it
        $("input.toggle__input").prop("checked", true);
    }
    else {
        $("body").removeClass("dark-theme");
        // Reflect the change in the dark mode switch by checking it
        $("input.toggle__input").prop("checked", false);
    }

    // Enable scroll when search is invisible  and disable it when the search modal is in the viewport
    let toggle_body_scrolling = function (no_scroll) {
        if (no_scroll) {
            $("body").addClass("no-scroll");
        }
        else {
            $("body").removeClass("no-scroll");
        }

    }
    let closeNav = function () {
        let navWidth = $("section.navigation-container").outerWidth();
        toggle_body_scrolling(false);
        $("div.overlay").css("display", "none");
        $("section.navigation-container").css("margin-left", `-${navWidth}px`);
    }
    let openNav = function () {
         toggle_body_scrolling(true);
         $("div.overlay").css("display", "block");
         $("section.navigation-container").css("margin-left", "0%");
    }

    let openSearch = function () {

        toggle_body_scrolling(true);
        $("div.search-modal").css("margin-right", "0%");
    }
    let closeSearch = function () {
        toggle_body_scrolling(false);
        $("div.search-modal").css("margin-right", "-110%");
    }

    let switchTheme = function () {
        $('body').toggleClass("dark-theme");
        let theme = "light";
        if (document.body.classList.contains("dark-theme")) {
            theme = "dark";
        }
        localStorage.setItem("theme", theme); // Save the choice to localStorage
    }
    $("input.toggle__input").click(switchTheme);
    $("div.search").click(openSearch);
    $("div.close-search").click(closeSearch);
    $("a.close-nav, div.overlay").click(closeNav);
    $("div.open-nav").click(openNav);
});
