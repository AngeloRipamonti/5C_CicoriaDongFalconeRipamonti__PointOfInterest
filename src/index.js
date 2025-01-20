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
    createHomeTable,
    createAdminTable
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
import { v4 as uuidv4 } from '/node_modules/uuid/dist/esm-browser/index.js';

location.href = "#flensburg";
String.prototype.deleteSpace = function () {
    return this.replaceAll(/\s/g, "");
}

// Declare & Initialize variables
const pubsub = createPubSub();
const searcher = document.getElementById("search-bar");
const navigator = createNavigator(document.getElementById("main"));
const page = createPage(document.getElementById("details"));
const loginModalForm = generateModalForm(document.getElementById("loginModalBody"));
const poiCreationModalForm = generateModalForm(document.getElementById("poiCreationModalBody"));
const map = generateMap(document.getElementById("mapContainer"), pubsub);
let homeTable = createHomeTable(document.getElementById("points-table"), pubsub);
const adminTable = createAdminTable(document.getElementById("adminTable"), pubsub);
const cache = generateFetchComponent(pubsub);
const credential = generateFetchComponent(pubsub)
const geoEncoder = generateGeoencoder();
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

//BUILD
await cache.build("/config.json", "cache");
await cache.setData({
    "flensburg": {
        ["Kurt-Tucholsky-Schule (KTS)".deleteSpace()]: {
            "name": "Kurt-Tucholsky-Schule (KTS)",
            "description": "Kurt-Tucholsky is a secondary school in Flensburg. Since 1993 it has had the title of “European School”. The school was founded in 1973 with a temporary location in Husby and a few years later moved to Flensburg with the modern concrete building on Richard-Wagner-Straße in green surroundings. After 17 years as a so-called special school, it was only the change of government in 1988 and the new school law implemented by the new SPD state government in 1990 that allowed it to be classified as a normal school. At the beginning of the 2010/11 school year, Kurt Tucholsky School is officially a community school. In 1993 it was given the name Kurt Tucholsky. The initiative came from Marco Kühnert, a student at the time, in 1990/91. After long internal debates at the school, the school board decided to give the name against the declared will of the school management. The KTS currently has 1192 students in 50 classes that are divided into three school branches: the main school branch (5th - 9th grade), the secondary school branch (5th - 10th grade) and the high school branch (5th - 10th grade). The KTS offers a very wide and diverse range of foreign languages. Spanish can be chosen as a second foreign language in addition to Latin from the 7th grade. The KTS maturity corresponds to that of all other high schools in Schleswig-Holstein.",
            "adress": "Richard-Wagner-Straße 41, 24943 Flensburg, Germany",
            "lat": "54.78676223754883",
            "lon": "9.467427253723145",
            "price": "Free",
            "imageLink": ["/assets/images/kts.jpg"],
            "hash": "detail_f6d5130f-edbc-4f4b-8dd5-fa86abeebb7b"
        },
        ["Hafenspitze".deleteSpace()]: {
            "name": "Hafenspitze",
            "description": "The port of Flensburg is located at the end of the Flensburg Fjord (overlooking the Baltic Sea) and is divided into the west side, the east side and the tip of the port. On the west side of the port is also the historical port, where there is the steamship Alexandra, one of the main symbols of Flensburg where inside there is also a ship museum. The proximity to the water was the economic reason for the founding of Flensburg. For centuries the port remained an important factor in the growth of the city, especially through trade. Initially the tip of the port was located much more towards the south, but due to geological phenomena such as silting, the tip has moved further north. Today, the port is still active with unloading and loading of goods, between Germany and Denmark. In addition to being the center of these commercial activities, the port is also a destination for many tourists, who can stroll along the quays, enjoy the view of the sea and see the cruise ships or eat something typical since the port also has restaurants and bars. In the port there are also different types of ships such as: sailing, classic yachts, steamships and motor ships. The port is connected to the old town of Flensburg, with its cobbled streets, shops, restaurants and historic buildings. Walking along the harbor, you can easily access these picturesque areas, which offer a combination of traditional architecture and local culture.",
            "adress": "Am Kanalschuppen, 24937 Flensburg, Germany",
            "lat": "54.7888678",
            "lon": "9.4373556",
            "price": "Free",
            "imageLink": ["/assets/images/Hafenspitze.jpg"],
            "hash": "detail_76819f7e-9a2b-4ccc-9e20-e4035dd03dc9"
        },
        ["Deutsches Haus venues GmbH".deleteSpace()]: {
            "name": "Deutsches Haus venues GmbH",
            "description": "The Deutsches Haus is a venue in Flensburg for concerts, congresses, trade fairs, balls and exhibitions of all styles. It was built in the 1920s and is now one of the city's cultural monuments. The historic building has been home to the cinema for many years: 51 steps and it has approximately 1,500 m². If necessary, there is also space for events of over 1,000 m². For events in the Great Hall, a maximum of 1,448 guests can be accommodated, 610 of which are on the level. In addition, an additional 150 standing places can be provided. The seats in the stalls can be removed, so that a variety of events can be possible: from standing concerts to receptions and gala events at tables. In addition, three side rooms with individual seating are available to complete the space. In this place there are numerous exhibitions, fairs and events, consequently this place, depending on the time of year and the fairs present at the time of the visit, can be a nice stop to visit. Furthermore, being a generally public place, it is possible to socialize with the locals and listen to concerts, films or even watch handball matches all together.",
            "adress": "Berliner Platz 1, 24937 Flensburg, Germany",
            "lat": "54.780355",
            "lon": "9.4380613",
            "price": "**",
            "imageLink": ["/assets/images/GmbH.jpg"],
            "hash": "detail_05c67a0e-1430-4696-b419-92156947d679"
        },
        ["St. Nikolai Kirche zu Flensburg der Ev.-Luth. St. Nikolai-Kirchengemeinde Flensburg".deleteSpace()]: {
            "name": "St. Nikolai Kirche zu Flensburg der Ev.-Luth. St. Nikolai-Kirchengemeinde Flensburg",
            "description": "St. Nikolai's Church (considered the patron saint of sailors, merchants, children and the hungry) is one of the main churches in Flensburg and is located in the most recent of the four old towns, near the town hall. The church is dedicated to Nikolaus von Myra and its construction began in 1390, then was put on hold and resumed in 1440. It is a church in Gothic style in brick, 52 meters long and 21 meters wide, composed of 3 naves and 7 bays. The bell tower is the tallest in Flensburg and one of the tallest in Schleswig-Holstein. The spire was rebuilt after it was destroyed by lightning in 1878. The church has a double organ, unique in the world for its shape. The church library was founded by Pastor Sebastian Schröder and is located above the south entrance, in its original position. The church is open every day of the week, offering a very wide time slot, making it a great place to visit if you are looking for places related to religion that have a history that goes back several centuries. Also, for those who are unable to visit in person, there is a virtual guide of the church available online.",
            "adress": "Nikolaikirchhof 8, 24937 Flensburg, Germany",
            "lat": "54.783302307128906",
            "lon": "9.435006141662598",
            "price": "40,-/35,-/30,-/25,-/20,-EUR",
            "imageLink": ["/assets/images/Nikolai.jpg"],
            "hash": "detail_4e69f152-3bca-41fb-bd92-0a1c0c77d460"
        },
        ["Museumsberg Flensburg".deleteSpace()]: {
            "name": "Museumsberg Flensburg",
            "description": `The Museumsberg Flensburg is one of the largest museums in the German state Schleswig-Holstein. It was founded in 1876 and was used for exhibitions on the artistic and cultural history of the former Duchy of Schleswig. It consists of two palaces; the northern one has belonged to Denmark since 1920. The exhibition in the “Heinrich Sauermann House” illustrates the history of art and culture from 1500 to 1900. The original farmer’s living rooms and the collection of historical furniture, which numbers more than 900 pieces, is one of the largest of its kind in Germany. The exhibition of the "Hans Christiansen House" shows the art of Schleswig-Holstein from 1900 to 2000. The most important area is that of the Art Nouveau department with the main works of the painter Hans Christiansen, expressionist art thanks to the works of the painters Erich Heckel and Emil Nolde and the sculptor Emil Nolde, and finally contemporary art of the North. Special exhibitions with changing themes complement the permanent collection. We think it is an excellent tourist destination to come into contact with the history of German art of the last 500 years, being able to compare the works of different painters and sculptors. The museum also offers the possibility of learning activities for classes of students of all levels, presenting laboratory activities on the artists whose works are exhibited inside the museum.`,
            "adress": "Museumsberg 1, 24937 Flensburg, Germany",
            "lat": "54.7857506",
            "lon": "9.4317528",
            "price": "8 EUR",
            "imageLink": ["/assets/images/Museumsberg.jpg"],
            "hash": "detail_94c9cd08-13d4-4973-a197-95163b16f9db"
        },
        ["Christiansenpark".deleteSpace()]: {
            "name": "Christiansenpark",
            "description": "Christiansen Park in Flensburg is one of the most picturesque places in the city, where natural beauty and local history come together. Located in the heart of Flensburg, the park is famous for its large gardens, long shaded paths and peaceful atmosphere. One of the most characteristic elements is the central pond, surrounded by a rich fauna that includes centuries-old trees and tamarisks. Here you can observe various animals such as: ducks and swans, making the park an ideal destination for families, nature lovers and those looking for a quiet place. The paths that branch off through the nearby meadows and woods offer various opportunities for walking, jogging or picnicking. The park is named after Christian Christiansen, a local philanthropist who helped to create it, and occasionally hosts cultural events, concerts and markets. Its central location makes it easily accessible, a perfect place to disconnect from the city routine and immerse yourself in the serenity of nature.",
            "adress": "24937 Flensburg, Germany",
            "lat": "54.7851333",
            "lon": "9.4275539",
            "price": "Free",
            "imageLink": ["/assets/images/christiansenpark.jpg"],
            "hash": "detail_0a17f20f-2b6b-46c1-b978-4e0ebb097e7d"
        },
        ["St. Marien Kirche".deleteSpace()]: {
            "name": "St. Marien Kirche",
            "description": "St. Marien Kirche, is the oldest Lutheran-Evangelistic church located near the port of Flensburg. The church is characterized by numerous art treasures and impressive stained glass windows. In the basement, the figures of the apostles Peter and Paul are placed. Peter, on the left, holds in his hand the key to the kingdom of heaven, Paul carries as his attribute the sword, which can be seen as a sign of defense of the faith and also indicates his death by beheading. The main floor is divided into three pictorial fields, with the central field larger than the two sides and the main picture showing the Last Supper based on an engraving by Johann Sadeler. The two side surfaces each contain two medium-sized square pictures arranged one above the other, each of which is surrounded by a frame of 16 small pictures. The upper floor is dominated by the painting of the Adoration of the Shepherds. It is flanked by two statues of women, the one on the left symbolizes hope with an anchor and a bird and the one on the right symbolizes faith with a cross and plaques of commandments. Numerous medieval artifacts dating back to the Gothic era have been preserved inside the church.",
            "adress": "Marienkirchhof 7, 24937 Flensburg, Germany",
            "lat": "54.7896917",
            "lon": "9.4328838",
            "price": "8 EUR",
            "imageLink": ["/assets/images/Marien Kirche.jpg"],
            "hash": "detail_bddd8492-321e-4794-9f23-8b80a93e5820"
        },
        ["Braasch Rum & Rum Manufaktur Museum".deleteSpace()]: {
            "name": "Braasch Rum & Rum Manufaktur Museum",
            "description": `Historic bottles, old stamps, machines, photographs, texts, travel reports: these are all the objects in the museum that already in 2000 started with private exhibitions about the rum of the distiller Walter Braasch. Year after year, the museum gained more popularity until at a certain point it was too small for the growing interest in the history of Flensburg rum. As a result, the Braasch family decided to renovate and expand the museum whose modern architecture blends almost invisibly with the historic walls. In July 2014, the museum was reopened by Walter and Karsten Braasch and since then it has offered an insight into the transatlantic triangular trade, the history of Flensburg rum and the production and manufacture of sugar and rum. The first part of the museum can be accessed through two courtyards, a corridor to the left of the house or directly through the shop. In the 2nd courtyard, a large world map welcomes you outside, which gives you a first overview of the West Indies trade. In the basement you learn how sugar was searched for and how rum was found. Here you can see a real distillery and learn about the "three små øer", the former Danish colonies. You will get an insight into the production of rum and the dark side of the transatlantic triangular trade. Finally, upstairs every 15 minutes we show pictures of a trip to today's US Virgin Islands – the islands of St. John, St. Thomas and St. Croix.`,
            "adress": "Rote Str. 26-28, 24937 Flensburg, Germany",
            "lat": "54.7813982",
            "lon": "9.435514",
            "price": "Free",
            "imageLink": ["/assets/images/rum.jpg"],
            "hash": "detail_52ec1fe5-4e0f-437d-ad91-e5d670c26234"
        },
        ["Alter Kaufmannhof".deleteSpace()]: {
            "name": "Alter Kaufmannhof",
            "description": `Alter Kaufmannhof is a building complex in one of the best preserved 18th-century Flensburg merchant courtyards. All the buildings were built around 1770; the facade was rebuilt at the beginning of the 19th century. The building was home to merchant families. On the north side was the kitchen, additional rooms and storage rooms. On the opposite side were the stables. To the east, the courtyard is surrounded by a warehouse built in 1716 with a passage system and elevator, in which there were further storage rooms and stables. The farm was home to one of the oldest schnapps distilleries in the city: the “Bommerlunder” was produced here for the first time. In 1974, the farm was in a very poor condition and largely unused. The transverse basin near the harbour was showing signs of serious subsidence. Although at the time the building was located outside the first area designated for the redevelopment of the old town of Flensburg, it was nevertheless decided to prepare for the renovation. In Denmark, there is a long and unbroken tradition of renovating old buildings. During the renovation of the Kaufmannshof in 1975-76, 12 apartments and a shop were created. The success of this first renovation of a large merchant farm had a positive effect on the ongoing urban renewal process in Flensburg. Thanks to this history, the Kaufmannshof has remained a landmark to this day, and is still a showcase for urban redevelopment.`,
            "adress": "Norderstraße 86, 24939 Flensburg, Germany",
            "lat": "54.7936867",
            "lon": "9.4315582",
            "price": "Free",
            "imageLink": ["/assets/images/Alter Kaufmannhof.jpg"],
            "hash": "detail_5f92954e-6f3f-42ce-bb23-5980352d16f5"
        },
    }
})
poiCreationModalForm.build(poiFormConfig, "poiForm");
loginModalForm.build(loginFormConfig, "loginForm");

map.build([54.78194, 9.43667]); //Flensburg as the default position on the map

homeTable.build(page);
adminTable.build(cache)

await geoEncoder.build("/config.json", "location");
await credential.build("/config.json", "credential");

//POI actions
document.getElementById("modalInsertAdminButton").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.remove("hidden");
    poiCreationModalForm.render();
}
document.getElementById("close-modal-POI").onclick = () => {
    document.getElementById("authentication-modal-POI").classList.toggle("hidden");
}

//RENDER
map.render();
homeTable.render(keySelector(((await cache.getData()).flensburg), ["name", "adress"]));
adminTable.render(((await cache.getData())));

//FUNCTIONS

let searchCallback = (originalData, pattern) => {
    // Ricostruisce il dizionario basandosi sul pattern
    return Object.keys(originalData).reduce((result, key) => {
        if (((originalData[key].name).toLowerCase()).includes((pattern.toLowerCase()))) {
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
        const hash = uuidv4();
        poiDict.hash = "detail_"+hash;

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
    if (Cookies.get("isLogged") === "true") {
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
//Zoom Map
document.getElementById("flyToMap").onclick = () => {
    const srValue = document.getElementById("search-bar").value;
    if(!srValue || srValue.trim().lenght < 1 || srValue == undefined || srValue == null) return;
    // Nella mappa andare al marker (metodo .flyTo([lat,lon],zoom) da implementare nel map component)
}

//EVENT LISTENER
searcher.addEventListener("input", async (event) => {
    const keyword = event.target.value;
    let filteredData = searchCallback(keySelector(((await cache.getData()).flensburg), ["name", "adress"]), keyword);
    homeTable.renderFiltered(keyword, keySelector(((await cache.getData()).flensburg), ["name", "adress"]));
});