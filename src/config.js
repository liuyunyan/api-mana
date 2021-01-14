
let mockServer = "http://39.105.90.208:3000/"
let serverUrl = `${mockServer}mock/6`;

const Config = {
serverUrl,
source: {
        query: `${serverUrl}/datasource/list`,
        add: `${serverUrl}/datasource/add`,
        queryDetail: `${serverUrl}/datasource/`,
        update: `${serverUrl}/datasource`,
        delete: `${serverUrl}/datasource/`,
        connection: `${serverUrl}/datasource/connection`,
    },
};
export default Config;