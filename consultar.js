document.addEventListener('DOMContentLoaded', function() {
    mostrarRegistros();
});

// Mostrar los registros
function mostrarRegistros() {
    const registrosList = document.getElementById('registrosList');
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    if (registros.length === 0) {
        registrosList.innerHTML = '<p>No hay registros.</p>';
    } else {
        registrosList.innerHTML = registros.map((registro, index) => {
            return `
                <div class="registro">
                    <p><strong>Nombre:</strong> ${registro.nombre}</p>
                    <p><strong>Edad:</strong> ${registro.edad}</p>
                    <p><strong>Domicilio:</strong> ${registro.domicilio}</p>
                    <button onclick="verRegistro(${index})">Ver</button> <!-- Ver registro -->
                    <button onclick="editarRegistro(${index})">Editar</button> <!-- Editar registro -->
                    <button onclick="eliminarRegistro(${index})">Eliminar</button> <!-- Eliminar registro -->
                </div>
            `;
        }).join('');
    }
}

// Ver detalles del registro
function verRegistro(index) {
    localStorage.setItem('verIndex', index);
    window.location.href = "ver.html"; // Redirigir a la página de ver registro
}

// Editar un registro
function editarRegistro(index) {
    localStorage.setItem('verIndex', index);  // Guardar índice del registro para editarlo
    window.location.href = `editar.html?index=${index}`; // Redirigir al formulario de edición
}

// Eliminar un registro
function eliminarRegistro(index) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.splice(index, 1); // Eliminar el registro
    localStorage.setItem('registros', JSON.stringify(registros)); // Guardar los registros actualizados
    mostrarRegistros(); // Refrescar la lista de registros
}
