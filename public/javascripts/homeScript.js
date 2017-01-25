/**
 * Created by Quintin on 25-1-2017.
 */
$(function () {
    var backgrounds = ["5863ce8f521afd1514391c67", "58678e2d5d7c10013cdc71a7", "5887e8566b92f01288f6db20", "58874e0785fb150011c8aba6"];
    var random = Math.floor(Math.random() * backgrounds.length);

    function newBackground() {
        document.getElementById("backgroundContainer").src = "https://co-bit.herokuapp.com/cobit/" + backgrounds[random] + "/debug";
        document.getElementById.contentWindow.location.reload();
    }

    newBackground();
});