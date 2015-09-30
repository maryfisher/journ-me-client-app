module jm.common {
    export class RouteConst {

        private static userPath: string = '/user';
        private static aliasPath: string = '/alias';
        private static aliasId: string = RouteConst.aliasPath + '/:aliasId';
        private static journeyPath: string = '/journey';
        private static journeyId: string = RouteConst.journeyPath + '/:journeyId';
        private static momentPath: string = '/moment';
        private static momentId: string = RouteConst.momentPath + '/:momentId';

        static HOME: string = 'HOME';
        static HOME_PATH: string = '/home';
        static BROWSE: string = 'BROWSE';
        static BROWSE_PATH: string = '/browse';

        static JOURNEY_PATH: string = RouteConst.journeyPath;
        static JOURNEY_DETAIL: string = 'JOURNEY_DETAIL';
        static JOURNEY_DETAIL_PATH: string = RouteConst.journeyId;

        static MOMENT_DETAIL: string = 'MOMENT_DETAIL';
        static MOMENT_DETAIL_PATH: string = RouteConst.momentId;
        /*static MOMENT_UPDATE: string = 'MOMENT_UPDATE';
        //this is the wrong way round to match MOMENT_CREATE
        static MOMENT_UPDATE_PATH: string = RouteConst.momentId + '/update' + RouteConst.journeyId;
        static MOMENT_CREATE: string = 'MOMENT_CREATE';
        //this is the wrong way round for now so ui.router does not get confused (bug??)
        static MOMENT_CREATE_PATH: string = RouteConst.momentPath + '/create' + RouteConst.journeyId; */
        static MOMENT_EDIT: string = 'MOMENT_EDIT';
        static MOMENT_EDIT_PATH: string = RouteConst.journeyId + RouteConst.momentPath + '/edit/:momentId';

        static MOMENT_BLINKS: string = 'MOMENT_BLINKS';
        static MOMENT_BLINKS_PATH: string = '';
        static MOMENT_EMPATHIES: string = 'MOMENT_EMPATHIES';
        static MOMENT_EMPATHIES_PATH: string = '/empathies';
        static MOMENT_STATS: string = 'MOMENT_STATS';
        static MOMENT_STATS_PATH: string = '/stats';
        static MOMENT_LINKS: string = 'MOMENT_LINKS';
        static MOMENT_LINKS_PATH: string = '/links';


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