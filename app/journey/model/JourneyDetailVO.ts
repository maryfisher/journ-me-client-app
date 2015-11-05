///<reference path="..\..\moment\model\MomentBaseVO.ts"/>
///<reference path="..\..\user\model\AliasBaseVO.ts"/>
module jm.journey {

    import IAliasDetailVO = jm.user.IAliasDetailVO;
    import IAliasBaseVO = jm.user.IAliasBaseVO;
    import AliasBaseVO = jm.user.AliasBaseVO;
    import MomentBaseVO = jm.moment.MomentBaseVO;
    import IMomentBaseVO = jm.moment.IMomentBaseVO;

    export interface IJourneyDetailVO extends IJourneyBaseVO {
        moments: IMomentBaseVO[];
        followers: IAliasBaseVO[];
        linkedToJourneys: IJourneyBaseVO[];
        linkedFromJourneys: IJourneyBaseVO[];
        joinRequests: IAliasBaseVO[];
        joinedAliases: IAliasBaseVO[];

        joinedLinkedJourneys: IJourneyBaseVO[];
        aliasJourneyLink: IJourneyBaseVO;
        isFollowing: boolean;
        isAlias: boolean;

    }

    export class JourneyDetailVO extends JourneyBaseVO implements IJourneyDetailVO {

        moments: IMomentBaseVO[];
        followers: IAliasBaseVO[];
        linkedToJourneys: IJourneyBaseVO[];
        linkedFromJourneys: IJourneyBaseVO[];
        joinRequests: IAliasBaseVO[];
        joinedAliases: IAliasBaseVO[];

        joinedLinkedJourneys: IJourneyBaseVO[] = [];
        aliasJourneyLink: IJourneyBaseVO;
        isFollowing: boolean = false;
        isJoined: boolean = false;
        sendRequest: boolean = false;

        constructor(data ?: IJourneyDetailVO) {
            super(data);
        }

        parseBaseData(data: IJourneyDetailVO) {
            this.id = data.id;
            this.name = data.name;
            this.descript = data.descript;
            this.alias = this.alias ? this.alias : new AliasBaseVO(data.alias);
            this.hasLocation = data.hasLocation;
            this.location = data.location;
            this.isPublic = data.isPublic;
            this.join = data.join;
        }

        parseJson(data: IJourneyDetailVO) {
            super.parseJson(data);
            this.parseDetailData(data);
        }

        private parseDetailData(data: IJourneyDetailVO) {
            if (!data) {
                return;
            }
            //TODO make sure to not overwrite if the properties are not set
            this.moments = [];
            for (var i: number = 0; i < data.moments.length; i++) {
                this.moments.push(new MomentBaseVO(data.moments[i]));
            }
            this.followers = [];
            for (var i: number = 0; i < data.followers.length; i++) {
                this.followers.push(new AliasBaseVO(data.followers[i]));
            }
            this.joinedAliases = [];
            for (var i: number = 0; i < data.joinedAliases.length; i++) {
                this.joinedAliases.push(new AliasBaseVO(data.joinedAliases[i]));
            }
            this.joinRequests = [];
            for (var i: number = 0; i < data.joinRequests.length; i++) {
                this.joinRequests.push(new AliasBaseVO(data.joinRequests[i]));
            }
            this.linkedFromJourneys = [];
            for (var i: number = 0; i < data.linkedFromJourneys.length; i++) {
                this.linkedFromJourneys.push(new JourneyBaseVO(data.linkedFromJourneys[i]));
            }
            this.linkedToJourneys = [];
            for (var i: number = 0; i < data.linkedToJourneys.length; i++) {
                this.linkedToJourneys.push(new JourneyBaseVO(data.linkedToJourneys[i]));
            }
        }

        invalidateData() {
            super.invalidateData();
            this.moments = [];
            this.followers = [];
            this.linkedToJourneys = [];
            this.linkedFromJourneys = [];
            this.joinedLinkedJourneys = [];
            this.joinedAliases = [];
            this.joinRequests = [];
            this.aliasJourneyLink = undefined;
            this.isFollowing = false;
            this.isJoined = false;
            this.sendRequest = false;
        }

        updateLinks() {
            this.joinedLinkedJourneys.length = 0;
            var i, j, len, len2;
            var deleteFrom: number[] = [];
            var deleteTo: number[] = [];
            for (i = 0, len = this.linkedFromJourneys.length; i < len; ++i) {
                for (j = 0, len2 = this.linkedToJourneys.length; j < len2; ++j) {
                    if (this.linkedFromJourneys[i].id === this.linkedToJourneys[j].id) {
                        this.joinedLinkedJourneys.push(this.linkedFromJourneys[i]);
                        deleteFrom.push(i);
                        deleteTo.push(j);
                    }
                }
            }
            for (i = 0; i < deleteFrom.length; i++) {
                this.linkedFromJourneys.splice(deleteFrom[i], 1);
            }
            for (i = 0; i < deleteTo.length; i++) {
                this.linkedToJourneys.splice(deleteTo[i], 1);
            }
        }

        updateFromAlias(alias: IAliasDetailVO) {
            this.updateAlias(alias);
            this.updateFollowing(alias);
            this.updateAliasJourneyLink(alias);
            this.updateIsJoined(alias);
            this.updateSendRequest(alias);
            this.updateMoments(alias);
        }

        updateFollowing(alias: IAliasDetailVO) {
            var aliasId: string = alias.id;
            if (this.alias.id === aliasId) {
                return;
            }
            this.isFollowing = false;
            var index, len;
            for (index = 0, len = this.followers.length; index < len; ++index) {
                if (this.followers[index].id === aliasId) {
                    this.isFollowing = true;
                    break;
                }
            }
        }

        updateAliasJourneyLink(alias: IAliasDetailVO) {
            this.aliasJourneyLink = undefined;
            if (this.alias.id === alias.id || !alias.journeys) {
                return;
            }
            var i, j, len, len2;
            var allJourneys: IJourneyBaseVO[] = this.joinedLinkedJourneys.concat(this.linkedFromJourneys);
            for (i = 0, len = allJourneys.length; i < len; i++) {
                for (j = 0, len2 = alias.journeys.length; j < len2; j++) {
                    if (allJourneys[i].id === alias.journeys[j].id) {
                        this.aliasJourneyLink = allJourneys[i];
                        return;
                    }
                }
            }
        }

        updateIsJoined(alias: IAliasDetailVO) {
            if (this.alias.id === alias.id) {
                return;
            }
            this.isJoined = false;
            var index, len;
            for (index = 0, len = this.joinedAliases.length; index < len; ++index) {
                if (this.joinedAliases[index].id === alias.id) {
                    this.isJoined = true;
                    break;
                }
            }
        }

        updateSendRequest(alias: IAliasDetailVO) {
            if (this.alias.id === alias.id) {
                return;
            }
            this.sendRequest = false;
            var index, len;
            for (index = 0, len = this.joinRequests.length; index < len; ++index) {
                if (this.joinRequests[index].id === alias.id) {
                    this.sendRequest = true;
                    break;
                }
            }
        }

        updateMoments(alias: IAliasDetailVO) {
            for (var i: number = 0; i < this.moments.length; ++i) {
                this.moments[i].isAlias = this.moments[i].alias === alias.id;
            }
        }

        canJoin(): boolean {
            return this.join !== JourneyJoinEnum.none;
        }
    }
}