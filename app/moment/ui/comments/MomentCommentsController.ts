module jm.moment.ctrl {

    import NGConst = jm.common.NGConst;

    export class MomentCommentsController extends jm.common.BaseController {
        static $inject = [NGConst.$SCOPE];

        constructor(private $scope: IMomentDetailScope) {
            super($scope);
        }
    }
}