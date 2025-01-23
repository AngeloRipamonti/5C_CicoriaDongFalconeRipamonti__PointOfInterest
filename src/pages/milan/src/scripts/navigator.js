const hide = (elements) => {
    elements.forEach((element) => {
        element.classList.add("hidden");
    });
}

const show = (element) => {
    element.classList.remove("hidden");
}

export const createNavigator = (parentElement) => {

    const render = () => {
        const pages = Array.from(document.querySelectorAll(".poiPage"));
        const url = new URL(document.location.href);
        const pageName = url.hash.replace("#", "");
        const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
        hide(pages);
        show(document.getElementById("spinner"));
        setTimeout(() => {
            console.log("Loading Done!");
            document.getElementById("spinner").classList.add("hidden");
            show(selected);
        }, 2000);
    }
    window.addEventListener('popstate', render);
    render();
}