export const generateMap = (parentElement) => {
    let map;
    let points = [];
    
    return {
        build: (startCoords) => {
            map = L.map(parentElement).setView(startCoords, 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        },
        render: () => {
            points.forEach((POI) => {
                if (POI) {
                    const marker = L.marker(POI.coords).addTo(map);
                    marker.bindPopup("<b>" + POI.name + "</b><br>") ;
                }
            });
        },
        addPOI: (infos) => {

        },
        moveToPOI: (coords) => {
            map = L.map(parentElement).setView(coords, 16);
        }
    };
};