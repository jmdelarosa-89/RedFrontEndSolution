/// <reference path='./layout.js' />
/// <reference path='../lib/io/jsio.js' />
/// <reference path='../lib/jquery/jquery-ui.js' />
/// <reference path='../lib/gridview/gridviews.js' />
/// <reference path='../lib/pako/dist/pako.js' />

$(document).ready(() => {
    InicializarBotones();
    CargaUsuarios();
});

const InicializarBotones = () => {
    $('#Cmd_Nuevo').click(function () { Cmd_Nuevo_click(); return false; });
    $('#Cmd_Buscar').click(function () { CargaUsuarios(); return false; });
}

const CargaUsuarios = () => {
    const url = $("#Cmd_Buscar").data('url');
    const msg = Commons.Serialize.ToQuery($("#FiltroUsuario")) + "numPagina=1&longPagina=20";

    $("#Procesando").show();
    Commons.HttpRequest.Get(url, msg, (codigo, mensaje, data) => {
        switch (codigo) {
            case 200:
                for (let index = 0; index <= data.length - 1; index++) {
                    Object.assign(data[index], {
                        Eliminar: 'D' + index
                        , Editar: 'E' + index
                    });
                }
                Gv_Usuarios_Load(data);
                $("#Procesando").hide();
                break;
            default:
                ShowAlert("#AlertMainContainer", "E", data);
                $("#Procesando").hide();
                break;
        }
    });
}

function Gv_Usuarios_Load(data) {
    //Importante todos los campos inician con minuscula (Eliminar y Editar)
    const Contenedor = $('#Gv_Usuarios');
    const Columnas = ['Eliminar', 'Editar', 'Nombre', 'ApellidoPaterno','ApellidoMaterno','Edad','Email','Telefono'];
    const ColumnasOcultas = ['UsuarioId'];
    Contenedor.find('tr:gt(0)').remove();

    const Gv_Usuarios = Commons.Misc.Grid.InicializaGrid(Contenedor);

    Gv_Usuarios.Columns.Set_Columns(Columnas);
    Gv_Usuarios.Columns.Set_hideColumns(ColumnasOcultas);
    Gv_Usuarios.Columns.Set_IDColumn(['UsuarioId']);

    Gv_Usuarios.Data.Sort.Set_orderCol(Columnas);
    Gv_Usuarios.Format.Set_AlignMiddle(['Eliminar', 'Editar']);

    Gv_Usuarios.Render.Set_Objects(['[a=Eliminar]', '[a=Editar]']);

    Gv_Usuarios.Extended("Gv_Usuarios_Extended('Gv_Usuarios')");
    Gv_Usuarios.Data.Set_Json(data);

    Gv_Usuarios.databind();
}

function Gv_Usuarios_Extended(Obj) {

    $('#' + Obj).find('*').each((ind, obj) => {

        if (obj.id.indexOf('Editar') === 0) {

            const editIcon = document.createElement('a');
            editIcon.setAttribute('class', 'btnG fa fa-edit rounded');

            $('#' + obj.id).text('');
            $('#' + obj.id).append(editIcon);
            $('#' + obj.id).attr('Title', 'Editar usuario');

            $('#' + obj.id).click(() => {
                var id = $('#' + obj.id).data("value");
                window.location.href = "/Usuarios/Usuario/" + id;
            });
        }

        if (obj.id.indexOf('Eliminar') === 0) {
            const deleteIcon = document.createElement('a');
            deleteIcon.setAttribute('class', 'btnG fa fa-trash rounded');

            $('#' + obj.id).text('');
            $('#' + obj.id).append(deleteIcon);
            $('#' + obj.id).attr('Title', 'Eliminar usuario');

            $('#' + obj.id).click(() => {
                if (confirm('Esta operación no puede deshacerse ¿Está seguro que desea continuar?')) {
                    var id = $('#' + obj.id).data("value");
                    var url = $('#Cmd_Buscar').data("elimina");
                    $("#Procesando").show();
                    Commons.HttpRequest.Delete(url + "/" + id, null, (codigo, mensaje, data) => {
                        switch (codigo) {
                            case 204:
                                ShowAlert("#AlertMainContainer", "S", "Usuario eliminado exitosamente");
                                $("#Procesando").hide();
                                CargaUsuarios();
                                break;
                            default:
                                ShowAlert("#AlertMainContainer", "E", mensaje);
                                $("#Procesando").hide();
                                break;
                        }
                    });
                }
                return false;
            });
        }
    });
}


const Cmd_Nuevo_click = () => {
    window.location.href = "/Usuarios/Usuario";
}