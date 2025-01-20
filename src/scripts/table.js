export const createTable = (parentElement) => {
    let tableTitle;
    let backupData = {};
    let listener;
    let adminState;
 
    return {
        build: (title, bkData, admin) => {
            try {
                tableTitle = title;
                backupData = bkData;
                adminState = admin;
            } catch (error) {
                console.log(error);
            }
        },
        setListener: (list)=> {
            listener = list;
        }, 

        render: (data) => {
            let finalHtml = ``;   
            let orderedData = {};
            let title = `<caption class="text-lg font-semibold text-left text-gray-900 dark:text-white p-4">` + tableTitle + `</caption>`

            // Colonne
            let columns = `
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
                    <tr>
            `;
 
            Object.keys(Object.keys(data).length == 0 ? backupData[Object.keys(backupData)[0]] : data[Object.keys(data)[0]]).forEach(key => {
                columns += `<th scope="col" class="px-6 py-3">` + key + `</th>`;
            });

            // Colonna admin
            if (adminState) {
                columns += `<th scope="col" class="px-6 py-3"> Edit </th>`;
                columns += `<th scope="col" class="px-6 py-3"> Delete </th>`;
            }
 
            columns += `
                    </tr>
                </thead>
            `;
 
            let rows = `<tbody id="`+ tableTitle +`">`;

            for (const key in data) {
                if (key in data) {
                    let orderedSubbase = {};
                    for (const keyz in backupData[Object.keys(backupData)[0]]) {
                        orderedSubbase[keyz] = data[key][keyz];
                    }
                    orderedData[key] = orderedSubbase;
                }
            }

 
            // Righe
            if (Object.keys(data).length != 0) {
                for (const key in orderedData) {
                    rows += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">`;
                    for (const keyj in orderedData[key]) {
                        rows += `<td class="px-6 py-4">` + orderedData[key][keyj] + `</td>`;
                    }

                    // Righe admin
                    if (adminState) {
                        rows += `
                            <td class="px-6 py-4"> 
                                <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Edit</button>
                            </td>
                        `;
                        rows += `
                            <td class="px-6 py-4">  
                                <button type="button" id="delete_` + key + `"` + ` class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                            </td>
                        `;
                    }

                    rows += `</tr>`;
                }
            } else {
                rows += `
                <tr>
                    <td class="px-6 py-4 text-center" colspan=` + (Object.keys(backupData[Object.keys(backupData)[0]]).length + (admin ? 2 : 0)) + `>
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