///<reference path="../../../common/const/NGConst.ts"/>
///<reference path="../../dao/AuthDAO.ts"/>
module jm.auth.ctrl {
    'use strict';

    export class ResetForgottenPasswordController extends jm.common.BaseController {

        static NG_NAME: string = 'ResetForgottenPasswordController';

        static $inject: string[] = [jm.common.NGConst.$SCOPE, jm.auth.AuthDAO.NG_NAME, jm.common.NGConst.$LOCATION_SERVICE];

        constructor(private $scope: ng.IScope,
                    private authService: AuthDAO,
                    private locationService: ng.ILocationService,
                    private submitted: boolean = false) {
            super($scope);
        }

        submit = (newPassword: string): void => {
            var authTokenParam = this.locationService.search();
            this.authService.resetForgottenPassword(newPassword, authTokenParam).then(this.successfulSubmit);
        };

        private successfulSubmit = (): void => {
            this.submitted = true;
        };
    }
}
