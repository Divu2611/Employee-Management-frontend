import httpService from "./httpService";

const url = "/api/record/";

export function saveRecord(record) {

    if (record._id) {
        const body = { ...record };
        delete body._id;
        return httpService.put(url + record._id, body);
    }
    return httpService.post(url, record);
}

export function getRecords() {
    return httpService.get(url);
}

export default {
    saveRecord,
    getRecords
}