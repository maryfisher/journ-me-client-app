module jm.moment {
    export class BlinkVO implements IBlinkVO {

        _id: string;
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