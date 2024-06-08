let vaccinationPoints = [];

document.addEventListener('DOMContentLoaded', () => {
    Papa.parse('/Puntos_Vacunacion/covid_influenza/puntos-covid-influenza.csv', {
        download: true,
        header: true,
        complete: function(results) {
            vaccinationPoints = results.data;
            console.log(vaccinationPoints);  // Para verificar que los datos se cargan correctamente
        },
        error: function(error) {
            console.error('Error al cargar el archivo CSV:', error);
        }
    });
});

function searchVaccinationPoints() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (vaccinationPoints.length === 0) {
        resultsContainer.innerHTML = '<p>Los datos aún no se han cargado. Por favor, inténtelo de nuevo en unos momentos.</p>';
        return;
    }

    const filteredPoints = vaccinationPoints.filter(point =>
        point.COMUNA.toLowerCase().includes(searchInput)
    );

    if (filteredPoints.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron puntos de vacunación.</p>';
    } else {
        filteredPoints.forEach(point => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');
            resultDiv.innerHTML = `<h3>${point['NOMBRE DEL PUNTO']}</h3>
                                   <p>Dirección: ${point['DIRECCION DEL PUNTO']}</p>
                                   <p>Comuna: ${point.COMUNA}</p>
                                   <p>Región: ${point.REGION}</p>
                                   <p>Horario: ${point['HORARIO HÁBIL']}</p>
                                   <p>Extensión Horaria: ${point['EXTENSIÓN HORARIA']}</p>
                                   <p>Tipo de Punto: ${point['TIPO DE PUNTO']}</p>
                                   <p>Campaña Asociada: ${point['CAMPAÑA ASOCIADA']}</p>
                                   <p>Observaciones: ${point.OBSERVACIONES}</p>`;
            resultsContainer.appendChild(resultDiv);
        });
    }
}
