$(() => {
    $("#login_button").click(() => {
        var username = $("#user_text").val();
        var password = $("#password_text").val();
        
        if(username == "" && password == "") {
            $('input[id="password_text"], input[id="user_text"]').css("border", "2px solid red");
            alert("Ole hyvä ja syötä tunnus ja salasana");
        } else if(username == "") {
            $('input[id="user_text"]').css("border", "2px solid red");
            $('input[id="password_text"]').css("border", "none");
            alert("Ole hyvä ja syötä tunnus!!");
        } else if(password == "") {
            $('input[id="user_text"]').css("border", "none");
            $('input[id="password_text"]').css("border", "2px solid red");
            alert("Ole hyvä ja syötä salasana!!");        
        } else {
            // Nollaa borderit
            $('input[id="password_text"], input[id="user_text"]').css("border", "none");
            
            // Hakee tunnuksen mukaan käyttäjän ja tarkistaa onko salasana tietokannassa sama kuin syötetty salasana
            $.get("http://localhost:3001/users/"+username)
                // Tapahtuu jos onnistuu yhdistämään databaseen, muuten hyppää suoraan fail-funktioon
                .done( (data, status, jqXHR) => {
                    if(data[0] == undefined || data[0].pass != password) {
                        alert("Väärä tunnus tai salasana!!");
                    } else if(data[0].pass == password){
                        sessionStorage['logged'] = true;        
                        sessionStorage['login_name'] = data[0].name;
                        sessionStorage['login_username'] = data[0].username;
                        sessionStorage['login_role'] = data[0].role;
                        window.location.href = 'etusivu.html';
                    }
                })
                .fail( (err) => {
                    alert("Virhe haettaessa dataa, kokeile uudestaan");
                });
        }
    });
});