export function keySelector(dict, keys) {
    const newDict = {};
    for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
            newDict[key] = {};
            for (const k in dict[key]) {
                if (dict[key].hasOwnProperty(k) && keys.includes(k)) {
                    newDict[key][k] = dict[key][k];
                }
            }
        }
    }
    return newDict;
}