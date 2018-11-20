$(() => {
    $("#change_data_div").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: () => {

                }
            },
            {
                text: "Peruuta",
                click: function() {
                    $(this).dialog("close");
                }
            }
        ]
    });

    $("#muuta_link").click( () => {
        $("#change_data_div").dialog("open");
    });


    $.get("http://localhost:3001/users/" + 
        sessionStorage['login_username']
    ).done( (data, status, jqXHR) => {
        $("#").val(data[0].name);
        $("#").val(data[0].streetAddress);
        $("#").val(data[0].city);
        $("#").val(data[0].email);
    }
    ).fail( (jqXHR, status, error) => {
        console.log("Status="+status+", error="+error);
    });
});