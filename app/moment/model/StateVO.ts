module jm.moment {

    export interface IStateVO {
        _id: string;
        type: string;
        name: string;
    }

    export class StateVO implements IStateVO {

        _id: string;
        type: string;
        name: string;

        constructor(data ?: IStateVO) {
            this.parseJson(data);
        }

        parseJson(data: IStateVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }
    }
}