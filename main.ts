import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const serieDetails: HTMLElement = document.getElementById('serie-details')!;
const noSelection: HTMLElement = document.getElementById('no-selection')!;
const promedioTemporadasElm: HTMLElement = document.getElementById("promedio-temporadas")!;

btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);
actualizarPromedioTemporadas(dataCourses); 

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.id}</td>
                           <td>${course.canal}</td>
                           <td>
                             <a href="#" class="serie-link" data-id="${course.id}">
                               ${course.nombre}
                             </a>
                           </td>
                           <td>${course.temporadas}</td>`;  
    coursesTbody.appendChild(trElement);
  });

  agregarEventListeners();
}

function agregarEventListeners(): void {
  const links = document.querySelectorAll('.serie-link');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const serieId = (event.target as HTMLElement).getAttribute('data-id');
      if (serieId) {
        const serie = dataCourses.find(s => s.id === parseInt(serieId));
        if (serie) {
          mostrarDetallesSerie(serie);
        }
      }
    });
  });
}

function mostrarDetallesSerie(serie: Course): void {

  noSelection.style.display = 'none';
  serieDetails.style.display = 'block';

  document.getElementById('detail-imagen')!.setAttribute('src', serie.img); 
  document.getElementById('detail-imagen')!.setAttribute('alt', serie.nombre);
  document.getElementById('detail-nombre')!.textContent = serie.nombre;
  document.getElementById('detail-canal')!.textContent = `Canal: ${serie.canal}`;
  document.getElementById('detail-temporadas')!.textContent = `Temporadas: ${serie.temporadas}`;
  document.getElementById('detail-descripcion')!.textContent = serie.descripcion;
  document.getElementById('detail-enlace')!.textContent = serie.enlace;
}

function getTotalCredits(courses: Course[]): number {
  if (courses.length === 0) return 0;
  
  let totaltemporadas: number = 0;
  courses.forEach((course) => totaltemporadas = totaltemporadas + course.temporadas);
  return totaltemporadas / courses.length;
}

function actualizarPromedioTemporadas(courses: Course[]): void {
  const promedio = getTotalCredits(courses);
  promedioTemporadasElm.textContent = promedio.toFixed(1);
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  actualizarPromedioTemporadas(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.nombre.match(nameKey));
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}