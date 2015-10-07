module jm.journey.ctrl {
    'use strict';

    import IModalService = angular.ui.bootstrap.IModalService;
    import NGConst = jm.common.NGConst;

    export class JourneyLinkRequestsController extends jm.common.BaseModalController {

        constructor(private $scope: IBaseJourneyScope, $element: ng.IAugmentedJQuery, $modal: IModalService) {
            super($scope, $element, $modal, {
                templateUrl: 'journey/ui/link/journeyLinkRequests.tpl.html',
                controller: 'JourneyLinkRequestsModalController'
            });
        }
    }
}