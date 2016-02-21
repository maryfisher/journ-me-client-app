module jm.auth.ctrl {

    import NGConst = jm.common.NGConst;
    import ServerConst = jm.common.ServerConst;
    import IDirective = ng.IDirective;

    export class NotificationsController {

        static NG_NAME: string = 'NotificationsController';

        static $inject = [NGConst.$SCOPE, AuthModel.NG_NAME];

        private notifications: any[] = [];

        constructor(private $scope: ng.IScope, authModel: AuthModel) {

            var authoken: string = authModel.currentUser.authToken;
            var sseSource: any = new EventSource('/api/user/notifications?' + ServerConst.SERVER_TOKEN_KEY + "=" + authoken);
            sseSource.addEventListener('NEW', this.handleStream, false);
        }

        private handleStream = (stream: any) => {
            var thatNotifications: any[] = this.notifications;
            this.$scope.$apply(function () {
                thatNotifications.push(stream.data);
            });
        };
    }
}