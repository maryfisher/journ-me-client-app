module jm {
    export module auth {
        'use strict';

        import NGConst = jm.common.NGConst;
        import IModalService = angular.ui.bootstrap.IModalService;

        export class RegisterDirect implements ng.IDirective {

            static NG_NAME: string = 'jmRegister';

            private $modal: IModalService;

            restrict: string = 'A';
            link = (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
                element.on('click', this.openModal);
            }

            openModal() {
                this.$modal.open({
                    animation: true,
                    templateUrl: 'auth/ui/register/registerForm.tpl.html',
                    controller: 'RegisterFormController'
                });
            }

            constructor($injector: ng.auto.IInjectorService) {
                this.$modal = $injector.get < IModalService > (NGConst.$MODAL);

                _.bindAll(this, 'openModal');
            }
        }
    }
}