document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');
    cargarDatosFormulario(index);
});

// Cargar los datos del registro en el formulario de edición
function cargarDatosFormulario(index) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    if (index !== null && registros[index]) {
        const registro = registros[index];
        document.getElementById('nombre').value = registro.nombre;
        document.getElementById('fecha_nacimiento').value = registro.fechaNacimiento;
        document.getElementById('edad').value = registro.edad;
        document.getElementById('alergias').value = registro.alergias;
        document.getElementById('enfermedad').value = registro.enfermedad;
        document.getElementById('medicamentos').value = registro.medicamentos;
        document.getElementById('seguro_medico').value = registro.seguroMedico;
        document.getElementById('domicilio').value = registro.domicilio;
        document.getElementById('nacionalidad').value = registro.nacionalidad;
        document.getElementById('contacto1_nombre').value = registro.contacto1.nombre;
        document.getElementById('contacto1_parentesco').value = registro.contacto1.parentesco;
        document.getElementById('contacto1_telefono').value = registro.contacto1.telefono;
        document.getElementById('contacto2_nombre').value = registro.contacto2.nombre;
        document.getElementById('contacto2_parentesco').value = registro.contacto2.parentesco;
        document.getElementById('contacto2_telefono').value = registro.contacto2.telefono;
    }
}

// Guardar la edición
function guardarEdicion(event) {
    event.preventDefault();
    const index = new URLSearchParams(window.location.search).get('index');
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    
    const registroEditado = {
        nombre: document.getElementById('nombre').value,
        fechaNacimiento: document.getElementById('fecha_nacimiento').value,
        edad: document.getElementById('edad').value,
        alergias: document.getElementById('alergias').value,
        enfermedad: document.getElementById('enfermedad').value,
        medicamentos: document.getElementById('medicamentos').value,
        seguroMedico: document.getElementById('seguro_medico').value,
        domicilio: document.getElementById('domicilio').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        contacto1: {
            nombre: document.getElementById('contacto1_nombre').value,
            parentesco: document.getElementById('contacto1_parentesco').value,
            telefono: document.getElementById('contacto1_telefono').value
        },
        contacto2: {
            nombre: document.getElementById('contacto2_nombre').value,
            parentesco: document.getElementById('contacto2_parentesco').value,
            telefono: document.getElementById('contacto2_telefono').value
        }
    };

    registros[index] = registroEditado;
    localStorage.setItem('registros', JSON.stringify(registros));

    window.location.href = "consultar.html"; // Redirigir al listado después de guardar
}
