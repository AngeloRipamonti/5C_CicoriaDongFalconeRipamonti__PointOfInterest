export const parseConfiguration = (async (path) => {
    try{
        const response = await fetch(path);
        const json = await response.json();
        return json;
    } catch(error){
        throw error;
    }
});