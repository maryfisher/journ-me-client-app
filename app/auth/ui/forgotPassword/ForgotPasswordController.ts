///<reference path="../../../common/const/NGConst.ts"/>
///<reference path="../../dao/AuthDAO.ts"/>
module jm.auth.ctrl {
    'use strict';

    export class ForgotPasswordController extends jm.common.BaseController {

        static NG_NAME: string = 'ForgotPasswordController';

        static $inject: string[] = [jm.common.NGConst.$SCOPE, jm.auth.AuthDAO.NG_NAME];

        constructor(private $scope: ng.IScope,
                    private authService: AuthDAO,
                    private submitted: boolean = false) {
            super($scope);
        }

        submit = (email: string): void => {
            this.authService.forgotPassword(email).then(this.successfulSubmit);
        };

        private successfulSubmit = (): void => {
            this.submitted = true;
        };
    }
}
