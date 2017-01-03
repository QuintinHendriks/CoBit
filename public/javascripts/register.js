/**
 * Created by Quintin on 3-1-2017.
 */
$(function(){
    if(login_data){
        $("#loginWrapper").empty();
        $("#loginWrapper").append("<h1>You are already logged in as: " + login_data + "</h1>");
    }
});