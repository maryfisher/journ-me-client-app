module jm.auth {

    import IAuthVO = jm.auth.IAuthVO;

    export interface IAuthVO {
        id: string;
        email: string;
        authToken: string;
        currentAlias: string;
    }

    export class AuthVO implements IAuthVO {
        id: string;
        email: string;
        authToken: string;
        currentAlias: string;

        constructor(data ?: IAuthVO) {
            this.parseJson(data);
        }

        parseJson(data: IAuthVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }

        invalidateData() {
            this.id = undefined;
            this.email = undefined;
            this.currentAlias = undefined;
            this.authToken = undefined;
        }
    }
}