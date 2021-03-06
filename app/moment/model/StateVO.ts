module jm.moment {

    export interface IStateVO {
        id: string;
        type: number;
        name: string;
    }

    export class StateVO implements IStateVO {

        id: string;
        type: number;
        name: string;

        constructor(data ?: IStateVO) {
            this.parseJson(data);
        }

        parseJson(data: IStateVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
            /*if (this.type === StateTypeEnum.need) {
             this.name = 'got' + this.name;
             } else if (this.type === StateTypeEnum.openNeed) {
             this.name = 'missed' + this.name;
             }*/
        }
    }
}