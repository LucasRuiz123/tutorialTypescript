import { dataCourses } from './dataCourses.js';

var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");

// Nuevos elementos para los detalles
var serieDetails = document.getElementById('serie-details');
var noSelection = document.getElementById('no-selection');

// Elemento para el promedio
var promedioTemporadasElm = document.getElementById("promedio-temporadas");

btnfilterByName.onclick = function () { return applyFilterByName(); };

// Llamar funciones iniciales
renderCoursesInTable(dataCourses);
actualizarPromedioTemporadas(dataCourses);

function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(course.id, "</td>\n                           <td>").concat(course.canal, "</td>\n                           <td>\n                             <a href=\"#\" class=\"serie-link\" data-id=\"").concat(course.id, "\">\n                               ").concat(course.nombre, "\n                             </a>\n                           </td>\n                           <td>").concat(course.temporadas, "</td>");
        coursesTbody.appendChild(trElement);
    });
    // Agregar event listeners después de renderizar la tabla
    agregarEventListeners();
}

// Función para agregar event listeners a los nombres de series
function agregarEventListeners() {
    var links = document.querySelectorAll('.serie-link');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var serieId = event.target.getAttribute('data-id');
            if (serieId) {
                var serie = dataCourses.find(function (s) { return s.id === parseInt(serieId); });
                if (serie) {
                    mostrarDetallesSerie(serie);
                }
            }
        });
    });
}

// Función para mostrar detalles de la serie
function mostrarDetallesSerie(serie) {
    // Ocultar "no selection" y mostrar detalles
    noSelection.style.display = 'none';
    serieDetails.style.display = 'block';
    // Llenar la card con los datos de la serie
    document.getElementById('detail-imagen').setAttribute('src', serie.imagen);
    document.getElementById('detail-imagen').setAttribute('alt', serie.nombre);
    document.getElementById('detail-nombre').textContent = serie.nombre;
    document.getElementById('detail-canal').textContent = "Canal: ".concat(serie.canal);
    document.getElementById('detail-temporadas').textContent = "Temporadas: ".concat(serie.temporadas);
    document.getElementById('detail-descripcion').textContent = serie.descripcion;
    document.getElementById('detail-enlace').textContent = serie.enlace;
}

// Función para calcular promedio
function getTotalCredits(courses) {
    if (courses.length === 0) return 0;
    var totaltemporadas = 0;
    courses.forEach(function (course) { return totaltemporadas = totaltemporadas + course.temporadas; });
    return totaltemporadas / courses.length;
}

// Función para actualizar el promedio
function actualizarPromedioTemporadas(courses) {
    var promedio = getTotalCredits(courses);
    promedioTemporadasElm.textContent = promedio.toFixed(1);
}

function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    actualizarPromedioTemporadas(coursesFiltered);
}

function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.nombre.match(nameKey);
    });
}

function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}