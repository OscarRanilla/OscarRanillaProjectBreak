// Función para actualizar la hora, fecha y mensaje
function actualizarReloj() {
const ahora = new Date();

// Obtener horas, minutos y segundos
let horas = ahora.getHours();
let minutos = ahora.getMinutes();
let segundos = ahora.getSeconds();

// Formatear para que siempre haya dos dígitos
horas = horas < 10 ? "0" + horas : horas;
minutos = minutos < 10 ? "0" + minutos : minutos;
segundos = segundos < 10 ? "0" + segundos : segundos;

// Actualizar la hora
const horaActual = `${horas}:${minutos}:${segundos}`;
document.getElementById("time").textContent = horaActual;

// Obtener día, mes y año
const dia = ahora.getDate();
const mes = ahora.getMonth() + 1; // Los meses empiezan en 0
const anio = ahora.getFullYear();

// Formatear la fecha
const fechaFormateada = `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${anio}`;
document.getElementById("date").textContent = fechaFormateada;

// Mostrar mensaje según la hora
let mensaje = "";

if (horas >= 0 && horas < 7) {
    mensaje = "Recarga tus fuerzas, un nuevo día lleno de oportunidades te espera.";
} else if (horas >= 7 && horas < 12) {
    mensaje = "¡Buenos días! Hoy tienes el poder de lograr grandes cosas. Empieza con energía.";
} else if (horas >= 12 && horas < 14) {
    mensaje = "Estás haciendo un gran trabajo. ¡Un poco más y celebra con una buena comida!";
} else if (horas >= 14 && horas < 16) {
    mensaje = "Ya cruzaste la mitad del día, sigue adelante con determinación.";
} else if (horas >= 16 && horas < 18) {
    mensaje = "El éxito está más cerca de lo que crees. Da tu mejor esfuerzo en este tramo final.";
} else if (horas >= 18 && horas < 22) {
    mensaje = "Tu dedicación es impresionante. Pero recuerda, el descanso también forma parte del éxito.";
} else {
    mensaje = "Has dado lo mejor de ti hoy. Es hora de reflexionar, descansar y soñar en grande.";
}

// Actualizar el mensaje
document.getElementById("message").textContent = mensaje;
}

// Llamar a la función cada segundo
setInterval(actualizarReloj, 1000);

// Llamada inicial para mostrar datos al cargar la página
actualizarReloj();
