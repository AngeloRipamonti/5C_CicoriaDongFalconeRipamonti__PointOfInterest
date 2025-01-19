export const generateModalForm = (parentElement) => {
    let configuration;
    let submitCallback, cancelCallback;
    let idForm;

    return {
        build: (inputConfiguration, inputIdForm) => {
            configuration = inputConfiguration;
            idForm = inputIdForm ;
        },
        onsubmit: (inputCallback) => {
            submitCallback = inputCallback;
        },
        oncancel: (inputCallback) => {
            cancelCallback = inputCallback;
        },
        render: () => {
            /*
            *Output*
            const loginFormOutput = {
                "username": "falconeandrea",
                "password": "test1234",
                "remember-me": "true",
                "loginSubmit" : "button"
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

            //Creazione del Form
            let html = '<form id="form' + idForm + '" class="space-y-4">';

            let labels = Object.keys(configuration) ;
            //let values = Object.values(configuration) ;

            labels.forEach(e => {
                html += '<div><label for="' + e +'" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">' + e + '</label>'
                + '<input type="' + configuration[e][0] + '" name="' + e + '" id="' + e + '" class="' + configuration[e][1] + '"></div>'
            });

            html += '<button type="button" id="submitButton' + idForm + '" class=" w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">Submit</button></form>'
            html += '<div id="errorDiv' + idForm + '"></div>' ;

            parentElement.innerHTML = html;
            console.log(html);

            //Creazione del Bottone
            //const submitButton = document.querySelector(values[values.length - 1]) ;
            const submitButton = document.getElementById("submitButton" + idForm) ;

            submitButton.onclick = () => {
                let result = labels.map((name) => {
                    return document.getElementById(name).value;
                })

                submitCallback(result) ;
            }
            /*
            document.querySelectorAll(".clearForm").forEach(b => { // per i pulsanti che svuotano i campi del form
                b.onclick = () => {
                    document.querySelectorAll(".form-control").forEach(e => e.value = "");
                    document.querySelector("#hourInput").value = configuration[0];
                    document.getElementById("resultLabel").innerText = "";

                    cancelCallback();
                }
            });*/
        },
        setStatus: (text) => {
            document.getElementById("errorDiv" + idForm).innerText = text;
        },
        setType: (inputType) => {
            type = inputType;
        },
        clear: () => {
            document.querySelectorAll(".form-control").forEach(e => e.value = "");
            document.querySelector("#hourInput").value = configuration[0];
        }
    };
};