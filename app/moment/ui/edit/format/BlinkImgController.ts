module jm.moment.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export class BlinkImgController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE];

        constructor(private $scope: IBlinkFormElementScope) {
            super($scope);
            this.addScopeMethod('deleteImageFile');
            this.addScopeMethod('deleteImage');
        }

        deleteImageFile() {
            this.$scope.formBlink.imageFiles[this.$scope.id] = undefined;
        }

        deleteImage() {
            this.$scope.formBlink.blink.images[this.$scope.id] = undefined;
        }
    }
}