module jm.journey.ctrl {
    'use strict';

    import IModalService = angular.ui.bootstrap.IModalService;
    import NGConst = jm.common.NGConst;

    export class JourneyFollowersController extends jm.common.BaseModalController {
        static $inject = [NGConst.$SCOPE, NGConst.$ELEMENT, NGConst.$MODAL];

        constructor(private $scope: IBaseJourneyScope, $element: ng.IAugmentedJQuery, $modal: IModalService) {
            super($scope, $element, $modal, {
                templateUrl: 'journey/ui/follow/journeyFollowers.tpl.html',
                controller: 'JourneyFollowersModalController'
            });
        }
    }
}