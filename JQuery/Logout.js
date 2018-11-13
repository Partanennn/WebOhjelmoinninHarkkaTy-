$(() => {
    $("#logout").click(() => {
        $("#logout_dialog").dialog("open");  
    });
    $("#logout_dialog").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "Kyllä",
                click: () => {
                    sessionStorage.clear();
                    window.location.href='rekisteroidy.html';
                }
            },
            {
                text: "En",
                click: () => {
                    $("#logout_dialog").dialog("close");
                }
            }
        ]
    });
    
});