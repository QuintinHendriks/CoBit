/**
 * Created by Quintin on 29-12-2016.
 */

$(function(){
    $.getJSON('/users/usercheck/Test', function (data) {
        console.log("penis");
        console.log(data[0]);
    });
});

function check(input) {
    if (input.value != document.getElementById('pwSet').value) {
        input.setCustomValidity('Passwords must match');
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}

function checkName(input){

    $.getJSON('/users/usercheck/'+input.value, function (data) {
        $.each(data, function(){
            var test = this.result;
            if(test === true){
                input.setCustomValidity('Username already taken');
            }
            else {
                input.setCustomValidity('');
            }

        });
    });
}

function checkMail(input){

    $.getJSON('/users/mailcheck/'+input.value, function (data) {
        $.each(data, function(){
            var test = this.result;
            if(test === true){
                input.setCustomValidity('There already is an account registered to this e-mail');
            }
            else {
                input.setCustomValidity('');
            }
        });
    });
}