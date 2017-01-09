/**
 * Created by Quintin on 2-1-2017.
 */
$(function () {
    console.log(cobit_data);

    if (login_data) {
        $("#toLogin").replaceWith("<a href='../login/logout'><button id='registerButton' class='topButton'>logout</button></a>")
        $("#toSignUp").remove();
    }

    console.log(user_data);

    if (user_data === "[object Object]80c56be165532c705a32595419d8ae3b") {
        window.location.replace("http://localhost:3000/404");
    }
    else {

    }
});