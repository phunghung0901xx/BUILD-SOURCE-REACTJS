import Request from "./request";

export default class LoginService {
    static async getDetailByUrl() {
        return new Promise((resolve) => {
            Request.send({
                method: "POST",
                path: "/Stations/getDetailByUrl",
                data: {
                    stationsUrl: window.origin.split('://')[1],
                },
            }).then((result = {}) => {
                const { statusCode , data }:any = result;
                if (statusCode === 200) {
                    return resolve(data);
                } else {
                    return resolve({});
                }
            });
        });
    }
}