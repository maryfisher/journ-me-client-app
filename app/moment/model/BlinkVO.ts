///<reference path="..\..\common\model\BaseVO"/>
module jm.moment {
    export class BlinkVO extends jm.common.BaseVO implements IBlinkVO {

        _id: string;
        format: number = 0;
        images: string[] = [];
        texts: string[] = [];
        index: number = 0;
        moment: string;
        ratio: number;
        states: IStateVO[] = [];

        constructor(data ?: IBlinkVO) {
            super(data);
        }
    }
}