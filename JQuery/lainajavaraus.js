$(() => {

    $.get(
        "http://localhost:3001/rent_machines"
    ).done( (data, status, jqXHR) => {
        $("#rent_machinesTbody").empty();
        data.forEach( (laite) => {
            var nappi = "";
            
            nappi = "<button type='submit' data-editid ='"+ laite.serial_number +"' class='muokkausnappi'>Muokkaa</button>" +
            "<button type='submit' class='peruutusnappi' data-editid='"+ laite.serial_number +"'>Peru</button>"
            

            if(laite.borrower == sessionStorage['login_username'] || sessionStorage['login_role'] == "admin") {
                $("#rent_machinesTbody").append(
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
            }
            $(".muokkausnappi").click( function () {
                sessionStorage["data-editid"] = $(this).attr("data-editid");
                $.get(
                    "http://localhost:3001/varaukset/add/" + $(this).attr("data-editid")
                ).done( (data, status, jqXHR ) => {
                    $("#editRent_start").val(dateFormatter(data[0].start_day));
                    $("#editRent_end").val(dateFormatter(data[0].end_day));
                });
                $("#editRent_dialog").dialog("open");
            })

            $(".peruutusnappi").click( function () {
                sessionStorage["data-editid"] = $(this).attr("data-editid");
                $.get("http://localhost:3001/machines/" + $(this).attr("data-editid"));
                $("#cancelRent_dialog").dialog("open");
            })
        });
    });

    $("#editRent_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Tallenna",
                click: function () {
                    $.ajax({
                        url: "http://localhost:3001/varaukset/add/"+sessionStorage['data-machineid'],
                        method: 'put',
                        data: $("#rentMachine_form").serialize()
                    }).done( (data, status, jqXHR) => {
                        if(jqXHR.status == 204) {
                            alert("Varaus muutettu onnistuneesti!");
                            window.location.href = "lainatjavaraukset.html";
                        } else alert("Jotain meni pieleen :(");
                    }).fail();
                }
            },
            {
                text: "Peruuta",
                click: () => {
                    $("#editRent_dialog").dialog("close");
                }
            }

        ]
    });

    $("#cancelRent_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Kyllä",
                click: function() {
                    $.ajax({
                        url: "http://localhost:3001/varaukset/cancel/" + sessionStorage['data-editid'],
                        method: 'put',
                        data: $("#cancelRent_form").serialize()
                    }).done( (data, status, jqXHR) => {
                        if(jqXHR.status == 204) {
                            alert("Varaus peruttu onnistuneesti!");
                            window.location.href = "lainatvaraukset.html";
                        } else alert("Jotain meni pieleen :(");
                    }).fail();
                }
            },
            {
                text: "En",
                click: () => {
                    $("#cancelRent_dialog").dialog("close");
                }
            }
        ]
    })

    function dateFormatter(date) {
        var d = new Date(date);
        if(date != null)
            return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
        else
            return null;
    }

})