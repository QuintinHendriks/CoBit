/**
 * Created by Quintin on 25-1-2017.
 */
$(function () {
    var backgrounds = ["5887e8566b92f01288f6db20", "58874e0785fb150011c8aba6", "5887f09da80f5d0011a8741a", "5887f1a9c27d270011ec1ed0", "588b26c07b64520011f55c6f", "588d0aa506f2db0011b8844f", "588fc45465a63c001184ae5c"];
    var random = Math.floor(Math.random() * backgrounds.length);

    function newBackground() {
        document.getElementById("backgroundContainer").src = "https://co-bit.herokuapp.com/cobit/" + backgrounds[random] + "/debug";
    }

    newBackground();

    $("#headerButtonLogin").on('click', function () {
        window.location.href = "https://co-bit.herokuapp.com/login";
    });

    $("#headerButtonSignUp").on('click', function () {
        window.location.href = "https://co-bit.herokuapp.com/login/register";
    });

    console.log(cobit_data);

    var n = $("#coBitsContainer").attr("class").split("page")[1];


    for (var i = n; i < 6 * (n + 1); i++) {
        $("#coBitsWrapper").append("" +
            "<div class='coBitPreview'>" +
            "<iframe class='coBitPreviewFrame' src='https://co-bit.herokuapp.com/cobit/" + cobit_data[i].id + "/debug'></iframe>" +
            "<a href='https://co-bit.herokuapp.com/cobit/" + cobit_data[i].id + "' class='toPreview'>"+cobit_data[i].title+"</a>" +
            "<p class='previewOwner'>Made by: "+cobit_data[i].owner+"</p>" +
            "</div>");
    }

    var timeout = setTimeout(function(){
        $(".coBitPreviewFrame").contentDocument.stop()
    }, 2000);

    $("#headerButtonCoBits").on("click", function () {
        $("#homeHeader").animate({scrollLeft: $(window).width()}, 800);
    });

    $("#toHome").on('click', function () {
        $("#homeHeader").animate({scrollLeft: 0}, 800);
    });

    $(".coBitPreviewFrame").hover(function () {
        $(this).parent().append("<div class='previewOverlay'></div>")
    }, function(){
        $(".previewOverlay").remove();
    });

    $(".coBitPreviewframe").hover(function(){
        $(this).append("<div class='iframeHover'></div>");
    });
});