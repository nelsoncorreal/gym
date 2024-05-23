// Definir una lista de ejercicios para cada día de la rutina, incluyendo imágenes y tiempo estimado (en segundos)
const rutinaEjercicios = {
    dia1: [
        { nombre: "Press de banca con barra", imagen: "press-banca.jpg", tiempo: 60 },
        { nombre: "Press inclinado con mancuernas", imagen: "press-inclinado.jpg", tiempo: 45 },
        { nombre: "Aperturas con mancuernas en banco plano", imagen: "aperturas-banco.jpg", tiempo: 45 },
        { nombre: "Fondos en paralelas", imagen: "fondos-paralelas.jpg", tiempo: 30 },
        { nombre: "Press de banca cerrado", imagen: "press-banca-cerrado.jpg", tiempo: 45 },
        { nombre: "Extensiones de tríceps en polea", imagen: "extensiones-triceps.jpg", tiempo: 30 }
    ],
    dia2: [
        { nombre: "Dominadas", imagen: "dominadas.jpg", tiempo: 60 },
        { nombre: "Remo con barra", imagen: "remo-barra.jpg", tiempo: 45 },
        { nombre: "Jalones al pecho", imagen: "jalones-pecho.jpg", tiempo: 45 },
        { nombre: "Remo sentado en máquina", imagen: "remo-maquina.jpg", tiempo: 45 },
        { nombre: "Curl de bíceps con barra", imagen: "curl-biceps-barra.jpg", tiempo: 30 },
        { nombre: "Curl de bíceps alternado con mancuernas", imagen: "curl-biceps-mancuernas.jpg", tiempo: 30 }
    ],
    dia3: [
        { nombre: "Sentadillas con barra", imagen: "sentadillas-barra.jpg", tiempo: 60 },
        { nombre: "Prensa de pierna", imagen: "prensa-pierna.jpg", tiempo: 45 },
        { nombre: "Peso muerto rumano", imagen: "peso-muerto-rumano.jpg", tiempo: 45 },
        { nombre: "Zancadas con mancuernas", imagen: "zancadas-mancuernas.jpg", tiempo: 45 },
        { nombre: "Extensiones de pierna en máquina", imagen: "extensiones-pierna.jpg", tiempo: 30 },
        { nombre: "Elevaciones de talones", imagen: "elevaciones-talones.jpg", tiempo: 30 }
    ],
    dia4: [
        { nombre: "Press militar con barra", imagen: "press-militar-barra.jpg", tiempo: 60 },
        { nombre: "Elevaciones laterales con mancuernas", imagen: "elevaciones-laterales.jpg", tiempo: 45 },
        { nombre: "Elevaciones frontales con mancuernas", imagen: "elevaciones-frontales.jpg", tiempo: 45 },
        { nombre: "Remo al mentón con barra", imagen: "remo-menton.jpg", tiempo: 45 },
        { nombre: "Encogimientos de hombros con mancuernas", imagen: "encogimientos-hombros.jpg", tiempo: 30 },
        { nombre: "Face pulls en polea", imagen: "face-pulls.gif", tiempo: 30 }
    ],
    dia5: [
        { nombre: "Sentadillas búlgaras con mancuernas", imagen: "sentadillas-bulgaras.jpg", tiempo: 60 },
        { nombre: "Peso muerto convencional", imagen: "peso-muerto-convencional.jpg", tiempo: 45 },
        { nombre: "Curl de pierna en máquina", imagen: "curl-pierna-maquina.jpg", tiempo: 45 },
        { nombre: "Prensa de pierna (foco en gemelos)", imagen: "prensa-gemelos.jpg", tiempo: 45 },
        { nombre: "Plancha", imagen: "plancha.jpg", tiempo: 30 },
        { nombre: "Elevaciones de piernas colgado", imagen: "elevaciones-piernas.jpg", tiempo: 30 }
    ],
    dia6: [
        { nombre: "Press de banca inclinado con barra", imagen: "press-inclinado.jpg", tiempo: 60 },
        { nombre: "Aperturas en banco inclinado", imagen: "aperturas-inclinado.gif", tiempo: 45 },
        { nombre: "Remo con mancuerna", imagen: "remo-mancuerna.gif", tiempo: 45 },
        { nombre: "Jalones con agarre estrecho", imagen: "jalones-estrecho.gif", tiempo: 45 },
        { nombre: "Russian twists con peso", imagen: "russian-twists.gif", tiempo: 30 },
        { nombre: "Ab wheel rollout", imagen: "ab-wheel.gif", tiempo: 30 }
    ]
};

// Función para agregar ejercicios a la sección de rutina de entrenamiento
function mostrarRutina(dia) {
    const ejerciciosContainer = document.getElementById('ejercicios');
    ejerciciosContainer.innerHTML = ''; // Limpiar contenido existente

    rutinaEjercicios[dia].forEach((ejercicioData, index) => {
        const ejercicioItem = document.createElement('div');
        ejercicioItem.classList.add('ejercicio');
        ejercicioItem.innerHTML = `
            <img src="${ejercicioData.imagen}" alt="${ejercicioData.nombre}">
            <div class="info">
                <p>${ejercicioData.nombre}</p>
                <button class="empezar" data-tiempo="${ejercicioData.tiempo}">Empezar</button>
                <div class="cronometro"></div>
            </div>
        `;
        ejerciciosContainer.appendChild(ejercicioItem);
    });

    // Añadir eventos para empezar el cronómetro al hacer clic en el botón "Empezar"
    const botonesEmpezar = document.querySelectorAll('.empezar');
    botonesEmpezar.forEach(boton => {
        boton.addEventListener('click', empezarCronometro);
    });
}

// Función para empezar el cronómetro
function empezarCronometro(event) {
    const boton = event.target;
    const tiempoEjercicio = parseInt(boton.dataset.tiempo);
    const cronometro = boton.nextElementSibling;

    boton.disabled = true; // Desactivar el botón mientras dure el ejercicio

    let segundos = tiempoEjercicio;
    const intervalID = setInterval(() => {
        cronometro.textContent = `Tiempo restante: ${segundos}s`;
        segundos--;

        if (segundos < 0) {
            clearInterval(intervalID);
            cronometro.textContent = '¡Terminado!';
            boton.disabled = false; // Reactivar el botón después de terminar el ejercicio
        }
    }, 1000);
}

// Función para manejar el clic en un día del menú
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover la clase "activo" de todos los elementos del menú
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('activo');
        });

        // Agregar la clase "activo" al elemento clickeado
        this.classList.add('activo');

        // Obtener el día correspondiente al menú clickeado
        const dia = this.dataset.dia;

        // Mostrar la rutina para el día seleccionado
        mostrarRutina(dia);
    });
});


// Llamar a la función para mostrar la rutina del primer día cuando la página se carga
window.onload = function() {
    document.querySelector('.menu-item').click();
};

