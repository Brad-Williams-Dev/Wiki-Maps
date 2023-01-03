// Client facing scripts here

let map = L.map('map').setView([43.6532, -79.3832], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addMarker(e) {
  // Add marker to map at click location; add popup window
  var newMarker = new L.marker(e.latlng).bindPopup('this is where the info should go').addTo(map);
};

map.on('click', addMarker);
