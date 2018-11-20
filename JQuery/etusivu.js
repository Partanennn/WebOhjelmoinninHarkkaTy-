$(() => {
    $("#change_data_div").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Peruuta",
                click: function() {
                    $(this).dialog("close");
                }
            }
        ]
    });

    // Ylemmän tallenna-napin painallus
    $("#save_changed_data").click(() => {
        if($("#user_name").val() == "") {
            alert("Nimi kenttä ei saa olla tyhjä!!");
            $("#user_name").css("border", "2px solid red");
        } else {
            $("#user_name").css("border", "");
            
            $.ajax({
                url: "http://localhost:3001/users/" + sessionStorage['login_username'],
                method: 'put',
                data: $("#change_data").serialize()
            }
            ).done( (data, status, jqXHR) => {
                if(jqXHR.status == 204) {
                    alert("Tiedot päivitetty onnistuneesti!");    
                    window.location.href = "etusivu.html";
                } else alert("Jotain meni pieleen :(");
            }).fail();
        }
    })

    // Aukaisee dialogin
    $("#muuta_link").click( () => {
        $("#change_data_div").dialog("open");
    });

    // Hakee tieot muuta tietoja-dialogiin
    $.get("http://localhost:3001/users/" + 
        sessionStorage['login_username']
    ).done( (data, status, jqXHR) => {
        $("#user_name").val(data[0].name);
        $("#user_address").val(data[0].streetAddress);
        $("#user_city").val(data[0].city);
        $("#user_email").val(data[0].email);
    }
    ).fail( (jqXHR, status, error) => {
        console.log("Status="+status+", error="+error);
    });
});