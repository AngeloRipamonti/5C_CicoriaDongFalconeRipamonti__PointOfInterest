import { parseConfiguration } from "./jsonParser.js"

export const generateGeoencoder = () => {
    let data = {};
    let config ;
    let configKey ;
    return {
        build: async (pathConfig, keyConfig) => {
            try {
                const c = await parseConfiguration(pathConfig);
                config = c;
                configKey = keyConfig;
            } catch (e) {
                throw e;
            }
        },

        encode: async (value) => {
            try {
                const r = await fetch(((config[configKey].get).replace("$VALUE", value)).replace("$TOKEN", config[configKey].token))
                const json = await r.json();

                if (!json.hasOwnProperty("error")) {
                    //console.log(json) ;
                    data.name = json[0].display_name;
                    data.coords = [json[0].lat, json[0].lon];
                    //console.log(data) ;
                    return data ;
                } else {
                    throw Error(json.error);
                }
            } catch (error) {
                throw error ;
            }
        }
    }
};