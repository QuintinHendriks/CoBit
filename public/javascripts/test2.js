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

    console.log(local_data);
});