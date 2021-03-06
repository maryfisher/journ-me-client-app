///<reference path="..\const\NGConst.ts"/>
module jm.common.ctrl {
    'use strict';

    import IModalService = angular.ui.bootstrap.IModalService;
    import IModalSettings = angular.ui.bootstrap.IModalSettings;
    import NGConst = jm.common.NGConst;

    export interface IBaseModalScope extends ng.IScope {
        cancel();
        modalController: string;
        modalTemplateUrl: string;
    }

    export class BaseModalController {
        static $inject = [NGConst.$SCOPE, NGConst.$ELEMENT, NGConst.$MODAL];
        static NG_NAME = 'BaseModalController';

        private modalScope: IBaseModalScope;

        constructor($scope: IBaseModalScope, private $element: ng.IAugmentedJQuery, private $modal: IModalService) {
            this.modalScope = $scope;
            $element.on('click', this.openModal);
        }

        openModal = () => {
            var modalObj: IModalSettings = {
                templateUrl: this.modalScope.modalTemplateUrl,
                scope: this.modalScope,
                animation: true
            };
            modalObj.controller = this.modalScope.modalController ? this.modalScope.modalController : 'BaseModalInstanceController';

            this.$element[0].blur();
            this.$modal.open(modalObj);
        }
    }
}