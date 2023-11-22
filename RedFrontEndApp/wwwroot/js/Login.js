/// <reference path="./layout.js" />
/// <reference path="../lib/IO/ShotCuts.js" />
/// <reference path="../lib/Jquery/jquery-ui.js" />

$(document).ready(function () {
    Commons.ValidateSettings("#FrmLogon");
    Commons.LocalDB.Delete("jwt");
    $("#CmdLogin").click(() => { CmdLogin_Click(); return false; });
});


function CmdLogin_Click() {
    try {

        if ($('#FrmLogon').valid() === false) {
            return false;
        }

        const url = $("#CmdLogin").data('url');
        const data = JSON.stringify(Commons.Serialize.ToJson($('#FrmLogon')));
        
        $("#LoginGroup").hide();
        $("#Procesando").show();

        Commons.HttpRequest.Post(url, data, (code, message, dataRes) => {
            switch (code) {
                case 200:
                    $("#Password").val("");
                    $("#LoginModalframe").modal("hide");
                    if (dataRes.Jwt != null && dataRes.Jwt != undefined) {
                        Commons.LocalDB.Save("sess", dataRes.Jwt);
                    }
                    setTimeout(() => { window.location.href = $("#CmdLogin").data("home") }, 200);
                    break;
                default:
                    $("#Password").val("");
                    $("#ErrMensaje").html(message);
                    $('.help-block').empty();
                    $('.is-invalid').removeClass(" is-invalid");
                    $('.is-valid').removeClass(" is-valid");
                    $("#LoginGroup").show();
                    $("#Procesando").hide();
                    break;
            }
        });
    } catch (Exception) {
        $("#ErrMensaje").text(Exception);
    }
}
