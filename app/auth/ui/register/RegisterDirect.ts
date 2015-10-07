module jm.auth {
    'use strict';

    export class RegisterDirect extends jm.common.BaseModalDirect {

        static NG_NAME: string = 'jmRegister';

        restrict: string = 'A';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector, 'RegisterFormController', 'auth/ui/register/registerForm.tpl.html')
        }
    }
}