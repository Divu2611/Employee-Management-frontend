import httpService from "./httpService";

const url = "/api/leave/";

export function getLeaves() {
    return httpService.get(url);
}

export function getLeave(id) {
    return httpService.get(url + id);
}

export default {
    getLeave,
    getLeaves
}