module jm.user.ctrl {
    'use strict';

    import IModalService = angular.ui.bootstrap.IModalService;

    export interface IAliasListModalScope extends ng.IScope {
        listStr: string;
        aliasList: AliasBaseVO[];
        listHeader: string;
        cancel();
    }

    export class AliasListController extends jm.common.BaseModalController {

        constructor(private $scope: IAliasListModalScope, $element: ng.IAugmentedJQuery, $modal: IModalService) {
            super($scope, $element, $modal, {
                templateUrl: 'user/ui/list/aliasListModal.tpl.html',
                controller: 'AliasListModalController'
            });
        }
    }
}