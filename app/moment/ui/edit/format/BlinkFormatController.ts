module jm.moment.ctrl {
    'use strict';

    import NGConst = jm.common.NGConst;

    export class BlinkFormatController extends jm.common.BaseController {

        static $inject = [NGConst.$SCOPE];

        private elements: ng.IAugmentedJQuery[] = [];

        constructor(private $scope: IBlinkFormatScope) {
            super($scope);
            $scope.ratio = 49;
            $scope.maxRange = 98;
            _.bindAll(this, 'onRatioChange');
            $scope.$watch('ratio', this.onRatioChange);
        }

        addElement(element: ng.IAugmentedJQuery, order: number) {
            element.css('width', this.$scope.ratio.toString() + '%');
            this.elements[order] = element;
        }

        onRatioChange(){
            this.elements[0].css('width', this.$scope.ratio.toString() + '%');
            this.elements[1].css('width', (this.$scope.maxRange - this.$scope.ratio).toString() + '%');
        }
    }
}