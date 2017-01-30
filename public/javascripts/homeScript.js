/**
 * Created by Quintin on 25-1-2017.
 */
$(function () {
    var backgrounds = ["5863ce8f521afd1514391c67", "5887e8566b92f01288f6db20", "58874e0785fb150011c8aba6", "5887f09da80f5d0011a8741a", "5887f1a9c27d270011ec1ed0", "588b26c07b64520011f55c6f", "588d0aa506f2db0011b8844f"];
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
        $("#coBitsWrapper").append("<iframe class='coBitPreview' src='https://co-bit.herokuapp.com/cobit/" + cobit_data[i] + "/debug'>");
    }

    $("#headerButtonCoBits").on("click", function () {
            $("#homeHeader").animate({scrollLeft: $(window).width()}, 800);
    });

    $("#toHome").on('click', function(){
        $("#homeHeader").animate({scrollLeft: 0}, 800);
    });

    $(".coBitPreview").on('click', function(){

    });
});