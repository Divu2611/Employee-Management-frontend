import httpService from "./httpService";

const url = "/send_mail/";

export async function sendMail(mail) {
    return httpService.post(url, mail);
}

export default {
    sendMail
}