///<reference path="StateRefVO.ts"/>
///<reference path="..\..\user\model\AliasBaseVO.ts"/>
module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IFeedbackVO {
        id: string;
        alias: jm.user.AliasBaseVO;
        moment: string;
        journey: string;
        body: string;
        created: Date;
        states: string[];
    }

    export class FeedbackVO extends StateRefVO implements IFeedbackVO {

        id: string;
        alias: AliasBaseVO;
        moment: string;
        journey: string;
        body: string;
        created: Date;

        constructor(data ?: IFeedbackVO) {
            super();
            this.parseData(data);
        }

        parseData(data: IFeedbackVO) {
            if (data) {
                super.parseData(data);
                this.id = data.id;
                this.moment = data.moment;
                this.journey = data.journey;
                this.body = data.body;
                this.created = data.created;
                this.alias = new AliasBaseVO(data.alias);
            }
        }
    }
}