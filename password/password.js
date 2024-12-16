function generatePassword() {
const length = document.getElementById('length').value;
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_=+";

// Validamos la longitud
if (length < 12 || length > 50) {
alert("La longitud de la contraseña debe ser entre 12 y 50 caracteres.");
return;
}

// Concatenamos todos los caracteres posibles
const allChars = upperCaseChars + lowerCaseChars + numberChars + symbolChars;

let password = "";

// Garantizamos que haya al menos una letra mayúscula, una minúscula, un número y un símbolo
password += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
password += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));

// Llenar el resto de la contraseña con caracteres aleatorios
for (let i = password.length; i < length; i++) {
password += allChars.charAt(Math.floor(Math.random() * allChars.length));
}

// evitamos que los caracteres obligatorios siempre estén al principio de la contraseña, 
// y se utiliza un algoritmo de barajado con sort y Math.random().
password = password.split('').sort(() => Math.random() - 0.5).join('');

// Mostrar la contraseña generada
document.getElementById('passwordResultado').textContent = password;
}


