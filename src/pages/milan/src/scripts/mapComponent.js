import { keySelector } from "../utils/keySelector.js";

export const generateMap = (parentElement, pubsub) => {
    let map;
    let points = []; // {name: "KTS", coords: [lat, lon]}

    return {
        build: function (startCoords) {
            map = L.map(parentElement).setView(startCoords, 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            pubsub.subscribe("getData", (data) => {
                let smth = keySelector(data.milan, ["name", "lat", "lon"]);
                for (const key in smth) {
                    points.push({ name: smth[key].name, coords: [smth[key].lat, smth[key].lon] });
                }
                this.render();
            });
        },
        render: function () {
            points.forEach((POI) => {
                if (POI) {
                    const marker = L.marker(POI.coords).addTo(map);
                    marker.bindPopup("<b>" + POI.name + "</b><br>");
                }
            });
        },
        goTo: function (name) {
            map.flyTo(points.filter(poi => poi.name === name)[0].coords, 16);
        }
    };
};