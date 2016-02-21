module jm.auth {

    import IAnimateService = angular.animate.IAnimateService;
    import NGConst = jm.common.NGConst;
    import IDirective = ng.IDirective;

    export class LoggedInDirect implements IDirective {

        static NG_NAME: string = 'jmLoggedInShow';

        private authModel: AuthModel;
        private $animate: IAnimateService;
        private ngIf: any;

        transclude: any;
        priority: number;
        terminal: boolean;
        restrict: string;

        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: {}, $transclude: ng.ITranscludeFunction) => {
            var showElm: boolean = attrs[LoggedInDirect.NG_NAME] === 'true';
            attrs['ngIf'] = (): boolean => {
                return !((this.isLoggedIn() && !showElm) || (!this.isLoggedIn() && showElm));
            };
            this.ngIf.link.call(this.ngIf, scope, element, attrs, ctrl, $transclude);
        };

        private isLoggedIn = (): boolean => {
            return this.authModel.isLoggedIn();
        };

        constructor($injector: ng.auto.IInjectorService) {
            this.authModel = $injector.get < AuthModel > (AuthModel.NG_NAME);
            this.$animate = $injector.get < IAnimateService > (NGConst.$ANIMATE);
            this.ngIf = $injector.get < IDirective > ('ngIfDirective')[0];

            this.transclude = this.ngIf.transclude;
            this.priority = this.ngIf.priority;
            this.terminal = this.ngIf.terminal;
            this.restrict = this.ngIf.restrict;
        }
    }
}