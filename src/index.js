import { createNavigator } from "/src/scripts/navigator.js";
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