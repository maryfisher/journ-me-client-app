///<reference path="..\..\common\model\BaseVO"/>
module jm.moment {
    export class StateVO extends jm.common.BaseVO implements IStateVO {

        _id: string;
        type: string;
        name: string;

        constructor(data ?: IStateVO) {
            super(data);
        }
    }
}