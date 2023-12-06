
document.addEventListener("DOMContentLoaded", function () {
    // Creating map and tile
    const map = L.map('map').setView([0, 0], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    // Making a marker with a custom icon
    const issIcon = L.icon({
        iconUrl: 'img/rusty-gopher.png',
        iconSize: [160, 140],
        iconAnchor: [80, 70]
    });
    const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);

    const urlApi = 'https://api.wheretheiss.at/v1/satellites/25544';

    setInterval(getGopherPosition, 1000);

    async function getGopherPosition() {
        const response = await (fetch(urlApi));
        const data = await response.json();
        const {altitude, velocity, latitude, longitude} = data;
        // console.log(data);

        document.getElementById('altitude').textContent = data.altitude.toFixed(2) + " km";
        document.getElementById('velocity').textContent = data.velocity.toFixed(2) + " km/h";
        document.getElementById('longitude').textContent = data.longitude.toFixed(2) + '°';
        document.getElementById('latitude').textContent = data.latitude.toFixed(2) + '°';

        map.setView([latitude, longitude]);
        marker.setLatLng(L.latLng(latitude, longitude))
    }
});