import auth0 from "auth0-js";

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: "thimpress.auth0.com",
        clientID: "4VFMaCM8gJPFAcLR896lDZChoPTvZ_YC",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://thimpress.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid"
    });

    login() {
        this.auth0.authorize();
    }
}