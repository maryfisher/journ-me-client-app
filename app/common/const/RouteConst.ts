///<reference path="ServerConst.ts"/>
module jm.common {
    export class RouteConst {

        private static userPath: string = '/user';
        private static aliasPath: string = '/alias';
        private static aliasId: string = RouteConst.aliasPath + '/:aliasId';
        private static journeyPath: string = '/journey';
        private static journeyId: string = RouteConst.journeyPath + '/:journeyId';
        private static momentPath: string = '/moment';
        private static momentId: string = '/:momentId';
        private static notebookPath: string = '/notebook';
        private static notebookId: string = '/:notebookId';

        static HOME: string = 'HOME';
        static HOME_PATH: string = '/home';
        static BROWSE: string = 'BROWSE';
        static BROWSE_PATH: string = '/browse?search';
        static FORGOT_PASSWORD: string = 'FORGOT_PASSWORD';
        static FORGOT_PASSWORD_PATH: string = '/forgot-password';
        static RESET_FORGOTTEN_PASSWORD: string = 'RESET_FORGOTTEN_PASSWORD';
        static RESET_FORGOTTEN_PASSWORD_PATH: string = '/reset-forgotten-password?' + ServerConst.SERVER_TOKEN_KEY;

        static JOURNEY_PATH: string = RouteConst.journeyPath;
        static JOURNEY_DETAIL: string = 'JOURNEY_DETAIL';
        static JOURNEY_DETAIL_PATH: string = RouteConst.journeyId;

        static MOMENT_DETAIL: string = 'MOMENT_DETAIL';
        static MOMENT_DETAIL_PATH: string = RouteConst.momentPath;
        static MOMENT_EDIT: string = 'MOMENT_EDIT';
        static MOMENT_EDIT_PATH: string = RouteConst.journeyId + RouteConst.momentPath + '/edit' + RouteConst.momentId;

        static MOMENT_BLINKS: string = 'MOMENT_BLINKS';
        static MOMENT_BLINKS_PATH: string = RouteConst.momentId;
        static MOMENT_FEEDBACK: string = 'MOMENT_FEEDBACK';
        static MOMENT_FEEDBACK_PATH: string = RouteConst.momentId + '/feedback';
        static MOMENT_STATS: string = 'MOMENT_STATS';
        static MOMENT_STATS_PATH: string = RouteConst.momentId + '/stats';
        static MOMENT_LINKS: string = 'MOMENT_LINKS';
        static MOMENT_LINKS_PATH: string = RouteConst.momentId + '/links';

        static NOTEBOOKS: string = 'NOTEBOOKS';
        static NOTEBOOKS_PATH: string = RouteConst.notebookPath;

        static NOTEBOOK_DETAIL: string = 'NOTEBOOK_DETAIL';
        static NOTEBOOK_DETAIL_PATH: string = RouteConst.notebookPath + RouteConst.notebookId;

        static USER_PATH: string = RouteConst.userPath;
        static PROFILE: string = 'PROFILE';
        static PROFILE_PATH: string = RouteConst.userPath + '/profile';
        static ALIAS_UPDATE: string = 'ALIAS_UPDATE';
        static ALIAS_UPDATE_PATH: string = '/alias';
        static SETTINGS: string = 'SETTINGS';
        static SETTINGS_PATH: string = '/settings';

        static ALIAS_PATH: string = RouteConst.aliasPath;
        static ALIAS_DETAIL: string = 'ALIAS_DETAIL';
        static ALIAS_DETAIL_PATH: string = RouteConst.aliasId;
        static DASHBOARD: string = 'DASHBOARD';
        static DASHBOARD_PATH: string = RouteConst.aliasId + '/dashboard';

    }
}