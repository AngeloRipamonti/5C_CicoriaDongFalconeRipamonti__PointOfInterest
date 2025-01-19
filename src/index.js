import { createNavigator } from "/src/scripts/navigator.js";
import { generateMap } from "/src/scripts/mapComponent.js" ;
import { generateModalForm } from "/src/scripts/formComponent.js" ;
import { generateFetchComponent } from "./scripts/fetch.js";

//POI
document.getElementById("modalInsertAdminButton").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.remove("hidden");
}
document.getElementById("close-modal-POI").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.toggle("hidden");
}

console.log(document.getElementById("modalAdminLogin")) ;

//*Input*
const loginFormConfig = {
    "username": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "password": ["password", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "remember-me": ["checkbox", "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"]
}

const poiFormConfig = {
    "name" : ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "description" : ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "adress" : ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "price" : ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "duration" : ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "imageLink" : ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"]
}
/*
*Output*
const loginFormOutput = {
    "username": "falconeandrea",
    "password": "test1234",
    "remember-me": "true"
}

const poiFormOutput = {
    name: "kts-schole",
    description: "Kurt-Tucholsky is a high school ...",
    adress: "Richard-Wagner-Straße 41, 24943 Flensburg, Germany",
    price: "/",
    duration: "/",
    imageLink: "drive.google.com/......."
}
*/




const loginModalForm = generateModalForm(document.getElementById("loginModalBody")) ;
loginModalForm.build(loginFormConfig, "loginForm") ;
loginModalForm.onsubmit(async loginResult => {
    const login = generateFetchComponent();
    await login.build("/config.json", "credential");
    let loginCheck = await login.login(loginResult[0], loginResult[1]);

    if (loginCheck) {
        if (loginResult[2] === true) {
            Cookies.set("isLogged", "true", {expires: 365});
            location.href = "#admin";
        }
    } else {
        loginModalForm.setStatus("Wrong credentials! Try checking both your username and password") ;
    }
}) ;

/*
const poiCreationModalForm = generateModalForm(document.getElementById("poiCreationModalBody")) ;
poiCreationModalForm.build(poiFormConfig, "poiForm") ;
poiCreationModalForm.render() ;
poiCreationModalForm.onsubmit(poiDict => {
    //convert adress into coordinates

    //save the dict on the cache
});
*/


//Login
document.getElementById("modalAdminLogin").onclick = () => {
    document.getElementById("authentication-modal-Login").classList.remove("hidden");
    loginModalForm.render() ;
}
document.getElementById("close-modal-Login").onclick = () => {
    document.getElementById("authentication-modal-Login").classList.toggle("hidden");
}

const navigator = createNavigator(document.getElementsByName("main")[0]);

//map component
//const map = generateMap(document.getElementById("mapContainer")) ;
//map.build([54.78194, 9.43667]) ; //Flensburg as the default position on the map
//map.render() ;


