///<reference path="..\..\user\model\AliasBaseVO.ts"/>
///<reference path="..\..\common\const\ServerConst.ts"/>
module jm.moment {

    import AliasBaseVO = jm.user.AliasBaseVO;
    import ServerConst = jm.common.ServerConst;

    export interface IMomentBaseVO {
        id: string;
        alias: string;
        journey: string;
        date: string|Date;
        isPublic: boolean;
        title: string;
        thumb: string;

        isAlias: boolean;
    }

    export class MomentBaseVO implements IMomentBaseVO {

        id: string;
        alias: string;
        journey: string;
        date: string|Date;
        isPublic: boolean;
        title: string;
        thumb: string;
        thumbUrl: string;

        isAlias: boolean;

        constructor(data ?: IMomentBaseVO) {
            this.setDefault();
            this.parseJson(data);
        }

        setDefault() {
            this.isPublic = true;
            this.date = new Date();
            this.isAlias = false;
        }

        parseJson(data: IMomentBaseVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
                this.date = new Date(<string>data.date);
                this.thumbUrl = this.thumb ? ServerConst.MOMENT_IMG_PATH + this.thumb + ServerConst.THUMB : '';
            }
        }

        invalidateData() {
            this.id = undefined;
            this.alias = undefined;
            this.journey = undefined;
            this.title = undefined;
            this.thumb = undefined;
            this.setDefault();
        }

        updateAlias(alias: AliasBaseVO) {
            this.isAlias = this.alias === alias.id;
        }
    }
}