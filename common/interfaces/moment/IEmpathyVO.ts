module jm.moment {
    export interface IEmpathyVO {
        _id: string;
        alias: jm.user.AliasBaseVO;
        moment: string;
        body: string;
        moods: string[];
        created: Date;
    }
}