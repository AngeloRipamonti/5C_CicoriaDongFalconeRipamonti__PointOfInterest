export const createPage = (parentElement, pubsub) => {
    const TEMPLATE_PHOTOGALLERY = `<div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="%URL" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="%ALT">
        </div>`

    //nella table manca ```html come classe
    const TEMPLATE = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
        <div class="flex justify-center">



            <div id="gallery" class="relative w-full" data-carousel="slide">
                <!-- Carousel wrapper -->
                <div id="photogallery%ID_PHOTOGALLERY" class="relative h-56 overflow-hidden rounded-lg md:h-96">
                %PHOTOGALLERY_CONTENT
                </div>
                <!-- Slider controls -->
                <button type="button"
                    class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev>
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button"
                    class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next>
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>

            
    </div>

    <div class="flex-1">
        <table class="border-collapse border border-slate-400 w-full
    table-fixed">
            <thead>
                <tr>
                    <th class="border border-slate-300 p-3 bg-slate-100 text-left font-semibold text-sm">
                        <h2>Title POI</h2>
                    </th>
                    <th class="border border-slate-300 p-3 bg-slate-100 text-left font-semibold text-sm">
                        <h2>Address</h2>
                    </th>
                    <th class="border border-slate-300 p-3 bg-slate-100 text-left font-semibold text-sm">
                        <h2>Coordinates</h2>
                    </th>
                    <th class="border border-slate-300 p-3 bg-slate-100 text-left font-semibold text-sm">
                        <h2>Price</h2>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border border-slate-300 p-3">
                        %POI_TITLE (KTS)
                    </td>
                    <td class="border border-slate-300 p-3">
                        %ADRESS
                    </td>
                    <td class="border border-slate-300 p-3">
                        %POI_LATITUDE, %POI_LONGITUDE
                    </td>
                    <td class="border border-slate-300 p-3">
                        %POI_PRICE
                    </td>
                </tr>
                <tr>
                    <th class="border border-slate-300 p-3 bg-slate-100" colspan="4">
                        <h2>Description</h2>
                    </th>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-3" colspan="4">
                        %POI_DESCRIPTION
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>` ;
    let poiData;
    let pageID;

    return {
        build: function (id, poiDict) {
            poiData = poiDict;
            pageID = id;
            pubsub.subscribe("getData", async (data) => {
                for(const key in data.milan){
                    poiData = data.milan[key];
                    pageID = poiData.hash;
                    await this.render();
                }
            })
        },
        render: async function () {
            let htmlPage = `<article class="mt-16 poiPage hidden" id="` + pageID + `">`;

            htmlPage += TEMPLATE.replace("%PHOTO_TITLE", poiData.name);
            let imgsHtml = "";
            poiData.imageLink.forEach((element) => {
                imgsHtml += TEMPLATE_PHOTOGALLERY.replace("%URL", element);
                imgsHtml = imgsHtml.replace("%ALT", poiData.name);
            });
            htmlPage = htmlPage.replace("%ID", pageID);
            htmlPage = htmlPage.replace("%ID_PHOTOGALLERY", pageID);
            htmlPage = htmlPage.replace("%PHOTOGALLERY_CONTENT", imgsHtml);
            htmlPage = htmlPage.replace("%POI_TITLE", poiData.name);
            htmlPage = htmlPage.replace("%ADRESS", poiData.adress);
            htmlPage = htmlPage.replace("%POI_LATITUDE", poiData.lat);
            htmlPage = htmlPage.replace("%POI_LONGITUDE", poiData.lon);
            htmlPage = htmlPage.replace("%POI_PRICE", poiData.price);
            htmlPage = htmlPage.replace("%POI_DESCRIPTION", poiData.description);
            htmlPage += `</article>`

            parentElement.innerHTML += htmlPage;
            return pageID;
        }
    }
}