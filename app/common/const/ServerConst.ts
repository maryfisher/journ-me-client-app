module jm {
    export module common {
        export class ServerConst {

            static API: string = 'api/';
            static USER: string = ServerConst.API + 'user/';
            static AUTH_PATH: string = ServerConst.USER + 'authentication/';
            static LOGIN_PATH: string = ServerConst.AUTH_PATH + 'login/';
            static LOGIN_TOKEN_PATH: string = ServerConst.AUTH_PATH + 'tokenlogin/';
            static LOGOUT_PATH: string = ServerConst.AUTH_PATH + 'logout/';
            static REGISTER_PATH: string = ServerConst.AUTH_PATH + 'register/';

            static COOKIE_TOKEN_KEY: string = 'jmAuthToken';
            static DEFAULT_CONFIG = {
                timeout: 60000
            };
        }
    }
}