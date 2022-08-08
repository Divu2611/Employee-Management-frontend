import httpService from "./httpService";

const url = "/api/staff/";

export function getStaff(id) {
    return httpService.get(url + id);
}

export function getStaffs() {
    return httpService.get(url);
}

export default {
    getStaff,
    getStaffs
}