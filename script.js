//Crea el mapa

var map = L.map('map').setView([40.4165, -3.70256], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`)
    });
    //var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13).addTo(map);
    var marker = L.marker([40.4216, -3.6929]).addTo(map)
        .bindPopup('Estás aquí')
        .openPopup();
    // Agregar un marcador en la ubicación del usuario
    //L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
    //    .bindPopup('Estás aquí')
    //    .openPopup();
} else {
    console.warn("Tu navegador no soporta Geolocalización!!");
}



async function terremotos() {
    try {
        let response = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        let data = await response.json();
        data.features.forEach(item => {
            let localizacion = item.geometry.coordinates;
            let titulo = item.properties.title;
            let fecha = item.properties.time;
            let ubicacion = item.properties.place;
            let codigo = item.properties.code;
            let magnitud = item.properties.mag;
            //let latLng = localizacion([localizacion[1], localizacion[0]])

            return { localizacion, titulo, fecha, ubicacion, codigo, magnitud }
        })
        
        
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }

}

//const coordinates = terremotos().then(data => console.log(data));

//L.marker(latLng)
            //.bindPopup("<b>Hello world!</b>")
            //.openPopup()
            //.addTo(map);

//const coordinates = terremotos().then(data => console.log(data));
//    console.log(coordinates.then())


