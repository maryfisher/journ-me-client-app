module jm.journey.ctrl {
    'use strict';

    import IModalService = angular.ui.bootstrap.IModalService;
    import NGConst = jm.common.NGConst;

    export class JourneyRequestsController extends jm.common.BaseModalController {

        constructor(private $scope: IBaseJourneyScope, $element: ng.IAugmentedJQuery, $modal: IModalService) {
            super($scope, $element, $modal, {
                templateUrl: 'journey/ui/requests/journeyRequests.tpl.html',
                controller: 'JourneyRequestsModalController'
            });
        }
    }
}