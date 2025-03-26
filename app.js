// Obtener registros desde el localStorage
function obtenerRegistros() {
    const registros = localStorage.getItem("registros");
    return registros ? JSON.parse(registros) : [];
}

// Guardar registros en el localStorage
function guardarEnLocalStorage(registros) {
    localStorage.setItem("registros", JSON.stringify(registros));
}

// Guardar un nuevo registro
function guardarRegistro() {
    const nombre = document.getElementById("nombre").value;
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    const edad = document.getElementById("edad").value;
    const alergias = document.getElementById("alergias").value;
    const enfermedad = document.getElementById("enfermedad").value;
    const medicamentos = document.getElementById("medicamentos").value;
    const seguroMedico = document.getElementById("seguro_medico").value;
    const domicilio = document.getElementById("domicilio").value;
    const nacionalidad = document.getElementById("nacionalidad").value;

    const contacto1Nombre = document.getElementById("contacto1_nombre").value;
    const contacto1Parentesco = document.getElementById("contacto1_parentesco").value;
    const contacto1Telefono = document.getElementById("contacto1_telefono").value;
    const contacto2Nombre = document.getElementById("contacto2_nombre").value;
    const contacto2Parentesco = document.getElementById("contacto2_parentesco").value;
    const contacto2Telefono = document.getElementById("contacto2_telefono").value;

    const nuevoRegistro = {
        nombre,
        fechaNacimiento,
        edad,
        alergias,
        enfermedad,
        medicamentos,
        seguroMedico,
        domicilio,
        nacionalidad,
        contacto1: { nombre: contacto1Nombre, parentesco: contacto1Parentesco, telefono: contacto1Telefono },
        contacto2: { nombre: contacto2Nombre, parentesco: contacto2Parentesco, telefono: contacto2Telefono }
    };

    const registros = obtenerRegistros();
    registros.push(nuevoRegistro);
    guardarEnLocalStorage(registros);

    window.location.href = "consultar.html"; // Redirigir al listado
}

// Mostrar todos los registros guardados
document.addEventListener('DOMContentLoaded', function() {
    mostrarRegistros();
});

function mostrarRegistros() {
    const registros = obtenerRegistros();
    const listaRegistros = document.getElementById("listaRegistros");
    listaRegistros.innerHTML = '';

    if (registros.length === 0) {
        listaRegistros.innerHTML = '<p>No hay registros disponibles.</p>';
        return;
    }

    registros.forEach((registro, index) => {
        const divRegistro = document.createElement("div");
        divRegistro.classList.add("registro");
        divRegistro.innerHTML = `
            <p><strong>Nombre:</strong> ${registro.nombre}</p>
            <p><strong>Fecha de nacimiento:</strong> ${registro.fechaNacimiento}</p>
            <p><strong>Edad:</strong> ${registro.edad}</p>
            <p><strong>Alergias:</strong> ${registro.alergias}</p>
            <p><strong>Enfermedad:</strong> ${registro.enfermedad}</p>
            <button onclick="verDetalles(${index})">Ver</button>
            <button onclick="eliminarRegistro(${index})">Eliminar</button>
        `;
        listaRegistros.appendChild(divRegistro);
    });
}

// Función para ver los detalles de un registro
function verDetalles(index) {
    localStorage.setItem('verIndex', index);
    window.location.href = 'ver.html';
}

// Función para eliminar un registro
function eliminarRegistro(index) {
    const registros = obtenerRegistros();
    registros.splice(index, 1);
    guardarEnLocalStorage(registros);
    mostrarRegistros();
}

// Mostrar el registro individual al hacer clic en "Ver"
function mostrarRegistroIndividual() {
    const registroDetalle = document.getElementById('registroDetalle');
    const verIndex = localStorage.getItem('verIndex');
    const registros = obtenerRegistros();

    if (verIndex !== null && registros[verIndex]) {
        const registro = registros[verIndex];
        registroDetalle.innerHTML = `
            <p><strong>Nombre Completo:</strong> ${registro.nombre}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${registro.fechaNacimiento}</p>
            <p><strong>Edad:</strong> ${registro.edad}</p>
            <p><strong>Alergias:</strong> ${registro.alergias}</p>
            <p><strong>Enfermedad:</strong> ${registro.enfermedad}</p>
            <p><strong>Medicamentos:</strong> ${registro.medicamentos}</p>
            <p><strong>Seguro Médico:</strong> ${registro.seguroMedico}</p>
            <p><strong>Domicilio:</strong> ${registro.domicilio}</p>
            <p><strong>Nacionalidad:</strong> ${registro.nacionalidad}</p>
            <p><strong>Contacto 1:</strong> ${registro.contacto1.nombre} (${registro.contacto1.parentesco}, ${registro.contacto1.telefono})</p>
            <p><strong>Contacto 2:</strong> ${registro.contacto2.nombre} (${registro.contacto2.parentesco}, ${registro.contacto2.telefono})</p>
        `;
    } else {
        registroDetalle.innerHTML = `<p>No se encontró el registro.</p>`;
    }
}

// Función para editar un registro
function editarRegistro() {
    const verIndex = localStorage.getItem('verIndex');
    const registros = obtenerRegistros();

    if (verIndex !== null && registros[verIndex]) {
        const registro = registros[verIndex];

        // Prellenar el formulario con los valores del registro
        document.getElementById("nombre").value = registro.nombre;
        document.getElementById("fecha_nacimiento").value = registro.fechaNacimiento;
        document.getElementById("edad").value = registro.edad;
        document.getElementById("alergias").value = registro.alergias;
        document.getElementById("enfermedad").value = registro.enfermedad;
        document.getElementById("medicamentos").value = registro.medicamentos;
        document.getElementById("seguro_medico").value = registro.seguroMedico;
        document.getElementById("domicilio").value = registro.domicilio;
        document.getElementById("nacionalidad").value = registro.nacionalidad;
        document.getElementById("contacto1_nombre").value = registro.contacto1.nombre;
        document.getElementById("contacto1_parentesco").value = registro.contacto1.parentesco;
        document.getElementById("contacto1_telefono").value = registro.contacto1.telefono;
        document.getElementById("contacto2_nombre").value = registro.contacto2.nombre;
        document.getElementById("contacto2_parentesco").value = registro.contacto2.parentesco;
        document.getElementById("contacto2_telefono").value = registro.contacto2.telefono;

        // Cambiar la acción del botón a "Actualizar"
        document.getElementById("guardarBtn").textContent = "Actualizar Registro";
        document.getElementById("guardarBtn").onclick = function() {
            actualizarRegistro(verIndex);
        };
    }
}

// Función para actualizar un registro
function actualizarRegistro(index) {
    const registros = obtenerRegistros();

    const nombre = document.getElementById("nombre").value;
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    const edad = document.getElementById("edad").value;
    const alergias = document.getElementById("alergias").value;
    const enfermedad = document.getElementById("enfermedad").value;
    const medicamentos = document.getElementById("medicamentos").value;
    const seguroMedico = document.getElementById("seguro_medico").value;
    const domicilio = document.getElementById("domicilio").value;
    const nacionalidad = document.getElementById("nacionalidad").value;

    const contacto1Nombre = document.getElementById("contacto1_nombre").value;
    const contacto1Parentesco = document.getElementById("contacto1_parentesco").value;
    const contacto1Telefono = document.getElementById("contacto1_telefono").value;
    const contacto2Nombre = document.getElementById("contacto2_nombre").value;
    const contacto2Parentesco = document.getElementById("contacto2_parentesco").value;
    const contacto2Telefono = document.getElementById("contacto2_telefono").value;

    const actualizadoRegistro = {
        nombre,
        fechaNacimiento,
        edad,
        alergias,
        enfermedad,
        medicamentos,
        seguroMedico,
        domicilio,
        nacionalidad,
        contacto1: { nombre: contacto1Nombre, parentesco: contacto1Parentesco, telefono: contacto1Telefono },
        contacto2: { nombre: contacto2Nombre, parentesco: contacto2Parentesco, telefono: contacto2Telefono }
    };

    registros[index] = actualizadoRegistro;
    guardarEnLocalStorage(registros);

    window.location.href = "consultar.html"; // Redirigir al listado
}
