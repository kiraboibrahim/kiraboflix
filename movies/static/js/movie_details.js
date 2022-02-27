$(document).ready(function () {
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $("#trailer").attr('src');

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function(){
        $("#trailer").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function() {
        $("#trailer").attr('src', url);
    });
}); //end ready
