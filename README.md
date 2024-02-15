# AV-JulianRavelli-FrontEnd
 America Virtual Challenge Frontend


Proyecto en Angular 13.

	Consta de un layout con sus componentes para header y footer y tres modulos.
		Home: Es la pagina de inicio. Esta vacía. Es solo para que el user se loguee (el cuadro de login respeta el maquetado propuesto).
		Weather: La pagina principal. Solo se accede con el usuario logueado y el header cambia para mostrar el usuario y la opcion de cerrar sesion / traducir.
		NotFound: Levanta cuando el path de la url no coincide con ninguno de los anteriores.

	La consigna no especificaba ni la home ni el notFound. Pero me parecio relevante para demostrar conocimientos sobre el enrutamiento de angular, el manejo de AuthGuard, interceptor, etc.
	Y tambien suma para la validacion de los permisos (uno y hardcoddeado) empaquetados jwt para el acceso al endpoint getWeather. 

	PASOS PARA CORRER EL FRONTEND:
		1. Desde la terminal instalar las dependencias (npm i).
		2. Ejecutar el comando ng serve.