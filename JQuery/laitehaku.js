$(() => {
    if ( sessionStorage["login_role"] == "admin") {
        $("#machineTnappidiv").append("<button type='submit' id='lisaysnappi'>Lisää laite</button>");
    }

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
            });
        }).fail( (jqXHR, status, error) => {
            console.log("Status= " + status + ", " + error);
        });
    });

    
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
        
    })

    $("#addMachine_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: function() {
                    $.ajax({
                        url: "http://localhost:3001/machines/add",
                        method: 'post',
                        data: $("#addMachine_form").serialize()
                    }).done(function(data, status, jqXHR)  {
                        if (jqXHR.status == 201) {
                            alert("Laite lisätty onnistuneesti!");
                            window.location.href = "laitteet.html";
                        } else alert("Jotain meni pieleen :(")
                    }).fail();  
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
});

// Tämän avulla sivu ei päivity kun painetaan nappia formissa
$(document).on("submit", "form", function(e){
    e.preventDefault();
});