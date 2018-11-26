$(() => {
    $("#search_button").click(() => {
        var hakuehdot = $("#searchForm").serialize();
        $.post("http://localhost:3001/machines",
            hakuehdot
        ).done( (data, status, jqXHR) => {
            $("#machinesTbody").empty();
            data.forEach( (laite) => {
                
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
                    "</tr>"
                );
            });
        }).fail( (jqXHR, status, error) => {
            console.log("Status= " + status + ", " + error);
        });
    });
});

// Tämän avulla sivu ei päivity kun painetaan nappia formissa
$(document).on("submit", "form", function(e){
    e.preventDefault();
});