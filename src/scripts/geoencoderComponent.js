export const generateGeoencoder = () => {
    let data = {};
    let token;
    let URL;
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
                const r = await fetch(URL.replace("$VALUE", value).replace("$TOKEN", token))
                const json = await r.json();

                if (!json.hasOwnProperty("error")) {
                    data.name = json[0].display_name;
                    data.coords = [json[0].lat, json[0].lon];
                    resolve(data)
                } else {
                    throw Error(json.error);
                }
            } catch (error) {
                throw error ;
            }
        }
    }
};