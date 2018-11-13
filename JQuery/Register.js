$(() => {
    // Checks if user is logged in then he will be redirected to etusivu.html
    if(sessionStorage['logged'] == "true") {
        window.location.href="etusivu.html";
    }

    $("#reg_button").click(() => {
        var name = $("#user_name").val();
        var username = $("#account_name").val();
        var pass = $("#reg_pwd").val();
        var address = $("#user_address").val();
        var email = $("#user_email").val();
        // Variables to check if textbox is not empty
        var nameOK, usernameOK, passOK, emailOK, addressOK;

        // These if elses are handling textboxes and their borders
        if(name == "") {
            $('input[id="account_name"]').css("border", "2px solid red");
            nameOK = false;
        } else {
            nameOK = true;
            $('input[id="account_name"]').css("border", "none");
        }

        if(username == "") {
            $('input[id="user_name"]').css("border", "2px solid red");
            usernameOK = false;
        } else {
            usernameOK = true
            $('input[id="user_name"]').css("border", "none");
        } 
        
        if(pass == "") {
            $('input[id="reg_pwd"]').css("border", "2px solid red");
            passOK = false;
        } else {
            passOK = true;
            $('input[id="reg_pwd"]').css("border", "none");
        }

        if(email == "") {
            $('input[id="user_email"]').css("border", "2px solid red");
            emailOK = false;
        } else {
            emailOK = true;
            $('input[id="user_email"]').css("border", "none");
        }

        if(address == "") {
            $('input[id="user_address"]').css("border", "2px solid red");
            addressOK = false;
        } else {
            addressOK = true;
            $('input[id="user_address"]').css("border", "none");
        }

        if(nameOK == true && usernameOK == true && passOK == true && emailOK == true) {
            $('input[id="visitingaddress_reg"], input[id="reg_pwd"], input[id="user_name"], input[id="account_name"]').css("border", "none");
            
            // This $.get tries to find username what user did put in textbox, 
            //if response is undefined(=username doesn't exists) then create new user
            $.get("http://localhost:3001/users/"+username
            ).done((data, status, jq) => {
                // Checks if response is empty, if yes then creates new user
                if(data[0] == undefined) {
                    createUser();
                    alert("Rekisteröinti onnistui!");
                } else {
                    alert("Tunnus on jo varattu, kokeile uudestaan");
                }
            });

        } else if(passOK){
            alert("Ole hyvä ja täytä kaikki kentät!");
        }
    });

    function createUser() {
        var addons = $("#register_form").serialize();

        $.post(
            "http://localhost:3001/create_user", 
            addons
        ).done ( (data, status, jqxhr) => {

        }).fail( (jqxhr, status, error) => {
            console.log("status= "+status+", error: "+error);
        });
    }
});