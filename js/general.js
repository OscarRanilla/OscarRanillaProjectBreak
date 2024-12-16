//// Detectar si estamos en la página principal o una página secundaria
const paginaPrincipal = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
// CAMBIO DE IMAGEN RANDOM EN EL BACKGROUND CADA 10 SEGUNDOS
//hacemos primero un array con las imagenes que tenemos en nuestro assets/img
// Array con las URLs de las imágenes de fondo
const imagenes = [
    '/assets/img/imagen1.jpg',
    '/assets/img/imagen2.jpg',
    '/assets/img/imagen3.jpg',
    '/assets/img/imagen4.jpg',
    '/assets/img/imagen5.jpg',
    '/assets/img/imagen6.jpg',
    '/assets/img/imagen7.jpg',
    '/assets/img/imagen8.jpg',
    '/assets/img/imagen9.jpg',
    '/assets/img/imagen10.jpg',
    '/assets/img/imagen11.jpg',
    '/assets/img/imagen12.jpg',
    '/assets/img/imagen13.jpg',
    '/assets/img/imagen14.jpg',
    '/assets/img/imagen15.jpg',
    '/assets/img/imagen16.jpg',
    '/assets/img/imagen17.jpg',
    '/assets/img/imagen19.jpg',
    '/assets/img/imagen20.jpg',
    '/assets/img/imagen21.jpg',
    '/assets/img/imagen22.jpg',
    '/assets/img/imagen24.jpg',
    '/assets/img/imagen26.jpg',
    '/assets/img/imagen27.jpg',
    '/assets/img/imagen28.jpg',
    '/assets/img/imagen29.jpg',
    '/assets/img/imagen30.jpg',
    '/assets/img/imagen31.jpg',
    '/assets/img/imagen32.jpg',
    '/assets/img/imagen33.jpg',
];
// Ajustamos las rutas según la ubicación de la página actual
const rutaImagenes = paginaPrincipal ? './' : '../';

// Función para cambiar de fondo la imagen de manera aleatoria
function cambiarBackground() {
    const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
    const img = new Image();
    img.onload = function() {
        document.body.style.backgroundImage = `url('${rutaImagenes + imagenAleatoria}')`;
    };
    img.src = rutaImagenes + imagenAleatoria; // Esto asigna la imagen para que comience a cargarse
}

// Función para precargar las imágenes y evitar el parpadeo en blanco en algunas 
function precargarImagenes(imagenes) {
    for (let i = 0; i < imagenes.length; i++) {
        const img = new Image();
        img.src = rutaImagenes + imagenes[i];
    }
}

// Llamamos a la función de precarga 
precargarImagenes(imagenes);

// Establecemos un intervalo para cambiar la imagen cada 9 segundos (9000 ms)
setInterval(cambiarBackground, 9000);

// Cambiamos el fondo inmediatamente al cargar la página
document.addEventListener("DOMContentLoaded", cambiarBackground);

