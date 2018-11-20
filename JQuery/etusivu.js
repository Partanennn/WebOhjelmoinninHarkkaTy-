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

    $("#save_changed_data").click(() => {
        $.ajax({
            url: "http://localhost:3001/users/" + sessionStorage['login_username'],
            method: 'put',
            data: $("#change_data").serialize()
        }
        ).done( (data, status, jqXHR) => {
            
            window.location.href = "etusivu.html";
        }).fail();
    })

    $("#muuta_link").click( () => {
        $("#change_data_div").dialog("open");
    });


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