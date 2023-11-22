/// <reference path='./layout.js' />
/// <reference path='../lib/io/jsio.js' />
/// <reference path='../lib/jquery/jquery-ui.js' />
/// <reference path='../lib/pako/dist/pako.js' />

$(document).ready(() => {
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
    });

    InicializarBotones();
    CargaUsuario();
});

const InicializarBotones = () => {
    $('#Cmd_Guardar').click(function () { Cmd_Guardar_click(); return false; });
    $('#Cmd_Cancela').click(function () { Cmd_Cancelar_click(); return false; });
}

const Cmd_Guardar_click = () => {

    if ($('#FrmAltaUsuario').valid() === false) {
        console.log("error de validacion");
        return false;
    }

    // Crear un objeto Date a partir del valor del campo
    var fecha = new Date($("#FechaNacimiento").val());

    // Formatear la fecha como cadena ISO 8601
    var fechaFormateada = fecha.toISOString();

    var jsonObj = Commons.Serialize.ToJson($('#FrmAltaUsuario'));
    jsonObj.FechaNacimiento = fechaFormateada;

    const url = $("#Cmd_Guardar").data('url');
    const data = JSON.stringify(jsonObj);
    
    if ($("#temp").val() > 0) {
        GuardaEdicion(url, data);
    } else {
        GuardaNuevo(url, data);
    }
}

const Cmd_Cancelar_click = () => {
    window.location.href = "/Usuarios/Listado";
}

const GuardaNuevo = (url,data) => {
    $("#Procesando").show();
    Commons.HttpRequest.Post(url, data, (codigo, mensaje, data) => {
        switch (codigo) {
            case 201:
                ShowAlert("#AlertMainContainer", "S", "Usuario registrado exitosamente");
                $("#Procesando").hide();
                setTimeout(() => { window.location.href = "Listado" }, 500);
                break;
            default:
                ShowAlert("#AlertMainContainer", "E", mensaje);
                $("#Procesando").hide();
                break;
        }
    });
}

const GuardaEdicion = (url, data) => {
    $("#Procesando").show();
    Commons.HttpRequest.Put(url, data, (codigo, mensaje, data) => {
        switch (codigo) {
            case 200:
                ShowAlert("#AlertMainContainer", "S", mensaje);
                $("#Procesando").hide();
                setTimeout(() => { window.location.href = "Listado" }, 500);
                break;
            default:
                ShowAlert("#AlertMainContainer", "E", data);
                $("#Procesando").hide();
                break;
        }
    });
}

const CargaUsuario = () => {
    if ($("#temp").val() > 0) {
        const url = $("#Cmd_Guardar").data('url');
        const msg = $("#temp").val();

        $("#Procesando").show();
        Commons.HttpRequest.Get(url + "/" + msg, null, (codigo, mensaje, data) => {
            switch (codigo) {
                case 200:
                    Commons.UnSerialize.UnserializeServer($("#FrmAltaUsuario"), data);
                    var fecha = new Date($("#FechaNacimiento").val());

                    var dia = fecha.getDate();
                    var mes = fecha.getMonth() + 1;
                    var año = fecha.getFullYear();

                    // Formatear la fecha como "DD/MM/YYYY"
                    var fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`;

                    $("#FechaNacimiento").val(fechaFormateada);
                    $("#Procesando").hide();
                    break;
                default:
                    ShowAlert("#AlertMainContainer", "E", data);
                    $("#Procesando").hide();
                    break;
            }
        });
    }
}