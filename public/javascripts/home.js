/**
 * Created by Quintin on 3-1-2017.
 */
$(function () {
    if (login_data) {
        console.log("hoi");
        $("#toSignUp").remove();
        $("#toLogin").replaceWith("<a href='../login/logout'><button id='loginButtonTop' class='topButton'>logout</button></a>");
    }
});