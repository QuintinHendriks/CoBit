/**
 * Created by Quintin on 2-1-2017.
 */
$(function () {
    console.log(cobit_data);

    if (login_data) {
        $("#toLogin").replaceWith("<a href='../login/logout'><button id='registerButton' class='topButton'>logout</button></a>");
        $("#toSignUp").remove();
    }

    console.log(user_data);

    if (user_data === "[object Object]80c56be165532c705a32595419d8ae3b") {
        window.location.replace("http://localhost:3000/404");
    }

    else {
        $("#profileName").text(user_data[0].username)
    }

    var n = $("#coBitsContainer").attr("class").split("page")[1];

    function changePreviewPage(x){
        for (var i = x; i < 6 * (x + 1); i++) {
            console.log(i);
            console.log(cobit_data[i]);
            $("#coBitsWrapper").append("" +
                "<div class='coBitPreview'>" +
                "<iframe class='coBitPreviewFrame' src='https://co-bit.herokuapp.com/cobit/" + cobit_data[i].id + "/debug'></iframe>" +
                "<a href='https://co-bit.herokuapp.com/cobit/" + cobit_data[i].id + "' class='toPreview'>"+cobit_data[i].title+"</a>" +
                "<p class='previewOwner'>Made by: "+cobit_data[i].owner+"</p>" +
                "</div>");
        }
        $(".coBitPreviewFrame").each(function(){
            $("this").contents().find('body').append("<script src='/javascripts/iframeBuffer.js'><\/script>");
        });
    }

    changePreviewPage(n);


    $(".coBitPreviewFrame").hover(function () {
        $(this).parent().append("<div class='previewOverlay'><\/div>")
    }, function(){
        $(".previewOverlay").remove();
    });

    $("#title").on('hover', function(){
        console.log("misschien werkt dit");
    });
});