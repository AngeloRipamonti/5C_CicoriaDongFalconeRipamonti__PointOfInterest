//Imports
import { createNavigator } from "/src/scripts/navigator.js";
import { generateMap } from "/src/scripts/mapComponent.js";
import { generateModalForm } from "/src/scripts/formComponent.js";
import { generateFetchComponent } from "./scripts/fetch.js";
import { createTable } from "./scripts/table.js";
import { generateGeoencoder } from "./scripts/geoencoderComponent.js";
import { createPage }  from "./scripts/page.js";
import Cookies from "/node_modules/js-cookie/dist/js.cookie.min.mjs";

// Declare & Initialize variables
const searcher = document.getElementById("search-bar");
const navigator = createNavigator(document.getElementsByName("main")[0]);
const page = createPage(document.getElementsByName("main")[0]);
const loginModalForm = generateModalForm(document.getElementById("loginModalBody"));
const poiCreationModalForm = generateModalForm(document.getElementById("poiCreationModalBody"));
const map = generateMap(document.getElementById("mapContainer"));
let table = createTable(document.getElementById("points-table"));
/*const data = [
    {Title: "Kurt-Tucholsky-Schule(KTS)", Address: "Richard-Wagner-Straße 41, 24943 Flensburg, Germany"},
    {Title: "Hafenspitze", Address: "Am Kanalschuppen, 24937 Flensburg, Germany"},
];*/
const data = {
    "KTS": {
      "title": "Kurt-Tucholsky-Schule",
      "address": "Richard-Wagner-Straße 41 , 24943 Flensburg, Germany", 
    }
}
const geoEncoder = generateGeoencoder();
//*Input*
const loginFormConfig = {
    "username": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "password": ["password", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "remember-me": ["checkbox", "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"]
}
const poiFormConfig = {
    "name": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "description": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "adress": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "price": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "duration": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"],
    "imageLink": ["text", "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"]
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

//BUILD
poiCreationModalForm.build(poiFormConfig, "poiForm");
loginModalForm.build(loginFormConfig, "loginForm");
map.build([54.78194, 9.43667]) ; //Flensburg as the default position on the map
table.build("List of all poi", data);
await geoEncoder.build("/config.json", "location") ;

//POI actions
document.getElementById("modalInsertAdminButton").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.remove("hidden");
    poiCreationModalForm.render() ;
}
document.getElementById("close-modal-POI").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.toggle("hidden");
}

//RENDER
map.render() ;
table.render(data);
 
//FUNCTIONS
setTimeout(()=>{
    console.log("Loading Done!");
    document.getElementById("spinner").classList.add("hidden");
    location.href = "#flensburg";
}, 2000);

let searchCallback = (originalData, pattern) => {
    // Ricostruisce il dizionario basandosi sul pattern
    return Object.keys(originalData).reduce((result, key) => {
        if (originalData[key].title.toLowerCase().includes(pattern.toLowerCase())) {
            result[key] = originalData[key];
        }
        return result;
    }, {});
};

//COMPONENT CALLBACK
table.setListener((event)=>{
    const row = event.target.closest("tr");
    if(row && row.id){
       const cells = Array.from(row.children).map(cell => cell.textContent);
       const href = page.render(id, cells); 
       location.href = href;
    } 
});

poiCreationModalForm.onsubmit(async poiArr => {
    //convert the array returned by the form into a dictionary
    let poiDict = {} ;
    let labels = Object.keys(poiFormConfig) ;
    poiArr.forEach((element, index) => {
        poiDict[labels[index]] = poiArr[index] ;
    });

    //convert adress into coordinates
    let poiCoords = await geoEncoder.encode(poiDict.adress) ;
    console.log(poiCoords) ;
    poiDict.lat = poiCoords.coords[0] ;
    poiDict.lon = poiCoords.coords[1] ;
    console.log(poiDict) ;

    //save the dict on the cache
    const poiCreation = generateFetchComponent();
    poiCreation.build("/config.json", "cache") ;
    try {

    } catch (e) {

    }
});

loginModalForm.onsubmit(async loginResult => {
    const login = generateFetchComponent();
    await login.build("/config.json", "credential");
    try {
        let loginCheck = await login.login(loginResult[0], loginResult[1]);

        if (loginCheck) {
            if (loginResult[2] === true) {
                Cookies.set("isLogged", "true", {
                    expires: 365
                });
            }
            location.href = "#admin";
            document.getElementById("close-modal-Login").click() ;
        } else {
            loginModalForm.setStatus("Wrong credentials! Try checking both your username and password");
        }
    } catch (e) {
        console.error(e);
    }
});

//BUTTON CALLBACK
//Login
document.getElementById("modalAdminLogin").onclick = () => {
    document.getElementById("authentication-modal-Login").classList.remove("hidden");
    loginModalForm.render();
}
document.getElementById("close-modal-Login").onclick = () => {
    document.getElementById("authentication-modal-Login").classList.toggle("hidden");
}
//POI
document.getElementById("modalInsertAdminButton").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.remove("hidden");
}
document.getElementById("close-modal-POI").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.toggle("hidden");
}

//EVENT LISTENER
searcher.addEventListener("input", (event) => {
    const keyword = event.target.value;
    let filteredData = searchCallback(data, keyword);
    table.render(filteredData);
});