
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
    third: {
        query: `${serverUrl}/thirdPartyPlatform/list`,
        add: `${serverUrl}/thirdPartyPlatform/add`,
        queryDetail: `${serverUrl}/thirdPartyPlatform/`,
        update: `${serverUrl}/thirdPartyPlatform`,
        delete: `${serverUrl}/thirdPartyPlatform/`,
        generateAPIKey: `${serverUrl}/thirdPartyPlatform/generateAPIKey`,
    },
    user: {
        login:`${serverUrl}/user/login`,
        query: `${serverUrl}/user/list`,
        add: `${serverUrl}/user/add`,
        queryDetail: `${serverUrl}/user/`,
        update: `${serverUrl}/user`,
        delete: `${serverUrl}/user/`,
        connection: `${serverUrl}/user/connection`,
    },
    interface: {
        query: `${serverUrl}/external/interface/list`,
        add: `${serverUrl}/external/interface/add`,
        queryDetail: `${serverUrl}/external/interface/`,
        update: `${serverUrl}/external/interface`,
        delete: `${serverUrl}/external/interface/`,
        queryDBs: `${serverUrl}/external/listDatabases/`,
        queryDBTables: `${serverUrl}/external/listTables/`,
        queryDBFileds: `${serverUrl}/external/getTableSchema/`,
        publish: `${serverUrl}external/interface/publish/`,
    },
};
export default Config;