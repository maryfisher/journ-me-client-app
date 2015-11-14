module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export interface IFeedbackVO {
        id: string;
        alias: jm.user.AliasBaseVO;
        moment: string;
        journey: string;
        body: string;
        created: Date;
        states: IStateVO[];
    }

    export class FeedbackVO implements IFeedbackVO {

        id: string;
        alias: AliasBaseVO;
        moment: string;
        journey: string;
        body: string;
        created: Date;
        states: IStateVO[] = [];

        constructor(data ?: IFeedbackVO) {
            this.parseJson(data);
        }

        parseJson(data: IFeedbackVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.alias = new AliasBaseVO(data.alias);
                this.states = [];
                for (var i: number = 0; i < data.states.length; i++) {
                    this.states.push(new StateVO(data.states[i]));
                }
            }
        }
    }
}