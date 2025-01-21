import { keySelector } from "../utils/keySelector.js";
export const createHomeTable = (parentElement, pubsub) => {
    //let pageCreator;
    let data;
    let fetchComponent;
    return {
        render: async function () {
            if (!data) throw new Error("No data to render");
            let listToShow = data;
            let html = `
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="text-lg font-semibold text-left text-gray-900 dark:text-white p-4 sticky top-0"> List of all POI </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                            <tr>
                                <th scope="col" class="px-6 py-3 break-words whitespace-normal p-2">Title</th>
                                <th scope="col" class="px-6 py-3 break-words whitespace-normal p-2">Address</th>
                            </tr>
                        </thead>
                        <tbody>`;

            for (const element in listToShow) {
                html += `<tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4 break-words whitespace-normal p-2"><a href="#`+ listToShow[element].hash + `"
                                        class="text-blue-600 dark:text-blue-400 hover:underline">`+ listToShow[element].name + `</a></td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2">`+ listToShow[element].adress + `</td>
                            </tr>`
            };

            html += `
                        </tbody>
                    </table>
                `;
            parentElement.innerHTML = html;
        },
        renderFiltered: async function (filtered) {
            if (!data) throw new Error("No data to render");
            filtered = filtered === " " ? "Flensburg" : filtered;
            let listToShow = data;

            let html = `
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="text-lg font-semibold text-left text-gray-900 dark:text-white p-4 sticky top-0"> List of all POI </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                            <tr>
                                <th scope="col" class="px-6 py-3 break-words whitespace-normal p-2">Title</th>
                                <th scope="col" class="px-6 py-3 break-words whitespace-normal p-2">Address</th>
                            </tr>
                        </thead>
                        <tbody>`;
            for (const element in listToShow) {
                if (((listToShow[element].name).toLowerCase()).includes((filtered.toLowerCase()))) {
                    html += `<tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4 break-words whitespace-normal p-2"><button id="#`+ listToShow[element].hash + `"
                                        class="text-blue-600 dark:text-blue-400 hover:underline">`+ listToShow[element].name + `</button></td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2">`+ listToShow[element].adress + `</td>
                            </tr>`
                };
            }
            html += `
                    </tbody>
                </table>
            `;
            parentElement.innerHTML = html;
        },
        build: async function (fetchC) {
            //pageCreator = pageC;
            fetchComponent = fetchC;
            data = keySelector(((await fetchComponent.getData()).flensburg), ["name", "adress", "hash"]);
            pubsub.subscribe("changePOI", async () => {
                data = keySelector(((await fetchComponent.getData()).flensburg), ["name", "adress", "hash"]);
                await this.render();
            });
        }

    };
};

export const createAdminTable = (parentElement, pubsub) => {
    let data;
    let fetchComponent;
    return {
        render: async function () {
            if (!data) throw new Error("No data to render");
            let listToShow = data.flensburg;
            let html = `
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption class="sticky top-0"> List of all POI </caption>
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                    <tr>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Title</th>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Description</th>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Address</th>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Coords</th>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Price</th>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Photo</th>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Edit</th>
                                        <th scope="col" class="p-4 break-words whitespace-normal p-2">Remove</th>
                                    </tr>
                                </thead>
                        <tbody>`;
            for (const element in listToShow) {
                html += `<tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4 break-words whitespace-normal p-2">`+ listToShow[element].name + `</td>
                                <td class="px-6 py-4 text-left p-0 break-words whitespace-normal p-2">
                                    <div class="max-h-[150px] overflow-y-auto p-2 text-justify">
                                        `+ listToShow[element].description + `
                                    </div>
                                </td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2">`+ listToShow[element].adress + `</td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2">`+ parseFloat(listToShow[element].lat).toFixed(2) + ", " + parseFloat(listToShow[element].lon).toFixed(2) + `</td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2">`+ listToShow[element].price + `</td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2"><div>`;
                listToShow[element].imageLink.forEach(img => {
                    html += `<img src="` + img + `" class="rounded-lg duration-700 ease-in-out" data-carousel-item>`;
                })
                html += `</div></td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2"><button type="button" id="edit-`+ element + `"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">EDIT</button>
                                </td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2">
                                <button type="button" id="remove-`+ element + `"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                </td>
                            </tr>`
            };

            html += `
                        </tbody>
                    </table>
                `;
            parentElement.innerHTML = html;

            for (const key in listToShow) {
                document.getElementById("remove-" + key).onclick = async () => {
                    delete data.flensburg[key];
                    await fetchComponent.setData(data);
                    pubsub.publish("changePOI");
                }
                document.getElementById("edit-" + key).onclick = () => {
                    pubsub.publish("editPOI", [listToShow, key]);
                    console.log("edit-" + key) ;
                }
            }
        },
        build: async function (fetchC) {
            fetchComponent = fetchC;
            data = (await fetchComponent.getData());
            pubsub.subscribe("changePOI", async () => {
                data = (await fetchComponent.getData());
                await this.render();
            });
        }
    };
};