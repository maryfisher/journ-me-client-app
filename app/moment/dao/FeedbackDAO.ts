module jm.moment {
    'use strict';

    import ServerConst = jm.common.ServerConst;
    import NGConst = jm.common.NGConst;
    import IPromise = angular.IPromise;

    export class FeedbackDAO extends jm.common.BaseResourceDAO {

        static NG_NAME: string = 'feedbackDAO';

        constructor($injector: ng.auto.IInjectorService) {
            super($injector);
            this.path = ServerConst.FEEDBACK_PATH;
        }

        returnAllFeedback = (response): IFeedbackVO[] => {
            var feedback: IFeedbackVO[] = [];
            for (var i = 0; i < response.data.length; i++) {
                feedback.push(new FeedbackVO(response.data[i]));
            }
            return feedback;
        };

        returnFeedback = (response): IFeedbackVO => {
            return response.data;
        }

        getFeedback(momentId: string): IPromise < IFeedbackVO[] > {
            return this.getAll({momentId: momentId}, this.returnAllFeedback);
        }

        createFeedback(f: FeedbackVO, momentId: string, aliasId: string): IPromise < IFeedbackVO > {
            return this.create(f, this.returnFeedback, {'momentId': momentId, 'aliasId': aliasId});
        }

        updateFeedback(f: FeedbackVO): IPromise < IFeedbackVO > {
            return this.update(f, this.returnFeedback);
        }
    }
}