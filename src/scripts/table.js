import { keySelector } from "../utils/keySelector.js";

export const createTable = (parentElement, pubsub) => {
    let tableTitle;
    let backupData = {};
    let listener;
 
    return {
        build: function (title, bkData) {
            try {
                tableTitle = title;
                backupData = bkData;
                pubsub.subscribe("getData",(data) => {
                    if(listener) { //homeTable
                        this.backupData = keySelector(data.flensburg, ["name", "adress"]);
                        this.render(keySelector(data.flensburg, ["name", "adress"]));
                    }
                    else{ //adminTable
                        backupData = data.flensburg;
                        this.render(data.flensburg);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
        setListener: function (list) {
            listener = list;
        }, 
        render: function (data) {
            //console.log(data);
            let finalHtml = ``;   
            let title = `<caption class="text-lg font-semibold text-left text-gray-900 dark:text-white p-4">` + tableTitle + `</caption>`
 
            // Colonne
            let columns = `
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
                    <tr>
            `;
 
            Object.keys(Object.keys(data).length == 0 ? backupData[Object.keys(backupData)[0]] : data[Object.keys(data)[0]]).forEach(key => {
                columns += `<th scope="col" class="px-6 py-3">` + key + `</th>`;
            });
 
            columns += `
                    </tr>
                </thead>
            `;
 
            let rows = `<tbody id="`+ tableTitle +`">`;
 
            // Righe
            if (Object.keys(data).length != 0) {
                for (const key in data) {
                    rows += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">`;
                    for (const keyj in data[key]) {
                        rows += `<td class="px-6 py-4">` + data[key][keyj] + `</td>`;
                    }
                    rows += `</tr>`;
                }
            } else {
                rows += `
                <tr>
                    <td class="px-6 py-4 text-center" colspan=` + Object.keys(backupData[Object.keys(backupData)[0]]).length + `>
                        No data found
                    </td>
                </tr>
                `;
            }
 
            rows += `</tbody>`;
 
            finalHtml += title + columns + rows;
 
            parentElement.innerHTML = finalHtml;
            
            if(listener){
                document.getElementById(tableTitle).addEventListener("click", async function(event){
                    await listener(event);
                });
            }
        },
    }
}