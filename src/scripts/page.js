export const createPage = (parentElement, pubsub) => {
    let fetchComponent;
    let data;
    const TEMPLATE_PHOTOGALLERY = `<div>
            <img class="h-auto max-w-full rounded-lg" src="%URL" alt="">
        </div>` ;

    //nella table manca ```html come classe
    const TEMPLATE = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
        <div class="flex justify-center">

        
            <div id="gallery" class="relative w-full" data-carousel="slide">
                <!-- Carousel wrapper -->
                <div id="photogallery_%ID_PHOTOGALLERY" class="grid grid-cols-2 gap-2">
                    %PHOTOGALLERY_CONTENT
                </div>
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


    function render(poiData) {
        let htmlPage = `<article class="mt-16 poiPage hidden" id="` + poiData.hash + `">`;

        htmlPage += TEMPLATE.replace("%PHOTO_TITLE", poiData.name);
        let imgsHtml = "";
        poiData.imageLink.forEach((element) => {
            imgsHtml += TEMPLATE_PHOTOGALLERY.replace("%URL", element);
            imgsHtml = imgsHtml.replace("%ALT", poiData.name);
        });
        htmlPage = htmlPage.replace("%ID_PHOTOGALLERY", poiData.hash);
        htmlPage = htmlPage.replace("%PHOTOGALLERY_CONTENT", imgsHtml);
        htmlPage = htmlPage.replace("%POI_TITLE", poiData.name);
        htmlPage = htmlPage.replace("%ADRESS", poiData.adress);
        htmlPage = htmlPage.replace("%POI_LATITUDE", poiData.lat);
        htmlPage = htmlPage.replace("%POI_LONGITUDE", poiData.lon);
        htmlPage = htmlPage.replace("%POI_PRICE", poiData.price);
        htmlPage = htmlPage.replace("%POI_DESCRIPTION", poiData.description);
        htmlPage += `</article>`

        parentElement.innerHTML += htmlPage;
    }


    return {
        build: async function (fetchC) {
            fetchComponent = fetchC;
            data = (await fetchComponent.getData()).flensburg
            parentElement.innerHTML = "";
            for(const key in data){
                render(data[key])
            }
            pubsub.subscribe("changePOI", async () => {
                data = (await fetchComponent.getData()).flensburg
                parentElement.innerHTML = "";
                for(const key in data){
                    render(data[key])
                }
            })
        }
    }
}