///<reference path="..\..\user\model\AliasBaseVO.ts"/>
module jm.moment {
    export interface IEmpathyVO {
        _id: string;
        alias: jm.user.AliasBaseVO;
        moment: string;
        body: string;
        created: Date;
    }
}