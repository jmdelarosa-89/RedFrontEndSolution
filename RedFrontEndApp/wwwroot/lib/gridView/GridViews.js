var LstStackGrid = [];
//propiedades del grid
var Params = {
    id: "Gv_Render_Auto"  // id generico establecido para cuando se arma una construccion total del grid (in div)
    , ancho: "100%"         // Ancho por defecto
    , alto: "100%"          // Alto por defecto
    , setAlign: "center"
    //Columnas
    , Columns: null  //Contiene las columnas que seran pintadas
    , hideCols: null //Contiene las columnas que seran ocultadas (o no pintadas) definidas por el usuario
    , IDColumn: null //Contiene los campos llave para la operacion de edicion y eliminiacion
    , CSSName: null  //Contiene la clase con la cual se aplicara estilo a la tabla
    , CssHeader: null//Contiene la clase con la cual se aplicara estilo al encabezado de la tabla
    , CssFotter: 'pgr'//Contiene la clase con la cual se aplicara estilo al final (fotter) de la tabla

        //Mascaras y tipos de Dato
    , ColsWithDate: null        //Columnas que son del tipo Fecha
    , MaskOfDate: 'DD/MM/YYYY'  //mascara que se aplicara a los campos tipo fecha

    , MoneyCols: null
    , PercentCols: null
    , IntCols: null
    , AlignRightCols: null
    , AlignLeftCols: null
    , AlignMiddleCols: null
    , hideZero: false
    , hideZeroPerc: false
    
    //Paginado
    , printPages: false
    , LibroSeleccionado: 1
    , pagesize: 5      //Longitud de la pagina para el sistema de paginado
    , showPage: 1       //Numero de pagina que sera visualizada
    , NumberPages: 1
    , lastSelectPage: 1
    , ServerSide: true  //Bandera que determina  si el proceso de paginado sera desde el servidor
    , ClientSide: false //Badera que determina si se pagina desde el lado del cliente (no recomendado)

        //Elementos para la columna de edicion
    , HName: ""
    , pos: 0
    , editcolumn: false // Habilita la columna de edicion
    , onlyEdit: false   // Establece si solo se motrara la columna de Edicion
    , onlyDelete: false // Establece si solo se mostrara la columna de elimindado
    , JSonData: null    // Recolecta la coleccion JSON para procesar el grid

        //pintado del grid
    , div: false    //Bandera que establece si el contenedor del grid sera un div
    , table: false  //Bandera que Establece si se adjuntara filas a una tabla existente
    , header: true  //Bandera que determina si se generara encabezado apartir de las descripciones de la coleccion JSON
    , ColSpan: 0 // columnas de integracion para el footer
    , pageObjs: "" // objetos de paginacion para el footer
    , _Extended: null

    , ListOnbjects: null // Establece la coleccion de Objetos a Pintar [input=ID]
        //Modos de pintado

    , Autocols: true  // Bandera para determinar el pintado Automatico
    , footer: false
    , columnbind: true // Bandera para controlar si sera pintado de columnas Definidas
    , columnhide: true // Bandera para controlar el ocultado de las columnas definidas
    , objectForRender: null //Contenedor: Objeto en el cual se generara o las filas o el grid completo
    , workTrans: null //Objeto: es la referencia al objeto que mostrara la transicion durante el callback
    , Append: false //Bandera: Establece si se realizara la tabla con los objetos estasblecidos en la propiedad Set_Objects

        //Elementos para el footer
    , FooterCustomIDS: null
    , FooterCustomType: null
    , FooterCustomwidth: null
    , FooterCustomRemove: null

        //Auxiliares para el Aplicado de Estilos
    , FilaAlternativa: 0

        //Auxiliares para el ordenado
    , sortRows: false
    , sortCols: false
    , sortArrayRows: null
    , sortArrayCols: null
    , UseIDValue: false
    , Data_Value: false
    , addFormRow: false
    , addFilterRow: false
    , isSubGrid: false
    , parendId: 0
    , BindPageSize: true
    , GridConTipoReg: false            //Para indicar que contiene el grid de datos una columna de tipo TipoRegistro para pintar cortes ktm
    , GridConBtnVisibleReg: false      //Para indicar que contiene el grid de datos una columna de tipo BotonVisible
        //para indicar si pinta o no los botones en el registro          ktm 09072019

        //Auxiliares para la trata de Filas Dinamicas
    , _CanClick: false
    , _AppendObject: null

        ///Mensajes Auxiliares
    , MsgDelete: "Eliminar"
    , MsgEdit: "Editar"
    , JQueryEditIcon: "ui-icon-pencil"
    , JQueryDeleteIcons: "ui-icon-trash"

        ///Filtros
    , RespaldoJson: null
    , SeGeneroRespado: false
};
var _Params = JSON.parse(JSON.stringify(Params));

//Prototipo para Gridview
var gridview = {
    version: '1.3.1',
    Property: {
        Set_ID: function (set_id) {
            Params.id = set_id;
        },
        Get_ID: function () {
            return Params.id;
        },
        Set_with: function (wd) {
            Params.ancho = wd;
        },
        Get_with: function () {
            return Params.ancho;
        },
        Set_heigth: function (hg) {
            Params.alto = hg;
        },
        Get_heigth: function () {
            return Params.alto;
        },
        Set_CssHeader: function (className) {
            Params.CssHeader = className;
        },
        Set_CssFooter: function (className) {
            Params.CssFotter = className;
        },
        Set_CSS: function (className) {
            Params.CSSName = className;
        },
        Get_CSS: function () {
            return Params.CSSName;
        }
    },

    Columns: {
        Set_IDColumn: function (id) {//Arreglo: Columna Clave para Edicion y Eliminado puede ser una llave compuesta por 1 o varias columnas
            Params.IDColumn = id;
        },
        Get_IDColumn: function () {//Arreglo: Devuelve la o las Columna(s) Clave para Edicion y Eliminado
            return Params.IDColumn;
        },
        Set_Columns: function (cols) {//Arreglo: Especificacion manual de las columnas que seran mostradas
            Params.Columns = cols;
        },
        Get_Columns: function () {//Arreglo: devuelve las columnas que seran mostradas.
            return Params.Columns;
        },
        Set_hideColumns: function (cols) {//Arreglo:Establece las columnas que se pueden Ocultar
            Params.hideCols = cols;
        },
        Get_hideColumns: function () {//Arreglo: Regresa las columnas Ocultas
            return Params.hideCols;
        }

    },

    Rows: {//Gestion de filas
        add: function (row) {
            if (Params.JSonData == null || Params.JSonData == undefined) {
                Params.JSonData = [];
            }
            /// Validando Cantidad de Cols
            Params.JSonData.push(row);
            Params.SeGeneroRespado = false;
            BindingGrid();
        },
        remove: {
            ByCol: function (colname, value) {
                for (var item = 0; item <= Params.JSonData - 1 ; item++) {
                    if (Params.JSonData[item]["Colname"][colname].replace(/ /g, '') == value.replace(/ /g, '')) {
                        Params.JSonData.splice(item, 1);
                        break;
                    }
                }

                Params.SeGeneroRespado = false;
                BindingGrid();
                
            },
            ByIndex: function (index) {
                if (Params.JSonData == null || Params.JSonData == undefined || Params.JSonData.length <= 0) {
                    return;
                } else {
                    Params.JSonData.splice(index, 1);
                }

                Params.SeGeneroRespado = false;
                BindingGrid();
            }

        },
        addFormRow: function (bool) {
            Params.addFormRow = bool;
        },
        addFilterRow: function (bool) {
            Params.addFilterRow = bool;
        },
        Set_Align: function (valor) { Params.setAlign = valor; },
        Get_Align: function () { return Params.setAlign; }
    },

    Footer: {
        Custom: function (value) {
            var objetos = JSON.stringify(Params);
            alert(objetos);
            //ID,type,Action,width,height
            //if (Params!=undefined){
            //	alert(Params);
            //}
        },
        refreshPages: function () {
            var ContentID = $(Params.objectForRender).attr("id");
            var Pag = $("#" + ContentID).find(".pgract").html("");
            
            Params.pageObjs = "";
            Params.printPages = false;
        }
    },

    Format: {
        Set_MoneyFormat: function (cols, hide) {
            Params.MoneyCols = cols;
            Params.hideZero = hide;
        },
        Set_PercentFormat: function (cols, hide) {
            Params.PercentCols = cols;
            Params.hideZeroPerc = hide;
        },
        Set_IntFormat: function (cols) {
            Params.IntCols = cols;
        },
        Set_AlignRight: function (cols) {
            Params.AlignRightCols = cols;
        },
        Set_AlignLeft: function (cols) {
            Params.AlignLeftCols = cols;
        },
        Set_AlignMiddle: function (cols) {
            Params.AlignMiddleCols = cols;
        },

        Set_DateFormat: function (cols, mask) {//Arreglo: Establece las columnas con formato de Fecha
            if (mask != null) {
                Params.MaskOfDate = mask;
            }
            Params.ColsWithDate = cols;
        },
        Get_DateFormat: function () {//Arreglo: Devuelve las columnas con formato de Fecha
            return Params.ColsWithDate;
        },
        Get_DateMask: function () {//Devuelve la cadena de la mascara para el formato de fecha que esta aplicando
            return mask;
        },
        Set_ConTipoReg: function (ConTipoReg) {//Indica si el Grid contiene una columna de tipo de registro para indicar distinto css
            Params.GridConTipoReg = ConTipoReg;
        },
        Set_ConBtnVisibleReg: function (ConBtnVisibleReg) {//Para indicar que contiene el grid de datos una columna de tipo BotonVisible
                                                            //para indicar si pinta o no los botones en el registro          ktm 09072019
            Params.GridConBtnVisibleReg = ConBtnVisibleReg;
        }
    },

    Page: {
        Set_PageSize: function (page) {//int: Establece Total de filas por Pagina a mostrar
            Params.pagesize = page;
        },
        Get_PageSize: function () {//int: Devuelve Total de filas por Pagina a mostrar
            return Params.pagesize;
        },
        Set_ShowPage: function (page) {//int: Numero de pagina que sera visualizada
            Params.showPage = page;
        },
        Get_ShowPage: function () {
            return Params.showPage;
        },

        Get_NumberOfPages: function ()
        {
            return Params.NumberPages;
        },
        Get_LastSelectedPage: function ()
        {
            return Params.lastSelectPage;
        },

        MovePage: function (NumberOfPage) { FotterNextPage(NumberOfPage); },

        CreateNavi: false,
        RowsInPage: [30,60,90],

        PageServerSide: function (page) {
            /*establece si el paginado sera en coodinacion con el servidor 
                                        Nota: 
                                            Requiere que el metodo del lado del servidor colecte en sus 
                                            parametros al final las variables pageSize y page en ese 
                                            orden.
                                            Solo funciona de momento en coordinacion con el metodo 
                                            gridview.Data.Set_FromCallBack(metodo,Parametros)
                                        */

            GridView.Params.ServerSide = page;
            Params.ClientSide = false;
        },
        PageClientSide: function (page) {//permite el paginacion de un JSON dado del lado del cliente
            if (page == true) {
                Params.ClientSide = page;
                Params.ServerSide = false;
                Params.footer = true;
            }
        }

    },

    EditColumn: {
        Set_EditMessage: function (mensaje) // Establece un mensaje personalizado para los Titles de la funcion EditItem
        {
            if (mensaje.length > 0) {
                Params.MsgEdit = mensaje;
            }
        },
        Set_JQueryEditIcon: function (icon) {
            Params.JQueryEditIcon = icon;
        },
        Set_DeleteMessage: function (mensaje)// Establece un mensaje personalizado para los Titles de la funcion DeleteItem
        {
            if (mensaje.length > 0) {
                Params.MsgDelete = mensaje;
            }
        },
        Set_JQueryDeleteIcon: function (icon) {
            Params.JQueryDeleteIcons = icon;
        },
        Default: function (edit) {//bit/int: Establece si sera motrada la columna de editado y eliminado 
            Params.editcolumn = edit;
        },
        OnlyEditItem: function () {//bit/int: Establece si sera motrada solo la columna de editado
            Params.editcolumn = true;
            Params.onlyEdit = true;
            Params.onlyDelete = false;
        },
        OnlyDeleteItem: function () {//bit/int: Establece si sera motrada solo la columna de Eliminado
            Params.editcolumn = true;
            Params.onlyEdit = false;
            Params.onlyDelete = true;
        },
        disabledEditItem: false,
        disabledDeleteItem: false
       
    },

    EditRow: {
        CanClick: function (value) { Params._CanClick = value;},
        AppendObject: function (object) { Params._AppendObject = object; }
    },

    Data: {
        Set_WorkingObj: function (obj) {
            Params.workTrans = obj;
        },
        Set_Json: function (Json) {//Permite el renderizado de un grid a partir de una coleccion Json
            Params.JSonData = Json;
        },
        Set_FromCallBack: function (CallBack, serialize) {//Este metodo no requiere el llamamdo a Gridview.DataBind()
            var Action = CallBack;
            var frmdata = serialize;

            // validando si el llamado llevara parametros
            if (frmdata == null) {
                frmdata = "";
            } else {
                if (frmdata.toString().length <= 0) {
                    frmdata = "";
                }
            }

            //Validando si el grid sera paginable desde el servidor
            // el server method debe de tener la propiedad
            // page y pageSize para poder paginar
            if (Params.workTrans != null) {
                Params.workTrans.css("visibility", "visible");
            }

            if (Params.ServerSide == true) {
                //si el tamaño de la pagina es mayor que 0 y hay mas variables 
                //entonces se concatenan para enviar al server method
                if (Params.pagesize > 0
                    && frmdata.toString().length > 0) {
                    frmdata = frmdata + "&pageSize=" + Params.pagesize + "&page=" + Params.showPage;
                } else {
                    //Si es nulo o vacio entonces no se pagina, se recibe el Json completo
                    if (Params.pagesize != null) {
                        frmdata = "pageSize=" + Params.pagesize + "&page=" + Params.showPage;
                    }
                }
            }
            $.post(Action, frmdata, function (data) {
                if (typeof (data) == 'string' && data != null && data != "") {
                    alert(data);
                } else {
                    //Render
                    Params.JSonData = data;
                }

                BindingGrid();
                if (Params.workTrans != null) {
                    Params.workTrans.css("visibility", "hidden");
                }
            });
        },
        Get_Json: function () {
            return Params.JSonData;
        },

        Sort: {
            cols: function (value) {
                Params.sortCols = value;
            },
            rows: function (value) {
                Params.sortRows = value;
            },
            Set_orderRow: function (value) {
                Params.sortArrayRows = value;
            },
            Set_orderCol: function (value) {
                Params.sortArrayCols = value;
            }
        }
    },

    Render: {
        AppendObjects: function (value) {
            Params.Append = value;
        },
        Set_Objects: function (lstObjs) {
            Params.ListOnbjects = lstObjs;
        },
        Set_Container: function (object) {//Objeto:Establece el contenedor donde se creara el grid
            var tipo = object.get(0).tagName.toString().toLowerCase(); //Determinando el tipo de objeto
            if (tipo == "div") {
                Params.div = true;
                Params.table = false;
            } else {
                if (tipo == "table" || tipo == 'tbody') {
                    Params.div = false;
                    Params.table = true;
                } else {
                    alert("Tipo de Contenedor No soportado " + tipo);
                }

            }
            Params.objectForRender = object;
            var attr = $(Params.objectForRender).attr('id');
            if (typeof attr !== typeof undefined && attr !== false) {
                Params.id = attr;
            }
        },
        BuildHeader: function (head) {//bit: establece si se creara el encabezado para el grid
            Params.header = head;
        },
        BuildFooter: function (value) {
            Params.footer = value;
        },
        Auto: function (value) {
            //Nota:Sustituye a AutoBind Renderiza una tabla apartir del conenido JSON
            // contruye tabla completa con encabezado a menos que se le indique lo contrario en la propiedad 
            //Buldheader
            if (value == true) {
                Params.header = true;
                Params.columnbind = false;
                Params.Autocols = value;
            }
        },
        SelectiveColumns: function (value) {
            //Nota:Sustutuye ColumnBind: Genera solo las columnas de la propiedad Set_Columns
            if (value == true) {
                Params.Autocols = false;
                Params.columnbind = value;
            }
        },
        HideColumns: function (value) {
            //Establece si esposible ocultar las columnas Especificasas en la propiedas Set_hideColumns
            Params.columnhide = value;
        },
        UseMasterKey: function (value) {
            //Establece que la llave primnaria puede se usada como Data-value([llave primaria])
            Params.UseIDValue = value;
        },
        UseMaterKeyWhenDA: function (value) {//aplica a los custom Object la llave primaria como un campo Data-value([llave primaria])
            Params.UseIDValue = value;
            Params.Data_Value = value;
        },
        IsSubGrid: function (value) { //Determina si la tabla es un SubGrid
            Params.isSubGrid = value;
        },
        SubGridParentId: function (value) { //Determina el RowID padre del SubGrid
            Params.parendId = value;
        }
    },

    Extended: function (value) {///Recibe el nomnbre de una funcion con los metodos personalizados que se ejecutaran al termino de la creacion basica del grid
                                //Ejemplo: esto lo utilizamos para crear botones de detalle en grids paginados del lado del cliente
        Params._Extended = value;
    },

    databind: function () {
        //Metodo: se Encarga de el dibujado final del grid, aplica las reglas configuras en las propiedades
        if (Params.SeGeneroRespado == false) {
            Params.RespaldoJson = JSON.parse(JSON.stringify(Params.JSonData));
            Params.SeGeneroRespado = true;
        }
        BindingGrid();
    },

    starting: function () {
        Destructor();
    },

    Dispose: {
        Full: function () {
            LstStackGrid = [];
        },
        ByGrid: function (GridID) {
            for (var stack = 0; stack <= LstStackGrid.length - 1; stack++) {
                if (LstStackGrid[stack].GridId == GridID) {
                    LstStackGrid.splice(stack, 1);
                    break;
                }
            }
        }
    },
}

//Declaracion de prototipos nesesarios
Number.prototype.formatMoney = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

String.repeat = function (chr, count) {
    var str = "";
    for (var x = 0; x < count; x++) { str += chr };
    return str;
};
String.prototype.padL = function (width, pad) {
    if (!width || width < 1)
        return this;

    if (!pad) pad = " ";
    var length = width - this.length
    if (length < 1) return this.substr(0, width);

    return (String.repeat(pad, length) + this).substr(0, width);
};
String.prototype.padR = function (width, pad) {
    if (!width || width < 1)
        return this;

    if (!pad) pad = " ";
    var length = width - this.length
    if (length < 1) this.substr(0, width);

    return (this + String.repeat(pad, length)).substr(0, width);
};

Date.prototype.formatDate = function (format) {
    var date = this;
    if (!format)
        format = "MM/dd/yyyy";

    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    format = format.replace("MM", month.toString().padL(2, "0"));

    if (format.indexOf("yyyy") > -1)
        format = format.replace("yyyy", year.toString());
    else if (format.indexOf("yy") > -1)
        format = format.replace("yy", year.toString().substr(2, 2));

    format = format.replace("dd", date.getDate().toString().padL(2, "0"));

    var hours = date.getHours();
    if (format.indexOf("t") > -1) {
        if (hours > 11)
            format = format.replace("t", "pm")
        else
            format = format.replace("t", "am")
    }
    if (format.indexOf("HH") > -1)
        format = format.replace("HH", hours.toString().padL(2, "0"));
    if (format.indexOf("hh") > -1) {
        if (hours > 12) hours - 12;
        if (hours == 0) hours = 12;
        format = format.replace("hh", hours.toString().padL(2, "0"));
    }
    if (format.indexOf("mm") > -1)
        format = format.replace("mm", date.getMinutes().toString().padL(2, "0"));
    if (format.indexOf("ss") > -1)
        format = format.replace("ss", date.getSeconds().toString().padL(2, "0"));
    return format;
}
/*Generando el constructor*/
function GridView() {
    //Params.isSubGrid = false;
}

var myobject = new GridView();
GridView.prototype = gridview;
GridView.prototype.Params = Params;
myobject.constructor == GridView();

function BindingGrid() {
    //Metodo: se Encarga de el dibujado final del grid, aplica las reglas configuras en las propiedades
    // Nota:
    //      algunos metodos son excusivos por ejemplo gridview.Render.Auto(true) 
    //      vuelve falso el metodo gridview.Render.SelectiveColumns(true);
    var tag = "<tr>";
    var filas = "";
    var CSSClass = "";
    var Iniciador = "";
    var terminador = "";
    //inicializando Componente
    //Aplicando hoja de estilo
    if (Params.CSSName != null) {
        CSSClass = "class='" + Params.CSSName + "'";
    }
    
    //Error controlado
    if (Params.objectForRender == null) {
        alert("GridView " + GridView.prototype.version + " Err: " + " No se vinculo un objeto para Generar la tabla GridView.Render.Set_Container(objeto)");
        return;
    }

    if (Params.div == true) {//Renderizado completo (contruccion de tabla en Params.div)
        Params.objectForRender.empty();

        Iniciador = Iniciador + "<table id='" + Params.id + "'  " + CSSClass + "><tbody>";
        terminador = "</tbody></table>";
    }

    //Inicializado para Tablas
    if (Params.table == true) {
        if (Params.header == true) {//Eliminando Encabezado viejo
            Params.objectForRender.find("th").remove();
            Params.objectForRender.find("tr:gt(0)").remove();
        } else {// si el encabezado esta establecido en modo personal aqui solo se limpia el contenido
            Params.objectForRender.find("tr:gt(0)").not('thead tr').remove();
        }
        Params.objectForRender.addClass(Params.CSSName);
    }

    /*Ordenando Datos antes de procesar*/
    //Ordenando primero Columnas
    if (Params.sortCols == true && Params.sortArrayCols != null) {
        Params.JSonData = OrdenarJSONCols(Params.JSonData, Params.sortArrayCols);
    }
    
    // Ordenado filas
    //console.log(Params.JSonData);
    if (Params.sortRows == true && Params.sortArrayCols != null) {
        Params.JSonData = OrdenarJsonFilas(Params.JSonData, Params.sortArrayRows);
    }

    //Generando el paginador a pie de tabla
    if (Params.ClientSide == true && Params.printPages == false) {
        Params.NumberPages = Math.ceil(Params.JSonData.length / Params.pagesize);
        Params.pageObjs = "<div id='Paginador' style='display:table; text-align:left; border-spacing: 2px; width:100%; height:100%; table-layout:fixed;'>";
        Params.pageObjs = Params.pageObjs + '<div style="display:table-row; text-align:right;">';
        Params.pageObjs = Params.pageObjs + '<div style="display:table-cell; width:33.33%; text-align:left;"></div>';
        Params.pageObjs = Params.pageObjs + '<div style="display:table-cell; width:33.33%; text-align:center;">';

        if (GridView.prototype.Page.CreateNavi == true)
        {
            Params.pageObjs = Params.pageObjs + "<a id='Gv_InsidePagAnt_" + GridView.prototype.Property.Get_ID() + "'></a>";

            if (Params.BindPageSize == true) {
                if (Params.pagesize > 0) {
                    GridView.prototype.Page.RowsInPage = [];
                    for (var index = 1; index <= 3; index++) {
                        GridView.prototype.Page.RowsInPage.push(Params.pagesize * index);
                    }
                }
                Params.BindPageSize = false;
            }
            Params.pageObjs = Params.pageObjs + "<select id='Gv_RowInPage_" + GridView.prototype.Property.Get_ID() + "'>";
            for (var index = 0; index <= GridView.prototype.Page.RowsInPage.length - 1; index++) {
                Params.pageObjs = Params.pageObjs + "<option value=" + GridView.prototype.Page.RowsInPage[index] + ">" + GridView.prototype.Page.RowsInPage[index] + "</option>";
            }
            Params.pageObjs = Params.pageObjs + "</select>"
            

            Params.pageObjs = Params.pageObjs + "<a id='Gv_InsidePagSig_" + GridView.prototype.Property.Get_ID() + "'></a>";
        }
        Params.pageObjs = Params.pageObjs + '</div><div style="display:table-cell; width:33.33%; ">';
        Params.pageObjs = Params.pageObjs + "<select id='Gv_InsidePag_" + GridView.prototype.Property.Get_ID() + "'>";
        for (pag = 0; pag <= Params.NumberPages - 1; pag++) {
            Params.pageObjs = Params.pageObjs + "<option value=" + (parseInt(pag) + 1) + ">" + (parseInt(pag) + 1) + "</option>";
            //Params.pageObjs = Params.pageObjs + "<a id='TagPage_" + parseInt(pag + 1, 10) + "' class='TagPager' onclick='FotterNextPage(" + parseInt(pag + 1, 10) + ")'>" + parseInt(pag + 1, 10) + " </a>";
        }
        Params.pageObjs = Params.pageObjs + "</select>"
        Params.printPages = true;
        Params.pageObjs = Params.pageObjs + "<a id='Gv_InsidePagUltPage_" + GridView.prototype.Property.Get_ID() + "' style='font-size:10pt !important; color:black;'> De: " + Params.NumberPages + " </a></div>";
        Params.pageObjs = Params.pageObjs + '</div></div>';
    }
    else {
        //Inicializando variable para la parte del Params.footer
        Params.ColSpan = 0;

    }

    var indexPage = 0;
    var topePagina = 0;
    if (Params.ClientSide == true)
    {
        if (Params.JSonData.length > 0) {
            if (Params.showPage > 1) {

                topePagina = (Params.pagesize * Params.showPage) - 1;
                indexPage = (topePagina - Params.pagesize) + 1;
                //alert("pagSize: " + Params.pagesize + " ShowPage: " + Params.showPage + " Inicio: " + indexPage + " Tope: " + topePagina);
            } else {
                topePagina = Params.pagesize - 1;
            }

            $.each(Params.JSonData, function (index, optiondata) {
                if (index >= indexPage) {
                    //Generando Columnas de manera automatica
                    if (Params.Autocols == true) {
                        Params.columnbind = false; //Ignora caso selectivo
                    }

                    //Ensamblando Encabezado
                    //Params.header := true permite armar el encabezado
                    if (Params.header == true) {//Si es automatico aqui se ensambla el encabezado a partir de lo que tiene el JSON
                        filas = '<thead class="' + Params.CssHeader + '"><tr id="GridFiltros">';
                        filas = filas + ProcesarCabecera(optiondata, '<th scope="col">', '</th>');
                        filas = filas + '</tr></thead>';
                        Params.header = false; // esto es para evitar un repintado inecesario del encabezado
                    }

                    if (Params.addFilterRow == true) {
                        filas = filas + '<tr>';
                        filas = filas + ProcesarFiltros(optiondata, '<td align="center" class="gvFilterRow">', '</td>');
                        filas = filas + '</tr>';
                        Params.addFilterRow = false;
                    }
                    // Renderizando filas

                    if (Params._CanClick == true) {
                        tag = "<tr id='row_" + index + "' onclick='" + Params.objectForRender.attr('id') + "_RowClick(this.id);'>";
                    } else {
                        //se agrego que puede venir con un tipo de registro KTM13032019
                        if (Params.GridConTipoReg == true && Params.CSSName != null) {
                            switch (optiondata.TipoRegistro) {
                                case "SUBTOTAL": case "ENCSUBTOTAL":
                                    tag = '<tr class=' + Params.CSSName + '_Total>'
                                    break;
                                case "TOTAL": case "ENCTOTAL":
                                    tag = '<tr class=' + Params.CSSName + '_Total>'
                                    break;
                                default:
                                    tag = '<tr>';
                                    break;
                            }
                        } else {
                            tag = '<tr>';
                        }
                    }
                    //estableciendo estilo de fila alterna
                    Params.FilaAlternativa = index % 2;
                    filas = filas + tag //'<tr>';
                    filas = filas + ProcesarFila(optiondata, '<td align="' + Params.setAlign + '">', '</td>', index);
                    filas = filas + '</tr>';

                    //validando si se generara fila Vacia para RowForm
                    if (Params.addFormRow == true) {
                        filas = filas + "<tr id='trHideForm_" + index + "' style='display:none;' class='trHideForm' ><td colspan='" + Params.ColSpan + "'><div id='Hidediv_" + index + "'></div>"
                    }
                }
                if (Params.ClientSide == true) {
                    if (topePagina == index) {
                        return false;
                    }
                }
            });
        }
        else {
            filas = filas + '<tr>';
            filas = filas + "<td colspan='" + Params.Columns.length + "'>No se encontraron elementos en la búsqueda</td>";
            filas = filas + '</tr>';
        }
    }
    else
    {
        if (Params.JSonData.length > 0) {
        var setIndex = false;
        $.each(Params.JSonData, function (index, optiondata) {
            //Generando Columnas de manera automatica
            if (Params.Autocols == true) {
                Params.columnbind = false; //Ignora caso selectivo
            }

            //Ensamblando Encabezado
            //Params.header := true permite armar el encabezado
            if (Params.header == true) {//Si es automatico aqui se ensambla el encabezado a partir de lo que tiene el JSON
                filas = '<thead class="' + Params.CssHeader + '"><tr>';
                filas = filas + ProcesarCabecera(optiondata, '<th scope="col">', '</th>');
                filas = filas + '</tr></thead>';
                Params.header = false; // esto es para evitar un repintado inecesario del encabezado
            }

            // Renderizando filas

            if (Params._CanClick == true) {
                tag = "<tr id='row_" + index + "' onclick='" + Params.objectForRender.attr('id') + "_RowClick(this.id);'>";
            } else {
                //se agrego que puede venir con un tipo de registro KTM13032019
                if (Params.GridConTipoReg == true && Params.CSSName != null) {
                    switch (optiondata.TipoRegistro) {
                        case "SUBTOTAL":
                            tag = '<tr class=' + Params.CSSName + '_Total>'
                            break;
                        case "TOTAL":
                            tag = '<tr class=' + Params.CSSName + '_Total>'
                            break;
                        default:
                            tag = '<tr>';
                            break;
                    }
                } else {
                    tag = '<tr>';
                }
            }
            //estableciendo estilo de fila alterna
            Params.FilaAlternativa = index % 2;
            filas = filas + tag //'<tr>';
            filas = filas + ProcesarFila(optiondata, '<td align="' + Params.setAlign + '">', '</td>', index);
            filas = filas + '</tr>';

            //validando si se generara fila Vacia para RowForm
            if (Params.addFormRow == true) {
                filas = filas + "<tr id='trHideForm" + Params.objectForRender.attr('id')  + index + "' style='display:none;' ><td colspan='" + Params.ColSpan + "'><div id='Hidediv" + Params.objectForRender.attr('id') + index + "'></div>"
            }

        });
        }
        else {
            filas = filas + '<tr>';
            filas = filas + "<td colspan='" + Params.Columns.length + "'>No se encontraron elementos en la búsqueda</td>";
            filas = filas + '</tr>';
        }
    }
    

    //Nota: Revisar forma de optimizar esta parte.
    //porque al final del for... por el append no respeta los terminadores, nesesito incrustarlos 
    // en la misma cadena para que ese las respete... 
    if (Params.footer == true) {
        terminador = ProcesarPies(terminador);
    }
    filas = Iniciador + filas + terminador;
    Params.objectForRender.append(filas)
    
   
    $("#Gv_InsidePag_" + GridView.prototype.Property.Get_ID()).change(function () {
        let GvShooter = $(this).prop("id");
        GvShooter = GvShooter.replace("Gv_InsidePag_", "");

        if (GvShooter != GridView.prototype.Property.Get_ID()) {
            for (var stack = 0; stack <= LstStackGrid.length - 1; stack++) {
                if (LstStackGrid[stack].GridId == GvShooter) {
                    Params = LstStackGrid[stack].Params;
                    gridview = LstStackGrid[stack].Config;
                    break;
                }
            }
        }
        FotterNextPage($(this).val());
    }).addClass("form-group btn-sm w-20 p-1");

    $("#Gv_InsidePagUltPage_" + GridView.prototype.Property.Get_ID()).click(function () {
        let GvShooter = $(this).prop("id");
        GvShooter = GvShooter.replace("Gv_InsidePagUltPage_", "");

        if (GvShooter != GridView.prototype.Property.Get_ID()) {
            for (var stack = 0; stack <= LstStackGrid.length - 1; stack++) {
                if (LstStackGrid[stack].GridId == GvShooter) {
                    Params = LstStackGrid[stack].Params;
                    gridview = LstStackGrid[stack].Config;
                    break;
                }
            }
        }
        FotterNextPage(parseInt(Params.NumberPages));
    });

    if (GridView.prototype.Page.CreateNavi == true) {
        try {
            $("#Gv_RowInPage_" + GridView.prototype.Property.Get_ID()).change(function () {
                let GvShooter = $(this).prop("id");
                GvShooter = GvShooter.replace("Gv_RowInPage_", "");

                if (GvShooter != GridView.prototype.Property.Get_ID()) {
                    for (var stack = 0; stack <= LstStackGrid.length - 1; stack++) {
                        if (LstStackGrid[stack].GridId == GvShooter) {
                            Params = LstStackGrid[stack].Params;
                            gridview = LstStackGrid[stack].Config;
                            break;
                        }
                    }
                }
                Params.pagesize = $(this).val();
                FotterRowInPage();
            }).addClass("form-group btn-sm w-20 p-1");

            $("#Gv_InsidePagAnt_" + GridView.prototype.Property.Get_ID()).addClass("btnG fa fa-backward p-2 rounded");
                                                                         //.button({ icons: { primary: "ui-icon-seek-prev" }, text: false })
                                                                         //.css({ width: "30px", height: "20px" });

       
            // Por alguna razon en eventos anidados se pierde el evento click, al incribirlo de este modo ya no se pierde
            document.getElementById("Gv_InsidePagAnt_" + GridView.prototype.Property.Get_ID())
                    .addEventListener("click", function () {

                        let GvShooter = $(this).prop("id");
                        GvShooter = GvShooter.replace("Gv_InsidePagAnt_", "");

                        if (GvShooter != GridView.prototype.Property.Get_ID()) {                       
                            for (var stack = 0; stack <= LstStackGrid.length - 1; stack++) {
                                if (LstStackGrid[stack].GridId == GvShooter) { 
                                   Params = LstStackGrid[stack].Params;
                                   gridview = LstStackGrid[stack].Config;
                                    break;
                                }
                            }
                        }

                        if (parseInt($("#Gv_InsidePag_" + GridView.prototype.Property.Get_ID()).val()) > 1) {
                            Params.pagesize = $("#Gv_RowInPage_" + GridView.prototype.Property.Get_ID()).val();

                            Params.NumberPages = Math.ceil(Params.RespaldoJson.length / Params.pagesize);
                            FotterNextPage(parseInt($("#Gv_InsidePag_" + GridView.prototype.Property.Get_ID()).val()) - 1);
                        }
                    });

            $("#Gv_InsidePagSig_" + GridView.prototype.Property.Get_ID()).addClass("btnG fa fa-forward p-2 rounded");
                                                                         //.button({ icons: { primary: "ui-icon-seek-next" }, text: false })
                                                                         //.css({ width: "30px", height: "20px" });

            // Por alguna razon en eventos anidados se pierde el evento click, al incribirlo de este modo ya no se pierde
            document.getElementById("Gv_InsidePagSig_" + GridView.prototype.Property.Get_ID())
                    .addEventListener("click", function () {
                        let GvShooter = $(this).prop("id");
                        GvShooter = GvShooter.replace("Gv_InsidePagSig_", "");

                        if (GvShooter != GridView.prototype.Property.Get_ID()) {                       
                            for (var stack = 0; stack <= LstStackGrid.length - 1; stack++) {
                                if (LstStackGrid[stack].GridId == GvShooter) { 
                                    Params = LstStackGrid[stack].Params;
                                    gridview = LstStackGrid[stack].Config;
                                    break;
                                }
                            }
                        }

                        Params.pagesize = $("#Gv_RowInPage_" + GridView.prototype.Property.Get_ID()).val();
                        Params.NumberPages = Math.ceil(Params.RespaldoJson.length / Params.pagesize);
                        if (parseInt($("#Gv_InsidePag_" + GridView.prototype.Property.Get_ID()).val()) < parseInt(Params.NumberPages)) {
                            FotterNextPage(parseInt($("#Gv_InsidePag_" + GridView.prototype.Property.Get_ID()).val()) + 1);
                        }
                    });

        } catch (ex) {
            console.log("Forzando Binding: " + ex);
        }
    }
    
    $(".GvFilter").blur(function () { GeneraBusquedaEnGrid(); return; });
    $(".EditButton").addClass("btnG  fa fa-edit rounded p-3");//.button({ icons: { primary: Params.JQueryEditIcon }, text: true });
    $(".DeleteButton").addClass("btnG  fa fa-trash rounded p-3"); //.button({ icons: { primary: Params.JQueryDeleteIcons }, text: true });
    $(".EditButton").css({ width: "40px", height: "25px" });
    $(".DeleteButton").css({ width: "40px", height: "25px" });

    ///Ejecutando metodos extendidos al termino del pintado principal
    if (Params._Extended != null) {
        try {
            var AnonymousFunction = this.eval(Params._Extended);
            AnonymousFunction();
        } catch (ex) {
           // console.log("Extended:" + ex);
        }
    }

    RegisterGridCollection();
}

///Genera una coleccion de grids para gestion en multiples niveles
function RegisterGridCollection() {
    let ValidaPila = false;
    for (var stack = 0; stack <= LstStackGrid.length - 1; stack++) {
        if (LstStackGrid[stack].GridId == GridView.prototype.Property.Get_ID()) {
            ValidaPila = true;
            break;
        }
    }
    if (ValidaPila == false) {
        var RegistraGrid = {
            GridId: GridView.prototype.Property.Get_ID()
           , Itengrity: Object.create(GridView)
           , Config: gridview
           , Params: Params
        }
        LstStackGrid.push(RegistraGrid);
    }
}

function FotterNextPage(page) {
    Params.showPage = page;
    Params.lastSelectPage = page;
    if (Params.header == true) {//Eliminando Encabezado viejo
        Params.objectForRender.find("th").remove();
        Params.objectForRender.find("tr:gt(0)").remove();
    } else {// si el encabezado esta establecido en modo personal aqui solo se limpia el contenido
        Params.objectForRender.find("tr:gt(0)").remove();
    }

    BindingGrid();
    $("#Gv_InsidePag_" + GridView.prototype.Property.Get_ID()).val(Params.lastSelectPage);
    $("#Gv_RowInPage_" + GridView.prototype.Property.Get_ID()).val(Params.pagesize);
}

function FotterRowInPage()
{
    Params.printPages = false;
    if (Params.header == true) {//Eliminando Encabezado viejo
        Params.objectForRender.find("th").remove();
        Params.objectForRender.find("tr:gt(0)").remove();
    } else {// si el encabezado esta establecido en modo personal aqui solo se limpia el contenido
        Params.objectForRender.find("tr:gt(0)").remove();
    }
    $("#Gv_InsidePag_" + GridView.prototype.Property.Get_ID()).val(1);
    BindingGrid();
    $("#Gv_RowInPage_" + GridView.prototype.Property.Get_ID()).val(Params.pagesize);
}

/*****************| PROCESAMIENTO Y TRATADO DE DATOS |****************************/
function ProcesarCabecera(optiondata, CaracterApertura, CaracterCierre) {
    var filas = "";
    var render = true;

    //Columna asociada al elemento de Editar/Eliminar
    if (Params.editcolumn == true && Params.IDColumn != null) {
        var TextoCabecera = "";
        var Ancho = "100px";
        if (Params.onlyDelete == false && Params.onlyEdit == false && Params.editcolumn == true)
        {
            TextoCabecera = "Editar | Eliminar"
        }
        if (Params.onlyEdit == true)
        {
            TextoCabecera = "Editar"
            Ancho = "25px"
        }
        if (Params.onlyDelete == true)
        {
            TextoCabecera = "Eliminar"
            Ancho = "25px"
        }
        filas = filas + CaracterApertura.replace('>', 'width='+Ancho + ' align:"center">' + TextoCabecera) + " " + CaracterCierre;
    }

    for (var key in optiondata) {//Recorriendo Columnas
        //Renderizando filas y aplicando las reglas establecidas

        //Mostrando Columnas establecidas en la propiedad 
        //Set_Columns
        if (Params.columnbind == true && Params.Columns != null) {
            render = false;
            for (d = 0; d <= Params.Columns.length - 1; d++) {
                if (key == Params.Columns[d]) {
                    render = true;
                    break;
                }
            }
        }

        //Ocultando Columnas establecidas en la propiedad 
        //Set_hideColumns
        if (Params.columnhide == true && Params.hideCols != null) {
            for (d = 0; d <= Params.hideCols.length - 1; d++) {
                if (key == Params.hideCols[d]) {
                    render = false;
                    break;
                }
            }
        }

        //Pintado Fila Validas
        if (render == true) {
            filas = filas + CaracterApertura + key + CaracterCierre;
        }
        render = true;
    }
    //Cerrando fila de encabezado
    Params.Autocols = false;
    return filas;
}

function ProcesarFiltros(optiondata, CaracterApertura, CaracterCierre) {
    var filas = "";
    var render = true;
    var index = 1;
    for (var key in optiondata) {
        //Recorriendo Columnas
        //Renderizando filas y aplicando las reglas establecidas

        //Mostrando Columnas establecidas en la propiedad 
        //Set_Columns
        if (Params.columnbind == true && Params.Columns != null) {
            render = false;
            for (d = 0; d <= Params.Columns.length - 1; d++) {
                if (key == Params.Columns[d]) {
                    render = true;
                    break;
                }
            }
        }

        //Ocultando Columnas establecidas en la propiedad 
        //Set_hideColumns
        if (Params.columnhide == true && Params.hideCols != null) {
            for (d = 0; d <= Params.hideCols.length - 1; d++) {
                if (key == Params.hideCols[d]) {
                    render = false;
                    break;
                }
            }
        }

        //Pintado Fila Validas
        if (render == true) {
            
            filas = filas + CaracterApertura + "<input type='text' class='GvFilter' id='GvFilter_" + key + "' tabindex=" + index + " /><div class='fa fa-filter' style='background-color: darkgray; color: white'></div>" + CaracterCierre;
            index++;
        }
        render = true;
    }
    return filas;
}

function ProcesarFila(optiondata, CaracterApertura, CaracterCierre, indice) {
    var filas = "";
    var valor = null;
    var render = true;
    var cols = 0;
    var visualizaBotones = true;

    //Estableciendo columna de Edicion
    if (Params.editcolumn == true && Params.IDColumn != null) {
        var idComplex = "";
        for (indxid = 0; indxid <= Params.IDColumn.length - 1; indxid++) {
            if (idComplex.length <= 0) {
                idComplex = "'" + optiondata[Params.IDColumn[indxid]] + "'";
            } else {
                idComplex = idComplex + ',' + "'" + optiondata[Params.IDColumn[indxid]] + "'";
            }
        }
        idComplex = idComplex.replace(/(?:\r\n|\r|\n)/g, '');

        //Si existe la columna en el grid de BotonVisible se considera para pintarlo o no
        //sino se mantiene el default = true
        if (Params.GridConBtnVisibleReg == true){
            visualizaBotones = optiondata.BotonVisible;
        }

        if (visualizaBotones == true) {
            if (Params.onlyDelete == false && Params.onlyEdit == false && Params.editcolumn == true) {
                filas = filas + CaracterApertura
                //Si se deshabilita el boton de editar ktm
                if (GridView.prototype.EditColumn.disabledEditItem == true) {
                    filas = filas + '<div id="EditIcon"/> ';
                } else {
                    filas = filas + '<a class="EditButton" title="' + Params.MsgEdit + '" onclick = "' + Params.objectForRender.attr('id') + '_EditItem_Click(' + idComplex + ')"></a> ';
                }
                //Si se deshabilita el boton de delete ktm
                if (GridView.prototype.EditColumn.disabledDeleteItem == true) {
                    filas = filas + '<div id="DelIcon"/> ';
                } else {
                    filas = filas + '<a class="DeleteButton" title="' + Params.MsgDelete + '" Onclick="' + Params.objectForRender.attr('id') + '_DeleteItem_Click(' + idComplex + ')"></a> ';

                }
                filas = filas + CaracterCierre
            } else {
                if (Params.onlyEdit == true) {
                    //Si se deshabilita el boton de delete ktm
                    if (GridView.prototype.EditColumn.disabledEditItem == true) {
                        filas = filas + CaracterApertura + '<div id="EditIcon"/> ';
                    } else {
                        filas = filas + CaracterApertura + '<a class="EditButton" title="' + Params.MsgEdit + '" onclick = "' + Params.objectForRender.attr('id') + '_EditItem_Click(' + idComplex + ')"><div id="EditIcon"/> </a> ' + CaracterCierre;
                    }
                }
                if (Params.onlyDelete == true) {
                    //Si se deshabilita el boton de delete ktm
                    if (GridView.prototype.EditColumn.disabledDeleteItem == true) {
                        filas = filas + CaracterApertura + '<div id="DelIcon"/> ';
                    } else {
                        filas = filas + CaracterApertura + '<a class="DeleteButton" title="' + Params.MsgDelete + '" Onclick="' + Params.objectForRender.attr('id') + '_DeleteItem_Click(' + idComplex + ')"><div id="DelIcon" /> </a> ' + CaracterCierre;
                    }
                }
            }
        } else {
            filas = filas + CaracterApertura + CaracterCierre;
        }
        cols = 1;
    }

    for (var key in optiondata) {

        //if (optiondata["TipoRegistro"] == "ENCTOTAL" && key == 'Cliente') {
        //    console.log(valor);
        //}

        //Recorriendo Columnas
        //Renderizando filas y aplicando las reglas establecidas

        //Cabecera temporal
        var tempHeader = CaracterApertura;

        //Mostrando Columnas establecidas en la propiedad 
        //Set_Columns
        if (Params.columnbind == true && Params.Columns != null) {
            render = false;
            for (d = 0; d <= Params.Columns.length - 1; d++) {
                if (key == Params.Columns[d]) {
                    render = true;
                    break;
                }
            }
        }

        //Ocultando Columnas establecidas en la propiedad 
        //Set_hideColumns
        if (Params.columnhide == true && Params.hideCols != null) {
            for (d = 0; d <= Params.hideCols.length - 1; d++) {
                if (key == Params.hideCols[d]) {
                    render = false;
                    break;
                }
            }
        }

        //Aplicando mascara de fecha
        if (Params.ColsWithDate != null) {
            for (d = 0; d <= Params.ColsWithDate.length - 1; d++) {
                if (key == Params.ColsWithDate[d]) {
                    valor = ToDate(optiondata[key]);
                    break;
                }
            }
        }

        //mascara Monetaria
        if (Params.MoneyCols != null) {
            for (d = 0; d <= Params.MoneyCols.length - 1; d++) {
                if (key == Params.MoneyCols[d]) {
                    //Si viene vacio se mantiene vacio sino convertia a cero el valor ktm 02/08/2019
                    if (optiondata[key])
                    {
                        valor = new Number(optiondata[key]).formatMoney(2, ',', '.');
                        if (valor == 0) {
                            if (Params.hideZero) {
                                valor = ''
                            }
                        }
                        else if (valor < 0) {
                            tempHeader = tempHeader.replace(">", " style='color:red; font-weight: bold;'>");
                        }

                    }

                    //Para que lo alinea a la derecha por ser moneda ktm 02/08/2019
                    if (tempHeader.indexOf("style='") > 0) {
                        tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', '').replace("style='", "style='text-align:right;");
                    } else {
                        tempHeader = tempHeader.replace(">", "style='text-align:right;'>");
                    }

                    break;
                }
            }
        }

        //mascara Porcentaje
        if (Params.PercentCols != null) {
            for (d = 0; d <= Params.PercentCols.length - 1; d++) {
                if (key == Params.PercentCols[d]) {
                    //Si viene vacio se mantiene vacio sino convertia a cero el valor ktm 02/08/2019
                    if (optiondata[key]) {

                        valor = new Number(optiondata[key]).formatMoney(2, ',', '.');

                        if (valor == 0) {
                            if (Params.hideZero) {
                                valor = ''
                            }
                        }
                        else if (valor < 0) {
                            valor = valor + '%';
                            tempHeader = tempHeader.replace(">", " style='color:red; font-weight: bold;'>");
                        }
                    }


                    //Para que lo alinea a la derecha por ser moneda ktm 02/08/2019
                    if (tempHeader.indexOf("style='") > 0) {
                        tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', '').replace("style='", "style='text-align:right;");
                    } else {
                        tempHeader = tempHeader.replace(">", "style='text-align:right;'>");
                    }

                    break;
                }
            }
        }
        
        //mascara entero
        if (Params.IntCols != null) {
            for (d = 0; d <= Params.IntCols.length - 1; d++) {
                if (key == Params.IntCols[d]) {

                    //Si viene vacio se mantiene vacio sino convertia a cero el valor ktm 02/08/2019
                    if (optiondata[key]) {

                        valor = new Number(optiondata[key]).formatMoney(0, ',', '.');
                        if (valor == 0) {
                            if (Params.hideZero) {
                                valor = ''
                            }
                        }
                        else if (valor < 0) {
                            tempHeader = tempHeader.replace(">", " style='color:red; font-weight: bold;'>");
                        }

                    } 

                    //Para que lo alinea a la derecha por ser moneda ktm 02/08/2019
                    if (tempHeader.indexOf("style='") > 0) {
                        tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', '').replace("style='", "style='text-align:right;");
                    } else {
                        tempHeader = tempHeader.replace(">", "style='text-align:right;'>");
                    }

                    break;

                }
            }
        }


        //Alinea los valores de la columna a la izquierda
        if (Params.AlignLeftCols != null) {
            for (d = 0; d <= Params.AlignLeftCols.length - 1; d++) {
                if (key == Params.AlignLeftCols[d]) {
                    //tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', ' align="left" ');
                    if (tempHeader.indexOf("style='") > 0) {
                        tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', '').replace("style='", "style='text-align:left;");
                    } else {
                        tempHeader = tempHeader.replace(">", "style='text-align:left;'>");
                    }
                    break;
                }
            }
        }

        //Alinea los valores de la columna a la derecha
        if (Params.AlignRightCols != null) {
            for (d = 0; d <= Params.AlignRightCols.length - 1; d++) {
                if (key == Params.AlignRightCols[d]) {
                    //tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', ' align="right" ');
                    if (tempHeader.indexOf("style='") > 0) {
                        tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', '').replace("style='", "style='text-align:right;");
                    } else {
                        tempHeader = tempHeader.replace(">", "style='text-align:right;'>");
                    }
                    break;
                }
            }
        }

        //Alinea los valores de la columna al centro
        if (Params.AlignMiddleCols != null) {
            for (d = 0; d <= Params.AlignMiddleCols.length - 1; d++) {
                if (key == Params.AlignMiddleCols[d]) {
                    //tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', ' align="center" ');
                    if (tempHeader.indexOf("style='") > 0) {
                        tempHeader = tempHeader.replace('align="' + Params.setAlign + '"', '').replace("style='", "style='text-align:center;");
                    } else {
                        tempHeader = tempHeader.replace(">", "style='text-align:center;'>");
                    }
                    break;
                }
            }
        }

        //Se alinean los elementos verticalmente al centro
        if (tempHeader.indexOf("style='") > 0) {
            tempHeader = tempHeader.replace("style='", "style='vertical-align:middle;");
        } else {
            tempHeader = tempHeader.replace(">", "style='vertical-align:middle;'>");
        }

        //Validando si se Generara una fila con Objetos
        if (Params.Append == true) {
            if (valor!=null){
                valor = GenerarFilaConObjetos(valor, key, indice, optiondata);
            } else {
                valor = GenerarFilaConObjetos(optiondata[key], key, indice, optiondata);
            }
        }

        //Pintado Fila Validas
        if (render == true) {

            //Validando si al campo se le a aplicado alguna formateador.
            if (valor == null) {
                valor = optiondata[key];
            }

            //valor = trim(valor);
            if (Params.FilaAlternativa == 0) {
                tempHeader = tempHeader.replace(">", "class='alt'>");
            }
            filas = filas + tempHeader + valor + CaracterCierre;
            cols = cols + 1;
        }

        render = true;
        valor = null;
    }
    //Cerrando fila de encabezado
    if (Params.ColSpan == 0) {
        Params.ColSpan = cols;
    }
    Params.Autocols = false;
    return filas;
}

function ProcesarPies(terminador) {

    if (Params.JSonData.length === 0) {
        Params.ColSpan = Params.Columns.length;
    }

    if (terminador.indexOf("tbody") > 0) {
        terminador = "</tbody>" + "<tfoot><tr><td class='pgract " + Params.CssFotter + "'colspan=" + Params.ColSpan + ">" + Params.pageObjs + "</td></tr></tfoot>" + "</table>";
    } else {
        terminador = terminador + "<tr><td class='pgract " + Params.CssFotter + "' colspan=" + Params.ColSpan + ">" + Params.pageObjs + "</td></tr>";
    }
    return terminador;
}

function GenerarFilaConObjetos(valor, key, index, optiondata) {
    var resultado = valor;
    var valueItem = "";
    
    if (Params.ListOnbjects != null) {//validando que se establecieran objetos
        for (var indice = 0; indice <= Params.ListOnbjects.length - 1; indice++) {
            var CadenaOrigen = Params.ListOnbjects[indice];
            var tipo = CadenaOrigen.replace("[", "").replace("]", "");
            var segmento = tipo.split("=")[1].split(",");
            var complemento = tipo.split(",");
            var elemento = tipo.split("=");
            if (segmento[0] == key) {
                if (Params.UseIDValue == true) {
                    for (indxid = 0; indxid <= Params.IDColumn.length - 1; indxid++) {
                        if (valueItem.length <= 0) {
                            valueItem = optiondata[Params.IDColumn[indxid]];
                        } else {
                            valueItem = valueItem + ',' + optiondata[Params.IDColumn[indxid]];
                        }
                    }
                } else {
                    valueItem = valor;
                }

                resultado = "<" + elemento[0] +
                            " id='" + (Params.isSubGrid == false ? key + "_" + index : "Sub" + key + "_" + index) + "'" +
                            " name='" + (Params.isSubGrid == false ? key + "_" + index : "Sub" + key + "_" + index) + "'" +
                            " data-valuealt='" + valor + "'" + 
                            (Params.Data_Value == false ? " value='" : " data-value='") + valueItem + "'" +
                            (complemento[1] === undefined ? '' : complemento[1]);// + " />"

                //Elementos basicos :checkbox, Botones, text, TextAreas
                if (elemento[0].toLowerCase() == 'input') {
                    resultado = resultado + " value = '" + valor + "' />";
                }
                else if (elemento[0].toLowerCase() == 'textarea') {
                    //console.log(optiondata[key]);
                    resultado = resultado + ">" + valor + "</" + elemento[0] + ">";
                } else {
                    //Links (etiquetas <a>valor</a>)
                    if (elemento[0].toLowerCase() == 'select') {
                        //select (listbox,DropDown)
                        resultado = resultado + " >" + "</" + elemento[0] + ">";
                    } else {
                        //Elementos Extendidos
                        resultado = resultado + " >" + valor + "</" + elemento[0] + ">";
                    }
                }
                break;
            }

        }
    }

    return resultado;
}


var firstFind = false;
var OriginalData = [];
var ResultData = [];
var campoConFiltro = [];
var FiltrosAplicados = 0;
var NoFiltros = 0;
var totalFiltros = $("#" + GridView.prototype.Property.Get_ID() + " [id^=GvFilter]").length;
//Genera una busqueda dentro de los elementos del Json con el que se armo la informacion 
function GeneraBusquedaEnGrid()
{
    NoFiltros = 0;
    totalFiltros = 0;
    FiltrosAplicados = 0;
    campoConFiltro = [];
    ResultData = [];

    $("#" + GridView.prototype.Property.Get_ID() + " [id^=GvFilter]").each(function (index, object) {
        totalFiltros++;
        var valor = $("#" + object.id).val()
        if (valor.length > 0) {
            ///Conservando valores con filtros
            if (campoConFiltro.length <= 0) {
                campoConFiltro.push({ campo: object.id, valor: valor });
            } else {
                var exiteCampo = false;
                $.each(campoConFiltro, function (index, filtro) {
                    if (filtro.campo == object.id) {
                        filtro.valor = valor;
                        exiteCampo = true;
                    }
                });
                if (exiteCampo == false) {
                    campoConFiltro.push({ campo: object.id, valor: valor })
                }
            }
        }
    });
    
    Params.JSonData = JSON.parse(JSON.stringify(Params.RespaldoJson));
    $.each(campoConFiltro, function (index, filtro) {
        var col = filtro.campo.split("_")[1];
        if (ResultData.length <= 0) {
            $.each(Params.JSonData, function (index, findingData) {
                var colValue = findingData[col];
                if (colValue.toString().indexOf(filtro.valor) > 0) {
                    ResultData.push(findingData);
                }
            });
        } else
        {
            var SecondRound = ResultData;
            ResultData = [];
            $.each(SecondRound, function (index, findingData) {
                var colValue = findingData[col];
                if (colValue.toString().indexOf(filtro.valor) > 0) {
                    ResultData.push(findingData);
                }
            });
        }
    });
    if (campoConFiltro.length <= 0) {
        Params.JSonData = JSON.parse(JSON.stringify(Params.RespaldoJson));
    } else {
        Params.JSonData = ResultData;
    }
    GridView.prototype.Rows.Params.addFilterRow(true);
    GridView.prototype.databind();
    $.each(campoConFiltro, function (index, filtro) {
        $("#" + filtro.campo).val(filtro.valor);
        if (index == campoConFiltro.length){
            $("#" + filtro.campo).focus()
        }
    });
}

// Permite ordenar el arreglo mediante los parametros designados
function OrdenarJsonFilas(array, keys) {
    return array.sort(function (a, b) {
        for (var key in keys) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
    });
}



//Funcion que recontruye el json ordenado en base las especificaciones
function OrdenarJSONCols(obj, orden) {
    var r = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (typeof (obj[i]) == "object") {
                r.push(OrdCols(obj[i], orden));
            } else {
                r.push(OrdCols(obj, orden));
            }
        }
    }
    return r;
}

//Funcion que ordena una coleccion Json data en base a las especificaciones
function OrdCols(obj, orden) {
    var item = {};

    for (var col = 0; col <= orden.length - 1; col++) {
        for (var i in obj) {
            if (i == orden[col]) {
                item[i] = obj[i];
                break;
            }
        }
    }
    for (var i in obj) {
        var tmp = {};
        var key = "";
        for (var it in item) {
            if (i != it) {
                key = i;
                tmp[i] = obj[i];
                break;
            }
        }
        if (tmp) {
            item[key] = tmp[key];
        }
    }
    return item;
}

//Funciones de Estilo y forma
//Aplicando mascara a las fechas
function ToDate(StringDate) {
    var resultado;
    if (StringDate === null) {
        return "";
    }
    if (StringDate.length <= 0) {
        return "";
    }

    if (Params.MaskOfDate !== null) {
        // console.log(Params.MaskOfDate);
        resultado = new Date(formatJSONDate(StringDate)).formatDate(Params.MaskOfDate);
    } else {
        resultado = formatJSONDate(StringDate);
    }
    return resultado;
}

//Convirtiendo serializacion JSON a fecha
function formatJSONDate(jsonDate) {
    /***si viene una fecha JSON de formato /Date(1224043200000)/*****/
    var newDate = new Date(parseInt(jsonDate.substr(6)));
    return newDate;
}

//unión de ambas funciones ltrim y rtrim
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

//ltrim quita los espacios o caracteres indicados al inicio de la cadena
function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

//rtrim quita los espacios o caracteres indicados al final de la cadena 
function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function Destructor(object) {
    Params = JSON.parse(JSON.stringify(_Params));
}
