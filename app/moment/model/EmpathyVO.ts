module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export class EmpathyVO implements IEmpathyVO {

        _id: string;
        alias: AliasBaseVO;
        moment: string;
        body: string;
        created: Date;

        constructor(data ?: IEmpathyVO) {
            this.parseJson(data);
        }

        parseJson(data: IEmpathyVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.alias = new AliasBaseVO(data.alias);
            }
        }
    }
}