module jm.moment.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export class BlinkFormatController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE];

        private elements: ng.IAugmentedJQuery[] = [];

        constructor(private $scope: IBlinkFormatScope) {
            super($scope);
            $scope.maxRange = 98;
            _.bindAll(this, 'onRatioChange');
            $scope.$watch('ratio', this.onRatioChange);
        }

        addElement(element: ng.IAugmentedJQuery, scope: IBlinkFormElementScope) {
            this.elements[scope.order] = element;
            scope.blink = this.$scope.blink;
            this.$scope.blink.ratio = this.$scope.maxRange / this.elements.length;
        }

        onRatioChange(){
            if(this.elements.length <= 1){
                return;
            }
            this.elements[0].css('width', this.$scope.blink.ratio.toString() + '%');
            this.elements[1].css('width', (this.$scope.maxRange - this.$scope.blink.ratio).toString() + '%');
        }
    }
}