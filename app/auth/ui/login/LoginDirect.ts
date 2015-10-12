module jm.auth {
    'use strict';

    export class LoginDirect extends jm.common.BaseModalDirect {

        static NG_NAME: string = 'jmLogin';

        restrict: string = 'A';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'LoginFormController', 'auth/ui/login/loginForm.tpl.html');
        }
    }
}