module jm {
    export module journey {
        'use strict';
        export module ctrl {

            import IModalService = angular.ui.bootstrap.IModalService;
            import NGConst = jm.common.NGConst;

            export class JourneyEditController {
                static $inject = [NGConst.$SCOPE, NGConst.$ELEMENT, NGConst.$MODAL];

                constructor(private $scope: IBaseJourneyScope, private $element: ng.IAugmentedJQuery, private $modal: IModalService) {
                    _.bindAll(this, 'openModal');
                    $element.on('click', this.openModal);
                }

                openModal() {
                    this.$element[0].blur();
                    this.$modal.open({
                        animation: true,
                        templateUrl: 'journey/ui/edit/journeyForm.tpl.html',
                        controller: 'JourneyFormController',
                        scope: this.$scope
                    });
                }
            }

        }
    }
}