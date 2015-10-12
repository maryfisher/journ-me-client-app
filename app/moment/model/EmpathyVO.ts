module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export class EmpathyVO extends jm.common.BaseVO implements IEmpathyVO {

        _id: string;
        alias: AliasBaseVO;
        moment: string;
        body: string;
        created: Date;

        constructor(data ?: IEmpathyVO) {
            super(data);
        }

        parseJson(data: IEmpathyVO) {
            super.parseJson(data);
            if (!data) {
                return;
            }
            this.alias = new AliasBaseVO();
            this.alias.parseJson(data.alias);
        }
    }
}