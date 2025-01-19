export const createTable = (parentElement) => {
    let tableTitle;
    let backupData = [];
 
    return {
        build: (title, bkData) => {
            try {
                tableTitle = title;
                backupData = bkData;
            } catch (error) {
                console.log(error);
            }
        },
 
        render: (data) => {
            let finalHtml = ``;   
            let title = `<caption class="text-lg font-semibold text-left text-gray-900 dark:text-white p-4">` + tableTitle + `</caption>`
 
            // Colonne
            let columns = `
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
                    <tr>
            `;
 
            Object.keys(data.length == 0 ? backupData[0] : data[0]).forEach(key => {
                columns += `<th scope="col" class="px-6 py-3">` + key + `</th>`;
            }) 
 
            columns += `
                    </tr>
                </thead>
            `;
 
            let rows = `<tbody>`;
 
            // Righe
            if (data.length != 0) {
                data.forEach(element => {
                    rows += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">`;
                    for (const key in element) {
                        rows += `<td class="px-6 py-4">` + element[key] + `</td>`;
                    }
                    rows += `</tr>`;
                })
            } else {
                rows += `
                <tr>
                    <td class="px-6 py-4 text-center">
                        No data found
                    </td>
                </tr>
                `;
            }
 
            rows += `</tbody>`;
 
            finalHtml += title + columns + rows;
 
            parentElement.innerHTML = finalHtml;
        },
    }
}