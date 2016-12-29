/**
 * Created by Quintin on 29-12-2016.
 */
var users = [];
var emails = [];

$(function(){
    $.getJSON('/users/userlist', function (data) {
        $.each(data, function(){
            users.push(this.username);
            emails.push(this.email)
        });
    });
    console.log(users);
    console.log(emails);
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
    if(users.indexOf(input.value) != -1){
        input.setCustomValidity('Username already taken');
    }
    else {
        input.setCustomValidity('');
    }
}

function checkMail(input){
    if(emails.indexOf(input.value) != -1){
        input.setCustomValidity('There already is an account registered to this e-mail');
    }
    else {
        input.setCustomValidity('');
    }
}