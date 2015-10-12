///<reference path="..\..\common\model\BaseVO"/>
module jm.auth {

    import IAuthVO = jm.auth.IAuthVO;

    export class AuthVO extends jm.common.BaseVO implements IAuthVO {
        _id: string;
        email: string;
        authToken: string;
        currentAlias: string;

        constructor(data ?: IAuthVO) {
            super(data);
        }

        invalidateData() {
            this._id = undefined;
            this.email = undefined;
            this.currentAlias = undefined;
            this.authToken = undefined;
        }
    }
}