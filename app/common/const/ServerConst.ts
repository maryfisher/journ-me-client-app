module jm.common {
    export class ServerConst {

        static API: string = 'api/';
        static IMG: string = 'image/';
        static THUMB: string = '/thumbnail';

        static USER: string = ServerConst.API + 'user/';

        static AUTH_PATH: string = ServerConst.USER + 'authentication/';
        static LOGIN_PATH: string = ServerConst.AUTH_PATH + 'login/';
        static LOGIN_TOKEN_PATH: string = ServerConst.AUTH_PATH + 'tokenlogin/';
        static LOGOUT_PATH: string = ServerConst.AUTH_PATH + 'logout/';
        static REGISTER_PATH: string = ServerConst.AUTH_PATH + 'register/';
        static PROFILE_PATH: string = ServerConst.USER + 'profile/';

        static ALIAS_PATH: string = ServerConst.API + 'alias/';
        static ALIAS_IMG_PATH: string = ServerConst.ALIAS_PATH + ServerConst.IMG;

        static JOURNEY_PATH: string = ServerConst.API + 'journey/';

        static MOMENT_PATH: string = ServerConst.API + 'moment/';

        static FEEDBACK_PATH: string = ServerConst.API + 'feedback/';

        static STATE_PATH: string = ServerConst.API + 'state/';

        static BLINK_PATH: string = ServerConst.API + 'blink/';
        static BLINK_IMG_PATH: string = ServerConst.BLINK_PATH + ServerConst.IMG;

        static COOKIE_TOKEN_KEY: string = 'jmAuthToken';

        static DEFAULT_CONFIG = {
            timeout: 60000
        };
    }
}