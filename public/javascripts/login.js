/**
 * Created by Quintin on 3-1-2017.
 */
$(function () {
    if (getURLVar("error") === 'true') {
        $("#loginWrapper").append('<div id="loginError" class="notification"><i class="fa fa-times removeNotification"></i>Incorrect username/password combination</div>')
    }

    if (getURLVar("verified") === 'true') {
        $("#loginWrapper").append('<div id="verified" class="notification"><i class="fa fa-times removeNotification"></i>E-mail verification succes! You may now login with your credentials.</div>')
    }

    if (getURLVar("verified") === 'false') {
        $("#loginWrapper").append('<div id="verifiedNo" class="notification"><i class="fa fa-times removeNotification"></i>You need to verificate your email first.</div>')
    }

    $(".removeNotification").on('click', function () {
        $(this).parent().remove();
    });

    if(login_data){
        $("#loginWrapper").empty();
        $("#loginWrapper").append("<h1>You are already logged in as: " + login_data + "</h1>");
        $("#toSignUp").replaceWith("<a href='../login/logout'><button id='registerButton' class='topButton'>logout</button></a>")
    }
});