module jm {
    export module auth {

        import IAuthVO = jm.auth.IAuthVO;

        export class AuthVO {
            _id: string;
            email: string;
            authToken: string;
            currentAlias: string;

            constructor(data ? : IAuthVO) {
                if (data) {
                    this.parseData(data);
                }
            }

            //maybe put this into super class and loop over properties to set them
            parseData(data: IAuthVO) {
                this._id = data._id;
                this.email = data.email;
                this.currentAlias = data.currentAlias;
                this.authToken = data.authToken;
            }

            invalidateData() {
                this._id = undefined;
                this.email = undefined;
                this.currentAlias = undefined;
                this.authToken = undefined;
            }
        }
    }
}