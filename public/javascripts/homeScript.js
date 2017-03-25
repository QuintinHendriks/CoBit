/**
 * Created by Quintin on 25-1-2017.
 */
$(function () {
    var backgrounds = ["5887e8566b92f01288f6db20", "5887f09da80f5d0011a8741a", "5887f1a9c27d270011ec1ed0", "588b26c07b64520011f55c6f", "588d0aa506f2db0011b8844f", "588fc45465a63c001184ae5c", "58a0e3798f1ffb00116d5776", "58a1ffd3c04f242ee08f50aa", "58a20da7c04f242ee08f50ab"];
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

    function changePreviewPage(){
        for (var i = 0; i < 6; i++) {
            var likes  = cobit_data[i].likes === undefined ? 0 : cobit_data[i].likes.length;
            $("#coBitsWrapper").append("" +
                "<div class='coBitPreview'>" +
                "<iframe class='coBitPreviewFrame' src='https://co-bit.herokuapp.com/cobit/" + cobit_data[i].id + "/debug'></iframe>" +
                "<a href='https://co-bit.herokuapp.com/cobit/" + cobit_data[i].id + "' class='toPreview'>"+cobit_data[i].title+"</a></br>" +
                "<p class='previewOwner'>Made by: "+cobit_data[i].owner+"</p>" +
                "<p class='previewLikes'>"+likes+"</p>" +
                "<i class='fa fa-heart previewLikeIcon' style='font-size: 15px;'></i>" +
                "</div>");
        }
    }

    changePreviewPage();


    function compare(a,b) {
        if (a.likes.length < b.likes.length)
            return 1;
        if (a.likes.length > b.likes.length)
            return -1;
        return 0;
    }

    var date_sort = cobit_data;

    console.log(cobit_data);

    $(document.body).on("click", ".selected", function(){
        $(".item1").toggleClass('unselected selected');
        $(".item2").toggleClass('unselected selected');

        var x = parseInt($(this).attr("class").split(" ")[0].split("item")[1]);

        console.log(x);

        if(x === 1){
            $("#coBitsWrapper").empty();
            var likes_sort = cobit_data.sort(compare);
            for (var i = 0; i < 6; i++) {
                var likes  = likes_sort[i].likes === undefined ? 0 : likes_sort[i].likes.length;
                $("#coBitsWrapper").append("" +
                    "<div class='coBitPreview'>" +
                    "<iframe class='coBitPreviewFrame' src='https://co-bit.herokuapp.com/cobit/" + likes_sort[i].id + "/debug'></iframe>" +
                    "<a href='https://co-bit.herokuapp.com/cobit/" + likes_sort[i].id + "' class='toPreview'>"+likes_sort[i].title+"</a></br>" +
                    "<p class='previewOwner'>Made by: "+likes_sort[i].owner+"</p>" +
                    "<p class='previewLikes'>"+likes+"</p>" +
                    "<i class='fa fa-heart previewLikeIcon' style='font-size: 15px;'></i>" +
                    "</div>");
            }
        }

        if(x === 2){
            $("#coBitsWrapper").empty();
            for (var i = 0; i < 6; i++) {
                var likes  = date_sort[i].likes === undefined ? 0 : date_sort[i].likes.length;
                $("#coBitsWrapper").append("" +
                    "<div class='coBitPreview'>" +
                    "<iframe class='coBitPreviewFrame' src='https://co-bit.herokuapp.com/cobit/" + date_sort[i].id + "/debug'></iframe>" +
                    "<a href='https://co-bit.herokuapp.com/cobit/" + date_sort[i].id + "' class='toPreview'>"+date_sort[i].title+"</a></br>" +
                    "<p class='previewOwner'>Made by: "+date_sort[i].owner+"</p>" +
                    "<p class='previewLikes'>"+likes+"</p>" +
                    "<i class='fa fa-heart previewLikeIcon' style='font-size: 15px;'></i>" +
                    "</div>");
            }
        }
    });


    $("#headerButtonCoBits").on("click", function () {
        $("#homeHeader").animate({scrollLeft: $(window).width()}, 800);
    });

    $("#toHome").on('click', function () {
        $("#homeHeader").animate({scrollLeft: 0}, 800);
    });

    $(".coBitPreviewFrame").hover(function () {
        console.log("dit werkt");
        $(this).parent().append("<div class='previewOverlay'></div>");
        $(".previewOverlay").addClass("animated fadeIn");
    }, function(){
        $(".previewOverlay").remove();
    });
});