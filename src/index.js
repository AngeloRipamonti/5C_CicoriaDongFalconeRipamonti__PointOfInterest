//Imports
import {
    createNavigator
} from "/src/scripts/navigator.js";
import {
    generateMap
} from "/src/scripts/mapComponent.js";
import {
    generateModalForm
} from "/src/scripts/formComponent.js";
import {
    generateFetchComponent
} from "./scripts/fetch.js";
import {
    createTable
} from "./scripts/table.js";
import {
    generateGeoencoder
} from "./scripts/geoencoderComponent.js";
import {
    createPage
} from "./scripts/page.js";
//import Cookies from "/node_modules/js-cookie/dist/js.cookie.min.mjs";
import { createPubSub } from "./scripts/pubSub.js";
import { keySelector } from "./utils/keySelector.js";

// Declare & Initialize variables
const pubsub = createPubSub();
const searcher = document.getElementById("search-bar");
const navigator = createNavigator(document.getElementsByName("main")[0]);
const page = createPage(document.getElementsByName("main")[0]);
const loginModalForm = generateModalForm(document.getElementById("loginModalBody"));
const poiCreationModalForm = generateModalForm(document.getElementById("poiCreationModalBody"));
const map = generateMap(document.getElementById("mapContainer"), pubsub);
let homeTable = createTable(document.getElementById("points-table"), pubsub);
const adminTable = createTable(document.getElementById("adminTable"), pubsub);
const cache = generateFetchComponent(pubsub);
const credential = generateFetchComponent(pubsub)
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
homeTable.setListener((event) => {
    const row = event.target.closest("tr");
    if (row && row.id) {
        const cells = Array.from(row.children).map(cell => cell.textContent);
        const href = page.render(id, cells);
        location.href = href;
    }
});

//BUILD
await cache.build("/config.json", "cache");
await cache.setData({
    "flensburg":{
        "KTS": {
            "name": "Kurt-Tucholsky-Schule (KTS)",
            "description": "Kurt-Tucholsky è una scuola superiore a Flensburg. Dal 1993 ha il titolo di “Scuola Europea”. La scuola è stata fondata nel 1973 con una sede temporanea a Husby e pochi anni dopo viene spostata a Flensburg con il moderno edificio in cemento sulla Richard-Wagner-Straße in un ambiente verde. Dopo 17 anni come cosiddetta scuola speciale, è stato solo il cambio di governo nel 1988 e la nuova legge scolastica attuata dal nuovo governo statale SPD nel 1990 che hanno permesso di classificarla come scuola normale . All'inizio dell'anno scolastico 2010/11, la Kurt Tucholsky School è ufficialmente una scuola comunitaria. Nel 1993 gli fu dato il nome Kurt Tucholsky. L'iniziativa venne da Marco Kühnert, all'epoca studente, nel 1990/91. Dopo lunghi dibattiti interni alla scuola, il consiglio scolastico ha deciso di dare il nome contro la volontà dichiarata della direzione scolastica. Il KTS conta attualmente 1192 studenti in 50 classi che sono divise in tre rami scolastici: il ramo scolastico principale (5° - 9° grado), il ramo della scuola secondaria (5° - 10° grado) e il ramo della scuola superiore ( 5°-10° grado). Il KTS offre una gamma molto ampia e diversificata di lingue straniere. È possibile scegliere lo spagnolo come seconda lingua straniera oltre al latino a partire dalla 7a elementare. La maturità della KTS corrisponde a quella di tutte le altre scuole superiori dello Schleswig-Holstein.",
            "adress": "Richard-Wagner-Straße 41, 24943 Flensburg, Germany",
            "lat":"54.78676223754883", 
            "lon":"9.467427253723145",
            "price": "free",
            "imageLink": ["/assets/images/kts.jpg"]
        }
    }
})
poiCreationModalForm.build(poiFormConfig, "poiForm");
loginModalForm.build(loginFormConfig, "loginForm");
map.build([54.78194, 9.43667]); //Flensburg as the default position on the map
homeTable.build("POI's_Table", keySelector(((await cache.getData()).flensburg), ["title", "adress"]));
adminTable.build("AdminTable", (await cache.getData()).flensburg)
await geoEncoder.build("/config.json", "location");
await credential.build("/config.json", "credential");

//RENDER
map.render();
homeTable.render(keySelector(((await cache.getData()).flensburg), ["title", "adress"]));
adminTable.render((await cache.getData()).flensburg);

//FUNCTIONS
setTimeout(() => {
    console.log("Loading Done!");
    document.getElementById("spinner").classList.add("hidden");
    location.href = "#flensburg";
}, 2000);

String.prototype.deleteSpace = function () {
    return this.replaceAll(/\s/g, "");
}

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

poiCreationModalForm.onsubmit(async poiArr => {
    //convert the array returned by the form into a dictionary
    let poiDict = {};
    let labels = Object.keys(poiFormConfig);
    poiArr.forEach((element, index) => {
        poiDict[labels[index]] = poiArr[index];
    });
    if ((poiDict["name"] != undefined || poiDict["name"] != null || poiDict["name"].trim().length > 0) &&
        (poiDict["description"] != undefined || poiDict["description"] != null || poiDict["description"].trim().length > 0) &&
        (poiDict["adress"] != undefined || poiDict["adress"] != null || poiDict["adress"].trim().length > 0) &&
        (poiDict["price"] != undefined || poiDict["price"] != null || poiDict["price"].trim().length > 0) &&
        (poiDict["imageLink"] != undefined || poiDict["imageLink"] != null || poiDict["imageLink"].trim().length > 0)
    ) {

        poiDict.imageLink = poiDict.imageLink.split(" ");
        let poiCoords = await geoEncoder.encode(poiDict.adress);
        poiDict.lat = poiCoords.coords[0];
        poiDict.lon = poiCoords.coords[1];

        try {
            let data = await cache.getData();
            if (!(data.flensburg[(poiDict["name"].deleteSpace())])) {
                data.flensburg[(poiDict["name"].deleteSpace())] = poiDict;
                await cache.setData(data);
                adminTable.render(data.flensburg);
                document.getElementById("close-modal-POI").click();
            } else {
                poiCreationModalForm.setStatus("POI already exists!");
                return;
            }
        } catch (e) {
            console.error(e);
            poiCreationModalForm.setStatus("Cache error, please try again!");
            return;
        }
    } else {
        poiCreationModalForm.setStatus("Some fields is wrong, please try to check all fields and fix the error.");
        return;
    }
});

loginModalForm.onsubmit(async loginResult => {
    try {
        let loginCheck = await credential.login(loginResult[0], loginResult[1]);

        if (loginCheck) {
            if (loginResult[2] === true) {
                Cookies.set("isLogged", "true", {
                    expires: 365
                });
            }
            location.href = "#admin";
            document.getElementById("close-modal-Login").click();
        } else {
            loginModalForm.setStatus("Wrong credentials! Try checking both your username and password");
        }
    } catch (e) {
        console.error(e);
        loginModalForm.setStatus("Cache error, please try again!");
    }
});

//BUTTON CALLBACK
//Login
document.getElementById("modalAdminLogin").onclick = () => {
    if(Cookies.get("isLogged") === "true"){
        location.href = "#admin";
        return;
    }
    document.getElementById("authentication-modal-Login").classList.remove("hidden");
    loginModalForm.render();
}
document.getElementById("close-modal-Login").onclick = () => {
    document.getElementById("authentication-modal-Login").classList.toggle("hidden");
}
//POI
document.getElementById("modalInsertAdminButton").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.remove("hidden");
    poiCreationModalForm.render();
}
document.getElementById("close-modal-POI").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.toggle("hidden");
}

//EVENT LISTENER
searcher.addEventListener("input", (event) => {
    const keyword = event.target.value;
    let filteredData = searchCallback(data, keyword);
    homeTable.render(filteredData);
});