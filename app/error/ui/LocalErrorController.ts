///<reference path="..\..\common\const\NGConst.ts"/>
///<reference path="..\..\common\const\ErrorConst.ts"/>
///<reference path="..\..\common\ctrl\BaseController.ts"/>
module jm.error.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;
    import ErrorConst = jm.common.ErrorConst;
    import INotificationCode = jm.common.INotificationCode;

    export interface IErrorScope extends ng.IScope {
        errors: string[];
        errorCode: INotificationCode;
    }

    export class LocalErrorController extends jm.common.BaseController implements IErrorListener {

        static $inject = [NGConst.$SCOPE, ErrorIntercept.NG_NAME];
        static NG_NAME = 'LocalErrorController';

        constructor(public $scope: IErrorScope, private errorIntercept: ErrorIntercept) {
            super($scope);

            $scope.$on('$destroy', this.destroy);

            errorIntercept.registerForError(this, this.$scope.errors);
        }

        destroy = () => {
            this.errorIntercept.unregisterForError(this, this.$scope.errors);
        };

        onError(errorCode: string) {
            this.$scope.errorCode = ErrorConst.getCode(errorCode);
        }
    }
}