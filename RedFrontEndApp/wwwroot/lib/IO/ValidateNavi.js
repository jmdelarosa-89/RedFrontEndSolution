/// <reference path="JSIO.js" />
window.onload = function () {
    ///Validando la version del navegador
    var Navi = is_Explorer();
    if (Navi != false && Navi < 12) {
        alert("la aplicacion no cuenta con soporte para su navegador Explorer " + Navi + " le recomendamos usar Microsoft EDGE, Mozilla FireFox o Google Chrome");
    }
}