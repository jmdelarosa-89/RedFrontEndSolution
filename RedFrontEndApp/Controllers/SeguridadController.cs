using Microsoft.AspNetCore.Mvc;

namespace RedFrontEndApp.Controllers
{
    public class SeguridadController : Controller
    {
        /// <summary>
        /// Carga ventana de inicio de sesion
        /// </summary>
        /// <returns></returns>
        public IActionResult Login()
        {
            return View();
        }
    }
}
