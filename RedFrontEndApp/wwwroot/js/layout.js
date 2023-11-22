$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional["es"]);

const Api = "http://localhost:5004/API/";

const Send = function (type, url, msg, callback) {
    $.ajax({
        type,
        url,
        data: msg,
        success: function (response) {
            console.log(response)
            callback(response.Codigo, response.Mensaje, response.Data)
        },
        error: function (ex) {
            console.log(ex)
            if (ex.responseJSON != undefined) {
                callback(ex.responseJSON.Codigo, ex.responseJSON.Mensaje)
            } else {
                callback(500, ex)
            }
        },
        processData: false,
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        async: true,
        headers: {
            'Authorization': "Bearer " + Commons.LocalDB.Read("sess")
        }
    });
}

const SendDelete = function (url, msg, callback) {
    $.ajax({
        type: "DELETE",
        url,
        data: msg,
        success: function (response) {
            callback(204, "Eliminado exitosamente")
        },
        error: function (ex) {
            console.log(ex)
            if (ex.responseJSON != undefined) {
                callback(ex.responseJSON.Codigo, ex.responseJSON.Mensaje)
            } else {
                callback(500, ex)
            }
        },
        processData: false,
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        headers: {
            'Authorization': "Bearer " + Commons.LocalDB.Read("sess")
        }
    });
}

const SendGet = function (url, msg, callback) {
    $.ajax({
        type: "GET",
        url,
        data: msg,
        success: function (response) {
            callback(response.Codigo, response.Mensaje, response.Data)
        },
        error: function (ex) {
            console.log(ex)
            if (ex.responseJSON != undefined) {
                callback(ex.responseJSON.Codigo, ex.responseJSON.Mensaje)
            } else {
                callback(500, ex)
            }
        },
        processData: false,
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        headers: {
            'Authorization': "Bearer " + Commons.LocalDB.Read("sess")
        }
    });
}

const Commons = {
    HttpRequest: {
        Get: function (url, msg = null, callback) {
            if (msg == null) {
                Send("GET", Api + url, msg, callback);
            }
            else {
                SendGet(Api + url, msg, callback);
            }
        },
        Post: function (url, msg = null, callback) {
            Send("POST", Api + url, msg, callback);
        },
        Put: function (url, msg = null, callback) {
            Send("PUT", Api + url, msg, callback);
        },
        Delete: function (url, msg = null, callback) {
            SendDelete(Api + url, msg, callback);
        }
    },
    UnSerialize: {
        UnserializeServer: function (frm, Collection) {
            $.each(Collection, function (key, value) {
                const ctrl = $('[name=' + key + ']', frm);
                if (typeof value == "string" && value.toString().indexOf("/Date(") !== -1) {
                    ///Esta funcion esta en la libreria JSIO 
                    value = formatJSONDateFull(value).replace(/-/g, "/");
                }
                switch (ctrl.prop("type")) {
                    case "radio": case "checkbox":
                        ctrl.each(function () {
                            if ($(this).attr('value') == value) $(this).attr("checked", value);
                        });
                        break;

                    case "select-one":
                        ctrl.val(value.toString());
                        break;

                    default:
                        switch (ctrl.prop("tagName")) {
                            case "P": case "A":
                                ctrl.text(value);
                                break;
                            default:
                                ctrl.val(value);
                                break;
                        }
                        break;
                }
            });
        }
    },
    Serialize: {
        ToJson: function getFormData($form) {
            const unindexed_array = $form.serializeArray();
            let indexed_array = {};

            $.map(unindexed_array, function (n, i) {
                if (n['name'] != "__RequestVerificationToken" && n['name'] != "temp") {
                    indexed_array[n['name']] = n['value'];
                }
            });

            return indexed_array;
        },
        ToQuery: function getFormData($form) {
            const unindexed_array = $form.serializeArray();
            let query = "";

            $.map(unindexed_array, function (n, i) {
                if (n['name'] != "__RequestVerificationToken") {
                    if (n['value'] != undefined && n['value'] != "") {
                        query += n['name'] + "=" + n['value'] + "&";
                    }
                }
            });

            return query;
        }
    },
    ValidateSettings: function (Validateform) {

        $('span.field-validation-valid, span.field-validation-error').each(function () {
            $(this).addClass('help-block');
        });

        const $form = $(Validateform);
        let $validate = $form.validate();
        const errorClass = "is-invalid";
        const validClass = "is-valid";
        $validate.settings.errorClass = errorClass;
        $validate.settings.validClass = validClass;

        let previousEPMethod = $validate.settings.errorPlacement;
        $validate.settings.errorPlacement = $.proxy(function (error, inputElement) {
            if (previousEPMethod) {
                previousEPMethod(error, inputElement);
            }
            inputElement.parent().addClass(errorClass);
        }, $form[0]);

        let previousSuccessMethod = $validate.settings.success;
        $validate.settings.success = $.proxy(function (error) {
            //we first need to remove the class, cause the unobtrusive success method removes the node altogether
            error.parent().parent().removeClass(errorClass);
            if (previousSuccessMethod) {
                previousSuccessMethod(error);
            }
        });
    },
    Cookie: {
        setCookie: function (cname, cvalue, exdays, path, domain) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            const curCookie = cname + "=" + cvalue +
                ", expires=" + d.toUTCString() +
                ", path=" + path +
                ", domain=" + domain +
                ", SameSite=none";

            document.cookie = curCookie;
        },
        getCookie: function (cname) {
            const name = cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);

            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    },
    LocalDB: {
        Save: function (name, value, expires = false) {
            try {
                window.localStorage.setItem(name, value);
            } catch (exeption) {
                console.log(exeption);
                Commons.Cookie.setCookie(name.value, 90, "", "");
            }
        },
        Read: function (name) {
            let response = null;
            try {
                response = window.localStorage.getItem(name);
            }
            catch (exeption) {
                console.log(exeption);
                response = Commons.Cookie.getCookie(name);
            }
            return response;
        },
        Delete: function (name) {
            try {
                window.localStorage.removeItem(name);
            }
            catch (exception) {
                console.log(exception)
            }
        }
    },
    Misc: {
        Grid: {
            InicializaGrid: function (contenedor) {
                const gridObj = new GridView();
                gridObj.starting();
                gridObj.Property.Set_CssFooter("table-light small");
                gridObj.Property.Set_CSS('table table-light table-striped rounded');
                gridObj.Data.Sort.cols(true);
                gridObj.Rows.Set_Align("Left");
                gridObj.Page.PageClientSide(true);
                gridObj.Page.CreateNavi = true;
                gridObj.Render.IsSubGrid(false);
                gridObj.Render.Auto(false);
                gridObj.Render.BuildHeader(false);
                gridObj.Render.SelectiveColumns(true);
                gridObj.Render.UseMaterKeyWhenDA(true);
                gridObj.Render.AppendObjects(true);
                gridObj.Render.Set_Container(contenedor);
                return gridObj;
            }
        }
    }
};

function ShowAlert(padre, tipo, mensaje) {
    let clase = "";
    let icono = "";

    switch (tipo) {
        case "E":
            clase = "alert alert-danger";
            icono = "fa fa-exclamation-triangle";
            break;
        case "W":
            clase = "alert alert-warning";
            icono = "fa fa-exclamation-circle";
            break;
        case "S":
            clase = "alert alert-success";
            icono = "fa fa-check-circle";
            break;
        case "I":
            clase = "alert alert-primary";
            icono = "fa fa-info-circle";
            break;
    }

    $(padre).show();
    $(padre).html("");
    $(padre).append(document.createElement("div"));

    const elemento = $(padre).children().first();
    elemento.addClass(clase).attr("role", "alert");
    elemento.append("<label class='btnG " + icono + " rounded'></label>");
    elemento.append("<label class='message'>" + mensaje + "</label>");
    setTimeout(function () { $(padre).fadeOut(5000).focus(); }, 10000);
}
function AlertDialog(Mensaje, MisBotones) {
    let Botones = null;
    if (MisBotones == null) {
        Botones = {
            "Aceptar": function () {
                $(this).dialog("close");
            }
        };
    } else {
        Botones = MisBotones;
    }
    if (Mensaje.length > 0) {
        $("#dialog-confirm #lbl_Mensaje").text(Mensaje);
    } else {
        $("#dialog-confirm #lbl_Mensaje").text($("#dialog-confirm #lbl_Mensaje").data("default"));
    }
    $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: Botones
    });
}

function FechaActual() {
    const today = new Date();
    return today.getDate().toString().lpad(0, 2) + "/" + (today.getMonth() + 1).toString().lpad(0, 2) + "/" + today.getFullYear().toString().lpad(0, 2);
}