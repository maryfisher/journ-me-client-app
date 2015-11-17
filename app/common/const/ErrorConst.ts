module jm.common {

    export interface INotificationLevel {
        tag: string;
        severity: number;
    }

    export interface INotificationCode {
        recoverable: boolean;
        level: INotificationLevel;
        text: string;
    }

    export class ErrorConst {

        private static INFO: INotificationLevel = {
            tag: 'info',
            severity: 1
        };

        private static WARN: INotificationLevel = {
            tag: 'warning',
            severity: 2
        };
        private static ERROR: INotificationLevel = {
            tag: 'danger',
            severity: 3
        };

        static CLIENT_SERVER_PROBLEM = '110';
        static INTERNAL_SYSTEM_PROBLEM = '120';
        static UPSTREAM_SYSTEM_PROBLEM = '130';
        static POOL_EXHAUSTED = '140';
        static CODE_100: INotificationCode = {
            recoverable: true,
            level: ErrorConst.ERROR,
            text: 'We\'re experiencing some overload at the moment. Please try again later.'
        };

        static AUTHENTICATION_FAILED: string = '210';
        private static CODE_210: INotificationCode = {
            recoverable: true,
            level: ErrorConst.ERROR,
            text: 'Your email or password must be wrong. ;_;'
        };
        static AUTH_TOKEN_INVALID: string = '220';
        private static CODE_220: INotificationCode = {
            recoverable: true,
            level: ErrorConst.ERROR,
            text: ''
        };
        static EMAIL_TAKEN: string = '320';
        private static CODE_320: INotificationCode = {
            recoverable: true,
            level: ErrorConst.ERROR,
            text: 'There already exists an account with this email. :('
        };

        static getCode(code: string): INotificationCode {
            switch (code) {
                case '110':
                case '120':
                case '130':
                case '140':
                    return ErrorConst.CODE_100;
                default:
                    return ErrorConst['CODE_' + code];
            }

        }
    }
}