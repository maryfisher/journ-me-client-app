module jm.moment.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export class BlinkImgController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE];

        constructor(private $scope: IBlinkImgScope) {
            super($scope);
            this.addScopeMethod('deleteImageFile');
            this.addScopeMethod('deleteImage');
        }



        deleteImageFile() {
            this.$scope.imageFile = undefined;
        }

        deleteImage() {
            this.$scope.image = undefined;
        }
    }
}