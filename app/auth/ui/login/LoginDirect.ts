module jm {
    export module auth {
        'use strict';

        import NGConst = jm.common.NGConst;
        import IModalService = angular.ui.bootstrap.IModalService;

        export class LoginDirect implements ng.IDirective {

            static NG_NAME: string = 'jmLogin';

            private $modal: IModalService;

            restrict: string = 'A';
            link = (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
                element.on('click', this.openModal);
            }

            openModal() {
                this.$modal.open({
                    animation: true,
                    templateUrl: 'auth/ui/login/loginForm.tpl.html',
                    controller: 'LoginFormController'
                });
            }

            constructor($injector: ng.auto.IInjectorService) {
                this.$modal = $injector.get < IModalService > (NGConst.$MODAL);

                _.bindAll(this, 'openModal');
            }
        }
    }
}