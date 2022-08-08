import httpService from "./httpService";

const url = "/api/notice/";

export function saveNotice(notice) {
    return httpService.post(url, notice);
}

export function getNotices() {
    return httpService.get(url);
}

export default {
    saveNotice,
    getNotices
}