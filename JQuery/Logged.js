$( () => {
    if(sessionStorage['logged'] != "true") {
        window.location.href='rekisteroidy.html';
    }
});