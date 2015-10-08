///<reference path="..\..\common\model\BaseVO"/>
module jm.user {

    export class AliasBaseVO extends jm.common.BaseVO implements IAliasBaseVO {
        _id: string;
        name: string;
        image: string;

        constructor(data ?: IAliasBaseVO) {
            super(data);
        }

        invalidateData() {
            this._id = undefined;
            this.name = undefined;
            this.image = undefined;
        }
    }
}