import { v4 as uuidv4 } from '/node_modules/uuid/dist/esm-browser/index.js';

export const createPage = (parentElement) => {
    return {
        render: (id, data) => {
            const hash = uuidv4();
            let htmlPage = `<div id="`+ ("detail_" + hash )+`"`;

            parentElement.innerHTML = htmlPage;
            return "detail_" + hash;
        }
    }
}