/**
 * Created by Quintin on 2-1-2017.
 */
$(function(){
    function getURLVar()
    {
        var query = window.location.href;
        var vars = query.split("/");
        return vars[vars.length-1];
    }

    console.log(login_data);

    if(login_data){
        $("#toSignUp").replaceWith("<a href='../login/logout'><button id='registerButton' class='topButton'>logout</button></a>")
    }
});