module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;

    export class EmpathyVO {

        _id: string;
        alias: AliasBaseVO;
        moment: string;
        body: string;
        moods: string[];
        created: Date;

        constructor(data ? : IEmpathyVO) {
            if (data) {
                this.parseData(data);
            }
        }

        parseData(data: IEmpathyVO) {
            this._id = data._id;
            this.alias = new AliasBaseVO(data.alias);
            this.created = data.created;
            this.moods = data.moods;
            this.body = data.body;
            this.moment = data.moment;
        }
    }
}