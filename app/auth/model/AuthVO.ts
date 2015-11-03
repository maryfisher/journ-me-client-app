module jm.auth {

    export interface IAuthVO {
        id: string;
        email: string;
        authToken: string;
        currentAlias: string;
        aliases: string[];
    }

    export class AuthVO implements IAuthVO {
        id: string;
        email: string;
        authToken: string;
        currentAlias: string;
        aliases: string[] = [];

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
            this.aliases = [];
        }
    }
}