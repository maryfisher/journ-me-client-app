module jm.common {
    export class ServerConst {

        static JOURNEY_ID: string = ':journeyId/';
        static ALIAS_ID: string = ':aliasId/';
        static MOMENT_ID: string = ':momentId/';
        static FEEDBACK_ID: string = ':feedbackId/';
        static BLINK_ID: string = ':blinkId/';

        static API: string = 'api/';
        static USER: string = ServerConst.API + 'user/';
        static AUTH_PATH: string = ServerConst.USER + 'authentication/';
        static LOGIN_PATH: string = ServerConst.AUTH_PATH + 'login/';
        static LOGIN_TOKEN_PATH: string = ServerConst.AUTH_PATH + 'tokenlogin/';
        static LOGOUT_PATH: string = ServerConst.AUTH_PATH + 'logout/';
        static REGISTER_PATH: string = ServerConst.AUTH_PATH + 'register/';

        static ALIAS_PATH: string = ServerConst.API + 'alias/';
        static ALIAS_ID_PATH: string = ServerConst.ALIAS_PATH + ServerConst.ALIAS_ID;

        static JOURNEY_PATH: string = ServerConst.API + 'journey/';
        static JOURNEY_ID_PATH: string = ServerConst.JOURNEY_PATH + ServerConst.JOURNEY_ID;

        static MOMENT_PATH: string = ServerConst.API + 'moment/';
        static MOMENT_ID_PATH: string = ServerConst.MOMENT_PATH + ServerConst.MOMENT_ID;

        static FEEDBACK_PATH: string = ServerConst.API + 'feedback/';
        static FEEDBACK_ID_PATH: string = ServerConst.FEEDBACK_PATH + ServerConst.FEEDBACK_ID;

        static STATE_PATH: string = ServerConst.API + 'state/';

        static BLINK_PATH: string = ServerConst.API + 'blink/';
        static BLINK_ID_PATH: string = ServerConst.BLINK_PATH + ServerConst.BLINK_ID;

        static COOKIE_TOKEN_KEY: string = 'jmAuthToken';

        static DEFAULT_CONFIG = {
            timeout: 60000
        };
    }
}