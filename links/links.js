document.addEventListener('DOMContentLoaded', () => {
    const addLinkButton = document.getElementById('add-link-button');
    const nameInput = document.getElementById('name-input');
    const urlInput = document.getElementById('url-input');
    const linksContainer = document.getElementById('links-container');

// Mensaje por defecto si no hay enlaces
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No hay enlaces guardados.';
    emptyMessage.id = 'empty-message';
    linksContainer.appendChild(emptyMessage);

// Función para alternar el mensaje de "No hay enlaces"
    const toggleEmptyMessage = () => {
        if (linksContainer.children.length === 0) {
            linksContainer.appendChild(emptyMessage);
        } else {
            const message = document.getElementById('empty-message');
            if (message) {
                linksContainer.removeChild(message);
            }
        }
    };

// Validar si una URL es válida
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

// Cargar enlaces desde el localStorage al iniciar
    const loadLinks = () => {
        const savedLinks = JSON.parse(localStorage.getItem('links')) || [];
        savedLinks.forEach(({ id, name, url }) => addLinkToDOM(id, name, url));
        toggleEmptyMessage(); // Verifica si hay que mostrar el mensaje
    };

// Guardar enlace en el localStorage
    const saveLink = (id, name, url) => {
        const savedLinks = JSON.parse(localStorage.getItem('links')) || [];
        savedLinks.push({ id, name, url });
        localStorage.setItem('links', JSON.stringify(savedLinks));
    };

// Eliminar enlace del localStorage
    const deleteLinkFromStorage = (id) => {
        const savedLinks = JSON.parse(localStorage.getItem('links')) || [];
        const updatedLinks = savedLinks.filter(link => link.id !== id);
        localStorage.setItem('links', JSON.stringify(updatedLinks));
    };

// Añadir enlace al DOM
    const addLinkToDOM = (id, name, url) => {
        const listItem = document.createElement('li');
        listItem.classList.add('link-item');
        listItem.dataset.id = id; // Guardar el id en el elemento DOM

        const link = document.createElement('a');
        link.href = url;
        link.textContent = name;
        link.target = '_blank';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            listItem.classList.add('removed');
            setTimeout(() => {
                linksContainer.removeChild(listItem); // Quita el elemento del DOM
                deleteLinkFromStorage(id); // Elimina del localStorage
                toggleEmptyMessage(); // Verifica si hay que mostrar el mensaje 
            }, 300); // Duracion de la animación
        });

        listItem.appendChild(link);
        listItem.appendChild(deleteButton);
        linksContainer.appendChild(listItem);

        toggleEmptyMessage(); // Actualiza el estado del mensaje
    };

// Manejar el evento de añadir enlace
    addLinkButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();

        if (name && isValidUrl(url)) {
            const id = Date.now(); // Usar un timestamp como identificador único
            addLinkToDOM(id, name, url);
            saveLink(id, name, url);

            // Limpiar los campos de entrada
            nameInput.value = '';
            urlInput.value = '';
        } else {
            alert('Por favor, introduce un nombre y una URL válida.');
        }
    });

// Cargar los enlaces al cargar la página
    loadLinks();
});

