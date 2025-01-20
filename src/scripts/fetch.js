import { parseConfiguration } from "./jsonParser.js"

export function generateFetchComponent(pubsub) {
    let config;
    let configKey;
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

        setData: async (value) => {
            if (config[configKey].set == undefined || config[configKey].token == undefined || config[configKey].key == undefined) {
                throw Error("config errato");
            }
            try {
                const r = await fetch(config[configKey].set, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": config[configKey].token
                    },
                    body: JSON.stringify({
                        key: config[configKey].key,
                        value: JSON.stringify(value)
                    })
                });
                const data = await r.json();
                return data.result;
            } catch (error) {
                throw error;
            }
        },

        getData: async () => {
            if (config[configKey].get == undefined || config[configKey].token == undefined || config[configKey].key == undefined) {
                throw Error("config errato");
            }
            try {
                const r = await fetch(config[configKey].get, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": config[configKey].token
                    },
                    body: JSON.stringify({
                        key: config[configKey].key
                    })
                });
                const data = await r.json();
                const res = JSON.parse(data.result);
                pubsub.publish("getData", res);
                return res;
            } catch (error) {
                throw error;
            }
        },

        login: async (username, password) => {
            if (config[configKey].login == undefined || config[configKey].token == undefined) {
                throw Error("config errato");
            }
            try {
                const r = await fetch(config[configKey].login, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": config[configKey].token
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });
                const data = await r.json();
                if (data.result === true) {
                    pubsub.publish("login", true);
                    return true;
                }
                else {
                    throw Error("Credenziali Errate");
                }
            } catch (error) {
                throw error;
            }
        },
        register: async (username, password) => {
            if (config[configKey].register == undefined || config[configKey].token == undefined) {
                throw Error("config errato");
            }
            try {
                const r = await fetch(config[configKey].register, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": config[configKey].token
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });
                const data = await r.json();
                return data;
            } catch (error) {
                throw error;
            }
        }
    };
}