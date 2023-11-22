using System.ComponentModel.DataAnnotations;

namespace RedFrontEndApp.Models
{
    public class FiltroUsuariosModel
    {
        public FiltroUsuariosModel()
        {
            Email = string.Empty;
            Nombre = string.Empty;
            ApellidoPaterno = string.Empty;
        }

        [Display(Name = "Email")]
        [MaxLength(20, ErrorMessage = "El correo debe ser de máximo 20 caracteres")]
        public String Email { get; set; }

        [Display(Name = "Nombre")]
        [MaxLength(20, ErrorMessage = "El nombre debe ser de máximo 20 caracteres")]
        public String Nombre { get; set; }

        [Display(Name = "Apellido paterno")]
        [MaxLength(20, ErrorMessage = "El apellido paterno debe ser de máximo 20 caracteres")]
        public String ApellidoPaterno { get; set; }
    }
}
