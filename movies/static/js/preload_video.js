$(document).ready(function () {

    async function preload_video_player(target_elem, index) {
        // Preload the players so that there is no blip when selecting another movie_quality
        window.current_elem = target_elem;
        window.player_config = window.config
        player_config.magnet = target_elem.attr("value");
        target_elem.attr("data-for", `#video-${index}`);
        player_config.id = `video-${index}`;
        await webtor.push(player_config);

    }
    let index = 2;
    // Get all options excluding the first one coz its the one that is loaded by default to the user
    $("select option").not($("select option:selected")).each(function () {
        preload_video_player($(this), index);
        window.index++;
    }); // end each

    // Handle the changing of select input
    $("select").on("change", function () {
        // Get the data-for attribute of the selected option
        let player_id = $("option:selected", this).attr("data-for");
        let player_elem =  $(`${player_id}`);
        $("div.active").removeClass("active").addClass("hidden");
        player_index = $("div.active").attr("id").split("-")[1];
        window.players[`player_${player_index}`].pause();
        player_elem.removeClass("hidden").addClass("active");
    }); // End change

}); // end ready
