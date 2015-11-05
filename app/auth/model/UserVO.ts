module jm.auth {

    import ServerConst = jm.common.ServerConst;

    export interface IUserVO {
        id: string;
        email: string;
        authToken: string;
        currentAlias: string;
        aliases: string[];
    }

    export class UserVO implements IUserVO {
        id: string;
        email: string;
        authToken: string;
        currentAlias: string;
        aliases: string[] = [];

        constructor(data ?: IUserVO) {
            this.parseJson(data);
        }

        parseJson(data: IUserVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.authToken = data[ServerConst.HEADER_ITEMS][ServerConst.SERVER_TOKEN_KEY];
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