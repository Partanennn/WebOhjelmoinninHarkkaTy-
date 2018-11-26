$(() => {
    $("#search_button").click(() => {
        var hakuehdot = $("#searchForm").serialize();
        $.post("http://localhost:3001/machines",
            hakuehdot
        ).done( (data, status, jqXHR) => {
            $("#machinesTbody").empty();
            data.forEach( (laite) => {
                var nappi = "";
                if ( sessionStorage["login_role"] == "admin") {
                    nappi = "<button type='submit' class='muokkausnappi'>Muokkaa</button>" +
                    "<button type='submit' class='poistonappi' data-deleteid='"+ laite.serial_number +"'>Poista</button>"
                }

                $("#machinesTbody").append(
                    "<tr>" + 
                    "<td>" + laite.name + "</td>" + 
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

                $(".muokkausnappi").click(() => {
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
});

// Tämän avulla sivu ei päivity kun painetaan nappia formissa
$(document).on("submit", "form", function(e){
    e.preventDefault();
});