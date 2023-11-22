/// <reference path="layout.js" />

$(document).ready(function () {
    StartAjaxTrasert();
    if (Commons.LocalDB.Read("sess") != undefined) {
        Commons.LocalDB.Save("jwt", "bearer " + Commons.LocalDB.Read("sess"));
        Commons.HttpRequest.Post($("#Welcome").data("url"), null, false, (code, message) => {
            if (code == 0) {
                console.log("JWT guardado");
                Commons.LocalDB.Delete("sess");
                window.location.href = $("#Welcome").data("home");
            }
        });
    } else {
        window.location.href = "/Seguridad/Login";
    }
});