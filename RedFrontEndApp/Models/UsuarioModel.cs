using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace RedFrontEndApp.Models
{
    public class UsuarioModel
    {
        public UsuarioModel()
        {
            ApellidoMaterno = string.Empty;
            ApellidoPaterno = string.Empty;
            Nombre = string.Empty;
            Telefono = string.Empty;
            Email = string.Empty;
        }

        /// <summary>
        /// Id de usuario
        /// </summary>
        [Description("Id Usuario")]
        public int UsuarioId { get; set; }

        /// <summary>
        /// Ap. Paterno
        /// </summary>
        [StringLength(150)]
        [Required(ErrorMessage = "El apellido paterno es obligatorio")]
        [Display(Name = "Apellido paterno", Description = "Apellido paterno del usuario")]
        [MinLength(2, ErrorMessage = "El apellido paterno debe tener mínimo de 3 caracteres")]
        [MaxLength(150, ErrorMessage = "El apellido paterno debe tener máximo de 150 caracteres")]
        public String ApellidoPaterno { get; set; }

        /// <summary>
        /// Ap. Materno
        /// </summary>
        [StringLength(150)]
        [Display(Name = "Apellido materno", Description = "Apellido materno del usuario")]
        [MinLength(2, ErrorMessage = "El apellido materno debe tener mínimo de 3 caracteres")]
        [MaxLength(150, ErrorMessage = "El apellido materno debe tener máximo de 150 caracteres")]
        public String ApellidoMaterno { get; set; }

        /// <summary>
        /// Nombre del Usuario
        /// </summary>
        [StringLength(150)]
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [Display(Name = "Nombre", Description = "Nombre del usuario")]
        [MinLength(2, ErrorMessage = "El nombre debe tener mínimo de 3 caracteres")]
        [MaxLength(150, ErrorMessage = "El nombre debe tener máximo de 150 caracteres")]
        public String Nombre { get; set; }

        /// <summary>
        /// Fecha de nacimiento
        /// </summary>
        [Required(ErrorMessage = "La fecha de nacimiento es obligatoria")]
        [DataType(DataType.Date, ErrorMessage = "El dato ingresado no es una fecha válida")]
        [Display(Name = "Fecha de nacimiento", Description = "Fecha de nacimiento del usuario")]
        public DateTime FechaNacimiento { get; set; }

        /// <summary>
        /// Telefono 
        /// </summary>
        [StringLength(20)]
        [DataType(DataType.PhoneNumber)]
        [Required(ErrorMessage = "El teléfono es obligatorio")]
        [Display(Name = "Teléfono", Description = "Número telefónico del usuario")]
        [Phone(ErrorMessage = "El valor ingresado no corresponde con un número telefónico")]
        [MinLength(8, ErrorMessage = "El campo teléfono tiene una longitud mínima de 8 digitos")]
        [MaxLength(20, ErrorMessage = "El campo teléfono tiene una longitud máxima de 20 digitos")]
        public string Telefono { get; set; }

        /// <summary>
        /// Correo Electronico 
        /// </summary>
        [EmailAddress(ErrorMessage = "El email es incorrecto")]
        [Display(Name = "Email", Description = "Correo electrónico del usuario")]
        [DataType(DataType.EmailAddress, ErrorMessage = "El email es incorrecto")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "El email es obligatorio")]
        [StringLength(maximumLength: 150, ErrorMessage = "El campo email tiene una longitud máxima de 150 caracteres")]
        public string Email { get; set; }

        public int Edad { get; set; }
    }
}
