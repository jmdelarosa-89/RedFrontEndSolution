using Microsoft.AspNetCore.Mvc;

namespace RedFrontEndApp.Controllers
{
    public class UsuariosController : Controller
    {
        public IActionResult Listado()
        {
            ViewBag.Title = "Listado de usuarios";
            return View();
        }

        public IActionResult Usuario(int id = 0)
        {
            ViewBag.UsuarioId = id;
            ViewBag.Title = id > 0 ? "Editar usuario" : "Nuevo usuario";
            return View();
        }
    }
}
