module jm.common {
    'use strict';

    import IModalService = angular.ui.bootstrap.IModalService;
    import IModalSettings = angular.ui.bootstrap.IModalSettings;
    import NGConst = jm.common.NGConst;

    export class BaseModalController {
        static $inject = [NGConst.$SCOPE, NGConst.$ELEMENT, NGConst.$MODAL];

        modalObj: IModalSettings;

        constructor($scope: ng.IScope, private $element: ng.IAugmentedJQuery, private $modal: IModalService, modalObj: IModalSettings) {
            _.bindAll(this, 'openModal');
            this.modalObj = modalObj;
            this.modalObj.scope = $scope;
            this.modalObj.animation = true;
            $element.on('click', this.openModal);
        }

        openModal() {
            this.$element[0].blur();
            this.$modal.open(this.modalObj);
        }
    }
}