# RedFrontEndSolution
Repositorio de prueba FrontEnd

El proyecto contiene el FrontEnd que consume los endpoints expuestos por el proyecto RedBackEndSolution.
Este FrontEnd cuenta con:
- Formulario de login.
- Listado de usuarios.
- Formulario de alta de usuarios.
- Formulario de edición de usuarios.
- Opción de eliminación de usuarios en el listado.

Para ejecutar el proyecto es necesaario tener:

1. Instalado el SDK de Net6.
2. Tener en ejecución el proyecto RedBackEndSolution.

Una vez descargado el proyecto a una carpeta local, se puede abrir el proyecto en VisualStudio y ejecutarlo desde ahí o también se puede realizar el compilado mediante consola.

Para compilar y ejecutar por consola se deben seguir los siguientes pasos:

1. Abrir una terminal CMD o PowerShell.
2. Dirigirse al directorio del proyecto mediante el comando cd [ruta].
3. Dirigirse al directorio RedFrontEndApp
4. Ejecutar la compilación mediante el comando dotnet build.
5. Ejecutar el proyecto mediante el comando dotnet run.

Siguiendo estos pasos el proyecto será ejecutado.

La consola nos indicará que el proyecto se encuentra escuchando en la ruta http://localhost:5171.

Abriendo esta ruta en el navegador se podrá ver el formulario de login.

Para acceder al sistema se pueden usar las siguientes credenciales:

Usuario: a09281@tester.com
Contraseña: T3mp0r4l123#

Una vez loggeado se mostrará la lista de usuarios precargados en el sistema.

Al listado se le dió la opción de filtrar por Nombre y/o Email del usuario.

En el listado se puede:
- Seleccionar el botón de editar de cualquier usuario para modificar los datos de este.
- Seleccionar el boton eliminar para remover un usuario.

También se puede seleccionar la opción +Nuevo para dirigirse al formulario de registro de usuarios.
Todos los nuevos usuarios que se registren tendrán la contraseña T3mp0r4l123#.
