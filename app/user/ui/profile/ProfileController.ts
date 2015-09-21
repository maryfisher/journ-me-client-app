module jm.user.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export class ProfileController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE];

        constructor(private $scope: ng.IScope) {
            super($scope);
        }
    }

}