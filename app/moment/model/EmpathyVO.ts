module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export class EmpathyVO extends jm.common.BaseVO implements IEmpathyVO {

        _id: string;
        alias: AliasBaseVO;
        moment: string;
        body: string;
        moods: string[];
        created: Date;

        constructor(data ?: IEmpathyVO) {
            super(data);
        }

        parseJson(data: IEmpathyVO) {
            super.parseJson(data);
            this.alias = new AliasBaseVO(data.alias);
        }
    }
}