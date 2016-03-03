/// <reference path="../../journey/model/JourneyBaseVO.ts" />
///<reference path="..\..\note\model\NotebookVO.ts"/>
module jm.user {

    import IJourneyBaseVO = jm.journey.IJourneyBaseVO;
    import JourneyBaseVO = jm.journey.JourneyBaseVO;
    import NotebookVO = jm.note.NotebookVO;

    export interface IAliasDetailVO extends IAliasBaseVO {
        journeys: JourneyBaseVO[];
        followedJourneys: JourneyBaseVO[];
        joinedJourneys: JourneyBaseVO[];
        notebooks: NotebookVO[];
    }

    export class AliasDetailVO extends AliasBaseVO implements IAliasDetailVO {
        journeys: JourneyBaseVO[] = [];
        followedJourneys: JourneyBaseVO[] = [];
        joinedJourneys: JourneyBaseVO[] = [];
        notebooks: NotebookVO[] = [];

        constructor(data ?: IAliasDetailVO) {
            super(data);
        }

        parseJson(data: IAliasDetailVO) {
            super.parseJson(data);
            this.parseDetailData(data);
        }

        parseDetailData(data: IAliasDetailVO) {
            if (!data) {
                return;
            }
            this.journeys = data.journeys.map(v => {
                return new JourneyBaseVO(v);
            });
            this.followedJourneys = data.followedJourneys.map(v => {
                return new JourneyBaseVO(v);
            });

            this.joinedJourneys = data.joinedJourneys.map(v => {
                return new JourneyBaseVO(v);
            });

            data.notebooks && (this.notebooks = data.notebooks.map(v => {
                return new NotebookVO(v);
            }));
        }

        invalidateData() {
            super.invalidateData();
            this.journeys.length = 0;
            this.followedJourneys.length = 0;
            this.joinedJourneys.length = 0;
        }

        updateJourneys(journey: JourneyBaseVO) {
            this.journeys.map(v => {
                if (v.id === journey.id) {
                    return new JourneyBaseVO(journey);
                }
            });
            /*for (var i: number = 0; i < this.journeys.length; i++) {
             if (this.journeys[i].id === journey.id) {
             this.journeys[i] = new JourneyBaseVO(journey);
             }
             }*/
        }
    }
}