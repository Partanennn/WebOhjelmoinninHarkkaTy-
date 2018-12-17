$(() => {
    if ( sessionStorage["login_role"] == "admin") {
        $("#machineTnappidiv").append("<button type='submit' id='lisaysnappi'>Lisää laite</button>");
    }

    // Lisää hakuformiin omistaja-kohtaan tyhjän optionin
    $("#owner_search").append("<option></option>");
    
    // Lisää omistajat
    $.get(
        "http://localhost:3001/owners"
    ).done( (data, status, jqXHR) => {
        data.forEach( (value, index) => {
            $("#edit_owner").append(
                "<option value=" + value.id + ">" + value.name +
                "</option>"
            );

            $("#add_owner").append(
                "<option value=" + value.id + ">" + value.name +
                "</option>"
            );

            $("#owner_search").append(
                "<option>" + value.name +
                "</option>"
            )
        })
    });

    // Lisää hakuformiin kategoria-kohtaan tyhjän optionin
    $("#category_search").append("<option></option>");
    
    // Lisää kategoriat
    $.get(
        "http://localhost:3001/categories"
    ).done( (data, status, jqXHR) => {
        data.forEach( (value, index) => {
            $("#edit_category").append(
                "<option value=" + value.id + ">" + value.category +
                "</option>"
            );

            $("#add_category").append(
                "<option value=" + value.id + ">" + value.category +
                "</option>"
            );

            $("#category_search").append(
                "<option>" + value.category +
                "</option>"
            );
        });
    })



    $("#lisaysnappi").click(() => {
        $("#addMachine_dialog").dialog("open");
    });

    $("#search_button").click(() => {
        var hakuehdot = $("#searchForm").serialize();
        $.post("http://localhost:3001/machines",
            hakuehdot
        ).done( (data, status, jqXHR) => {
            $("#machinesTbody").empty();
            data.forEach( (laite) => {
                var nappi = "";
                if ( sessionStorage["login_role"] == "admin") {
                    nappi = "<button type='submit' data-editid ='"+ laite.serial_number +"' class='muokkausnappi'>Muokkaa</button>" +
                    "<button type='submit' class='poistonappi' data-deleteid='"+ laite.serial_number +"'>Poista</button>"
                }

                lainausnappi = "<button type='submit' data-machineid='" + laite.serial_number + "' class='lainausnappi'>Lainaa</button>"

                $("#machinesTbody").append(
                    "<tr>" + 
                    "<td>" + laite.nimi + "</td>" + 
                    "<td>" + laite.model + "</td>" + 
                    "<td>" + laite.brand + "</td>" +
                    "<td>" + laite.description_text + "</td>" +
                    "<td>" + laite.location + "</td>" +
                    "<td>" + laite.owner + "</td>" +
                    "<td>" + laite.category + "</td>" +
                    "<td>" + laite.serial_number + "</td>" +
                    "<td>" + nappi + "</td>" +
                    "<td>" + lainausnappi + "</td>" +
                    "</tr>"
                );

                $(".muokkausnappi").click( function()  {
                    sessionStorage["data-editid"] = $(this).attr("data-editid");
                    $.get("http://localhost:3001/machines/" + $(this).attr("data-editid"))
                    .done( (data, status, jqXHR ) => {
                        $("#edit_name").val(data[0].name);
                        $("#edit_model").val(data[0].model);
                        $("#edit_brand").val(data[0].brand);
                        $("#edit_desc").val(data[0].description_text);
                        $("#edit_location").val(data[0].location);
                        $("#edit_owner").val(data[0].owner);
                        $("#edit_category").val(data[0].category);

                    });
                    $("#editMachine_dialog").dialog("open");
                });

                $(".poistonappi").click( function()  {
                    sessionStorage["data-deleteid"]=$(this).attr("data-deleteid");
                    $("#deleteMachine_dialog").dialog("open");
                });

                $(".lainausnappi").click( function() {
                    $("#rentMachine_dialog").dialog("open");
                    $("#rent_user_name").val(sessionStorage['login_username']);
                    $("#rent_machine_id").val($(this).attr("data-machineid"));
                });
            });
        }).fail( (jqXHR, status, error) => {
            console.log("Status= " + status + ", " + error);
        });
    });

    // Poistaa laitteen
    $("#deleteMachine_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Kyllä",
                click: function()  {
                    var key = sessionStorage["data-deleteid"];
                    $.ajax(
                        {
                            url: "http:localhost:3001/machines/"+key,
                            method: 'delete'
                        }).done( (data, status, jqXHR) => {
                            window.location.href='laitteet.html';
                            //$("#deleteMachine_dialog").dialog("close");
                            //$("#searchForm").submit();
                            //$("#machinesTbody").clear();
                        }).fail( (jqXHR, status, errorThrown) => {
                            console.log("Call failed: "+errorThrown);
                        });
                }
            },
            {
                text: "En",
                click: () => {
                    $("#deleteMachine_dialog").dialog("close");
                }
            }
        ]
    });

    // Muokkaa laitetta ja päivittää tiedon tietokantaan jos käyttäjä painaa tallenna
    $("#editMachine_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: () => {
                    $.ajax({
                        url: "http://localhost:3001/machines/" + sessionStorage['data-editid'],
                        method: 'put',
                        data: $("#editMachine_form").serialize()
                    }
                    ).done( (data, status, jqXHR) => {
                        if(jqXHR.status == 204) {
                            alert("Tiedot päivitetty onnistuneesti!");    
                            window.location.href = "laitteet.html";
                        } else alert("Jotain meni pieleen :(");
                    }).fail();
                }
            },
            {
                text: "Peruuta",
                click: () => {
                    $("#editMachine_dialog").dialog("close");
                }
            }
        ]
        
    });

    // Lisää laitteen tietokantaan
    $("#addMachine_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: function() {
                    $.post(
                        "http://localhost:3001/machines/add",
                        $("#addMachine_form").serialize(),
                    ).done( () => {
                        alert("Laite lisätty onnistuneesti!");
                        window.location.href = "laitteet.html";

                    })
                }
            },
            {
                text: "Peruuta",
                click: () => {
                    $("#addMachine_dialog").dialog("close");
                }
            }
        ]
    });

    // Varaa laitteen
    $("#rentMachine_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: function () {
                    $.post(
                        "http://localhost:3001/varaukset/add", 
                        $("#rentMachine_form").serialize(),
                        () => {
                            if(jqXHR.status == 201) {
                                alert("Laite varattu onnistuneesti!");
                                window.location.href = "laitteet.html";
                            }
                        }
                    )
                }
            },
            {
                text: "Peruuta",
                click: () => {
                    $("#rentMachine_dialog").dialog("close");
                }
            }

        ]
    });
});

// Tämän avulla sivu ei päivity kun painetaan nappia formissa
// $(document).on("submit", "form", function(e){
//     e.preventDefault();
// });