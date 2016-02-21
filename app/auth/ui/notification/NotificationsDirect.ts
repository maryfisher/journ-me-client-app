module jm.auth {

    import JMConfigConst = jm.common.JMConfigConst;
    import IDirective = ng.IDirective;
    import NotificationsController = jm.auth.ctrl.NotificationsController;

    export class NotificationsDirect implements IDirective {

        static NG_NAME: string = 'jmNotifications';

        templateUrl: any = 'auth/ui/notification/notifications.tpl.html';
        controller: string = NotificationsController.NG_NAME;
        controllerAs: string = JMConfigConst.CTRL;

        constructor($injector: ng.auto.IInjectorService) {
        }
    }
}