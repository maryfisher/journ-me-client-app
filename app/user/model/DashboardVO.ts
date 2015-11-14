///<reference path="..\..\moment\model\FeedbackVO.ts"/>
///<reference path="..\..\journey\model\JourneyBaseVO.ts"/>
module jm.user {

    import FeedbackVO = jm.moment.FeedbackVO;
    import JourneyBaseVO = jm.journey.JourneyBaseVO;

    export interface IDashboardVO {
        recentFeedback: FeedbackVO[];
        feedbackJourneys: Object; //FeedbackVO.id => JourneyBaseVO
    }

    export class DashboardVO implements IDashboardVO {

        recentFeedback: FeedbackVO[];
        feedbackJourneys: Object;

        constructor(data ?: IDashboardVO) {
            this.parseData(data);
        }

        parseData(data: IDashboardVO) {
            this.recentFeedback = [];
            this.feedbackJourneys = {};
            if (data) {
                for (var i: number = 0; i < data.recentFeedback.length; i++) {
                    this.recentFeedback.push(new FeedbackVO(data.recentFeedback[i]));
                }
            }
        }

        parseJourneys(journeys: JourneyBaseVO[]) {
            for (var i: number = 0; i < journeys.length; i++) {
                for (var j: number = 0; j < this.recentFeedback.length; j++) {
                    var journey: JourneyBaseVO = journeys[i];
                    var feedback: FeedbackVO = this.recentFeedback[j];
                    if (feedback.journey === journey.id) {
                        this.addJourney(journey, feedback.id);
                    }
                }
            }
        }

        addJourney(journey: JourneyBaseVO, feedbackId: string) {
            this.feedbackJourneys[feedbackId] = journey;
        }

        invalidateData() {
            this.recentFeedback.length = 0;
        }
    }
}