String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};

Number.prototype.between = function (a, b, inclusive) {
    var min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
    return inclusive ? this >= min && this <= max : this > min && this < max;
};

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

function FormatOnlyHours(jsonDate) {
    var fechaSimple;
    if (jsonDate != null) {
        var date = eval(jsonDate.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
        var fecha = new Date(date);
        fechaSimple = fecha.getHours().toString().lpad(0, 2) + ':' + fecha.getMinutes().toString().lpad(0, 2);
    } else {
        fechaSimple = " ";
    }
    return fechaSimple;
}

function formatJSONDateFull(jsonDate) {
    var fechaSimple;
    if (jsonDate != null) {
        //var date = eval(jsonDate.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
        var fecha = new Date(parseInt(jsonDate.substr(6)));
        fechaSimple = fecha.getDate().toString().lpad(0, 2) + "/" + (fecha.getMonth()+1).toString().lpad(0, 2) + "/" + fecha.getFullYear().toString().lpad(0, 2);
    } else {
        fechaSimple = " ";
    }
    return fechaSimple;
}

function formatJSONDate(jsonDate) {
    /***si viene una fecha JSON de formato /Date(1224043200000)/*****/
    //var newDate = dateFormat(jsonDate, "mm/dd/yyyy");     
    var newDate = new Date(parseInt(jsonDate.substr(6)));
    return newDate;
}


function is_chrome() {
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    return is_chrome;
}


function is_Explorer()
{
    var ua = window.navigator.userAgent;

    // IE 10 or older => return version number
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    // IE 11 => return version number
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // Edge (IE 12+) => return version number
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;

}

function ToBoolean(string) {
    switch (string) {
        case "true": case"TRUE": case "yes": case "YES": case "1": case "S": return true;
        case "false": case"TRUE": case "no": case "NO": case "0": case "N": case null: return false;
        default: return Boolean(string);
    }
}

///Calcula la diferencias de dos fechas
function CalculateDateDiff(dateFrom, dateTo) {
    var difference = (dateTo - dateFrom);
    var years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    difference -= years * (1000 * 60 * 60 * 24 * 365);
    var months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.4375));

    var dif = '';
    if (years > 0)
        dif = years + ' años ';

    if (months > 0) {
        if (years > 0)
        { dif = dif + ' y '; }
        dif = dif + months + ' meses';
    }
    return dif;
}

///Captura QueryString
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
