module jm {
    export module auth {
        export interface IAuthVO {
            _id: string;
            email: string;
            authToken: string;
            currentAlias: string;
        }
    }
}