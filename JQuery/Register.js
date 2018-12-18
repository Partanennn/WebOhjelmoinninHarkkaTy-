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
        var city = $("#user_city").val();
        var pass2 = $("#reg_pwd2").val();
        // Variables to check if textbox is not empty
        var nameOK, usernameOK, passOK, pass2OK, emailOK, addressOK, cityOK;

        // Nämä if-elset kontrolloivat inputteja ja niiden borderreita
        if(username == "") {
            $('input[id="account_name"]').css("border", "2px solid red");
            usernameOK = false;
        } else {
            usernameOK = true;
            $('input[id="account_name"]').css("border", "none");
        }

        if(name == "") {
            $('input[id="user_name"]').css("border", "2px solid red");
            nameOK = false;
        } else {
            nameOK = true
            $('input[id="user_name"]').css("border", "none");
        } 
        
        if(pass == "") {
            $('input[id="reg_pwd"]').css("border", "2px solid red");
            passOK = false;
        } else {
            passOK = true;
            $('input[id="reg_pwd"]').css("border", "none");
        }
        
        if(pass2 == "") {
            $('input[id="reg_pwd2"]').css("border", "2px solid red");
            pass2OK = false;
        } else {
            pass2OK = true;
            $('input[id="reg_pwd2"]').css("border", "none");
        }

        // Tämä tarkistaa ovatko salasanat samat
        if(passOK && pass2OK && pass == pass2) {
            passOK = true;
        } else {
            passOK = false;
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

        if(city == "") {
            $('input[id="user_city"]').css("border", "2px solid red");
            cityOK = false;
        } else {
            cityOK = true;
            $('input[id="user_city"]').css("border", "none");
        }

        if(nameOK && usernameOK && passOK && emailOK && addressOK && cityOK) {
            $('input[id="user_name"], input[id="account_name"], input[id="reg_pwd"], input[id="reg_pwd2"], input[id="user_address"], input [id="user_city"], input[id="user_email"]').css("border", "none");
            
            $.get("http://localhost:3001/users/"+username
            ).done((data, status, jq) => {
                // Tarkistaa palauttaako serveri mitään objektia, jos ei niin silloin tietokannassa
                // ei ole annetulla tunnuksella olevaa käyttäjää
                if(data[0] == undefined) {
                    createUser();
                    alert("Rekisteröinti onnistui!");
                    window.location.href='rekisteroidy.html';
                } else {
                    alert("Tunnus on jo varattu, kokeile uudestaan");
                }
            });

        } else {
            alert("Ole hyvä ja täytä kaikki kentät!");
        }
    });

    function createUser() {
        var addons = $("#registration_form").serialize();
        $.post(
            "http://localhost:3001/users", 
            addons
        ).done ( (data, status, jqxhr) => {

        }).fail( (jqxhr, status, error) => {
            console.log("status= "+status+", error: "+error);
        });
    }
});