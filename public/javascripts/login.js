/**
 * Created by Quintin on 3-1-2017.
 */
$(function () {
    if (getURLVar("success") === 'true') {
        $("#loginWrapper").append('<div id="loginError"><i class="fa fa-times" id="removeError"></i>Incorrect username/password combination</div>')
    }

    $("#removeError").on('click', function () {
        $(this).parent().remove();
    });

    if(login_data){
        $("#loginWrapper").empty();
        $("#loginWrapper").append("<h1>You are already logged in as: " + login_data + "</h1>");
        $("#toSignUp").replaceWith("<a href='../login/logout'><button id='registerButton' class='topButton'>logout</button></a>")
    }
});