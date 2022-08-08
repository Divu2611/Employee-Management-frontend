import httpService from "./httpService";

const url = "/api/department/";

export function getDepartments() {
    return httpService.get(url);
}

export function getDepartment(id) {
    return httpService.get(url + id);
}

export default {
    getDepartment,
    getDepartments
}