using System.ComponentModel.DataAnnotations;

namespace RedFrontEndApp.Models
{
    public partial class LoginModel
    {
        /// <summary>
        /// Inicializacion de las propiedades del modelo
        /// </summary>
        public LoginModel()
        {
            Email = string.Empty;
            Password = string.Empty;
        }

        /// <summary>
        /// Nombre de Usuario
        /// </summary>
        
        [Display(Name = "Usuario", Description = "Correo electrónico del usuario")]
        [EmailAddress(ErrorMessage = "El usuario debe ser un correo electrónico valido")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "El usuario es obligatorio")]
        [DataType(DataType.EmailAddress, ErrorMessage = "El usuario debe ser un correo electrónico valido")]
        [StringLength(maximumLength: 150, ErrorMessage = "El campo usuario tiene una longitud máxima de 150 caracteres")]
        public string Email { get; set; }

        /// <summary>
        /// Contraseña
        /// </summary>
        [Display(Name = "Ingrese su Password", Prompt = "Usuario")]
        [Required(ErrorMessage = "introducir una contraseña es requerido")]
        [MinLength(8, ErrorMessage = "La contraseña debe tener minimo 8 caracteres")]
        [MaxLength(20, ErrorMessage = "La contraseña debe tener maximo 20 caracteres")]
        [RegularExpression(@"^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$$", ErrorMessage = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.")]
        public string Password { get; set; }


    }
}
