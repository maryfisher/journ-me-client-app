module jm.journey.ctrl {
    'use strict';

    export class LinkJourneyController extends jm.common.BaseModalController {

        constructor(private $scope: ng.IScope, $element: ng.IAugmentedJQuery, $modal: angular.ui.bootstrap.IModalService) {
            super($scope, $element, $modal, {
                templateUrl: 'journey/ui/link/linkJourney.tpl.html',
                controller: 'LinkJourneyModalController'
            });
        }
    }
}