import { keySelector } from "../utils/keySelector.js";

export const generateMap = (parentElement, pubsub) => {
    let map;
    let points = []; // {name: "KTS", coords: [lat, lon]}
    let fetchComponent; 

    return {
        build: async function (startCoords, fetchC) {
            map = L.map(parentElement).setView(startCoords, 13);
            fetchComponent = fetchC;
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            let smth = keySelector((await fetchComponent.getData()).flensburg, ["name", "lat", "lon"]);
            for (const key in smth) {
                points.push({ name: smth[key].name, coords: [smth[key].lat, smth[key].lon] });
            }
            pubsub.subscribe("changePOI", async () => {
                const data = await fetchComponent.getData();
                let smth = keySelector(data.flensburg, ["name", "lat", "lon"]);
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

                    marker.onclick = () => {
                        map.flyTo(POI.coords, 13, {
                            animate: true,
                            duration: 1.5,
                            easeLinearity: 0.1
                        });
                    };
                }
            });
        },
        goTo: function (name) {
            map.flyTo(points.filter(poi => poi.name.include(name))[0].coords, 16);
        }
    };
};