module jm.moment {

    export interface IBlinkVO {
        id: string;
        format: number;
        images: string[];
        texts: string[];
        index: number;
        moment: string;
        ratio: number;
        states: IStateVO[];
    }

    export class BlinkVO implements IBlinkVO {

        id: string;
        format: number = 0;
        images: string[] = [];
        texts: string[] = [];
        index: number = 0;
        moment: string;
        ratio: number;
        states: IStateVO[] = [];

        constructor(data ?: IBlinkVO) {
            this.parseJson(data);
        }

        parseJson(data: IBlinkVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }
    }
}