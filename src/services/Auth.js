import auth0 from "auth0-js";
import StorageService from "./Storage";

class AuthService {
    auth0 = new auth0.WebAuth({
        domain: "thimpress.auth0.com",
        clientID: "4VFMaCM8gJPFAcLR896lDZChoPTvZ_YC",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://thimpress.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile email"
    });

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((error, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    const data = this.setSession(authResult);//Save to local storage.

                    resolve(data);
                } else if (error) {
                    reject(error);
                }
            });
        });
    }

    setSession(result) {
        let expiresAt = (result.expiresIn * 1000) + new Date().getTime();

        const data = {
            access_token: result.accessToken,
            id_token: result.idToken,
            expiresAt,
            profile: result.idTokenPayload
        };

        StorageService.set('auth', data);

        return data;
    }

    logout() {
        StorageService.remove('auth');
    }

    getAccessToken() {
        const auth = StorageService.get('auth', {});
        const accessToken = auth['access_token'];
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }

    getProfile() {
        let accessToken = this.getAccessToken();

        return new Promise((resolve, reject) => {
            this.auth0.client.userInfo(accessToken, (error, profile) => {
                if (profile) {
                    let auth = StorageService.get('auth', {});
                    auth.profile = profile;
                    StorageService.set('auth', auth);

                    resolve(profile);
                }
                reject(error);
            });
        });
    }
}

export default new AuthService();