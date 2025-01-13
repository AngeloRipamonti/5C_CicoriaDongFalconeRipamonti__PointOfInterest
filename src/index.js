import { createNavigator } from "/src/scripts/navigator.js";
import { generateMap } from "/src/scripts/mapComponent.js" ;

//POI
document.getElementById("modalInsertAdminButton").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.remove("hidden");
}
document.getElementById("close-modal-POI").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.toggle("hidden");
}

//Login
document.getElementById("modalAdminLogin").onclick = () => {
    document.getElementById("authentication-modal-Login").classList.remove("hidden");
}
document.getElementById("close-modal-Login").onclick = () => {
    document.getElementById("authentication-modal-Login").classList.toggle("hidden");
}

const navigator = createNavigator(document.getElementsByName("main")[0]);

//map component
const map = generateMap(document.getElementById("mapContainer")) ;
map.build([54.78194, 9.43667]) ; //Flensburg as the default position on the map
//map.render() ;