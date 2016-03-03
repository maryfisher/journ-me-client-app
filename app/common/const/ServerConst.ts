module jm.common {
    export class ServerConst {

        static API: string = 'api/';
        static IMG: string = 'image/';
        static THUMB: string = '/thumbnail';

        static STATS_PATH: string = ServerConst.API + 'stats/';

        static USER: string = ServerConst.API + 'user/';

        static AUTH_PATH: string = ServerConst.USER + 'authentication/';
        static LOGIN_PATH: string = ServerConst.AUTH_PATH + 'login/';
        static LOGIN_TOKEN_PATH: string = ServerConst.AUTH_PATH + 'token-login/';
        static LOGOUT_PATH: string = ServerConst.AUTH_PATH + 'logout/';
        static REGISTER_PATH: string = ServerConst.AUTH_PATH + 'register/';
        static PROFILE_PATH: string = ServerConst.USER + 'profile/';
        static FORGOT_PASSWORD_PATH: string = ServerConst.AUTH_PATH + 'forgot-password/';
        static RESET_FORGOTTEN_PASSWORD_PATH: string = ServerConst.AUTH_PATH + 'reset-forgotten-password/';

        static ALIAS_PATH: string = ServerConst.API + 'alias/';
        static ALIAS_IMG_PATH: string = ServerConst.ALIAS_PATH + ServerConst.IMG;
        static DASHBOARD_PATH: string = ServerConst.ALIAS_PATH + 'dashboard/';

        static JOURNEY_PATH: string = ServerConst.API + 'journey/';
        static JOURNEY_SEARCH_PATH: string = ServerConst.JOURNEY_PATH + 'search';
        static JOURNEY_TOPIC_PATH: string = ServerConst.JOURNEY_PATH + 'topic';
        static JOURNEY_TOPIC_TAG_PATH: string = ServerConst.JOURNEY_TOPIC_PATH + '/tag';

        static MOMENT_PATH: string = ServerConst.API + 'moment/';
        static MOMENT_SEARCH_PATH: string = ServerConst.MOMENT_PATH + 'search';
        static MOMENT_IMG_PATH: string = ServerConst.MOMENT_PATH + ServerConst.IMG;

        static FEEDBACK_PATH: string = ServerConst.API + 'feedback/';

        static STATE_PATH: string = ServerConst.API + 'state/';

        static BLINK_PATH: string = ServerConst.API + 'blink/';
        static BLINK_IMG_PATH: string = ServerConst.BLINK_PATH + ServerConst.IMG;

        static NOTE_PATH: string = ServerConst.API + 'note/';
        static NOTE_IMG_PATH: string = ServerConst.NOTE_PATH + ServerConst.IMG;

        static HEADER_ITEMS: string = 'headerItems';
        static SERVER_TOKEN_KEY: string = 'x-jm-auth-token';
        static COOKIE_TOKEN_KEY: string = 'jmAuthToken';

        static DEFAULT_CONFIG = {
            timeout: 60000
        };
    }
}