import httpService from "./httpService";

const url = "/api/faculty/";

export function getFaculty(id) {
    return httpService.get(url + id);
}

export function getFaculties() {
    return httpService.get(url);
}

export default {
    getFaculty,
    getFaculties
}