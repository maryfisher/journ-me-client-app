///<reference path="..\..\moment\model\MomentBaseVO.ts"/>
module jm.journey {

    import IAliasDetailVO = jm.user.IAliasDetailVO;
    import MomentBaseVO = jm.moment.MomentBaseVO;

    export class JourneyDetailVO extends JourneyBaseVO implements IJourneyDetailVO {

        joinedAliases: jm.user.IAliasBaseVO[] = [];
        joinRequests: jm.user.IAliasBaseVO[] = [];
        moments: jm.moment.IMomentBaseVO[] = [];
        followers: jm.user.IAliasBaseVO[] = [];
        linkedToJourneys: IJourneyBaseVO[] = [];
        linkedFromJourneys: IJourneyBaseVO[] = [];

        joinedLinkedJourneys: IJourneyBaseVO[] = [];
        aliasJourneyLink: IJourneyBaseVO;
        isFollowing: boolean = false;
        isJoined: boolean = false;
        sendRequest: boolean = false;

        constructor(data ?: IJourneyDetailVO) {
            super(data);
        }

        parseJson(data: IJourneyDetailVO) {
            super.parseJson(data);
            this.parseDetailData(data);
        }

        parseBaseData(data: IJourneyDetailVO) {
            super.parseJson(data);
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
        }

        invalidateData() {
            super.invalidateData();
            this.moments.length = 0;
            this.followers.length = 0;
            this.linkedToJourneys.length = 0;
            this.linkedFromJourneys.length = 0;
            this.joinedLinkedJourneys.length = 0;
            this.joinedAliases.length = 0;
            this.joinRequests.length = 0;
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
                    if (this.linkedFromJourneys[i]._id === this.linkedToJourneys[j]._id) {
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
            var aliasId: string = alias._id;
            if (this.alias._id === aliasId) {
                return;
            }
            this.isFollowing = false;
            var index, len;
            for (index = 0, len = this.followers.length; index < len; ++index) {
                if (this.followers[index]._id === aliasId) {
                    this.isFollowing = true;
                    break;
                }
            }
        }

        updateAliasJourneyLink(alias: IAliasDetailVO) {
            this.aliasJourneyLink = undefined;
            if (this.alias._id === alias._id || !alias.journeys) {
                return;
            }
            var i, j, len, len2;
            var allJourneys: IJourneyBaseVO[] = this.joinedLinkedJourneys.concat(this.linkedFromJourneys);
            for (i = 0, len = allJourneys.length; i < len; i++) {
                for (j = 0, len2 = alias.journeys.length; j < len2; j++) {
                    //TO TEST
                    if (allJourneys[i]._id === alias.journeys[j]._id) { // || allJourneys[i]._id === alias.journeys[j]) {
                        this.aliasJourneyLink = allJourneys[i];
                        return;
                    }
                }
            }
        }

        updateIsJoined(alias: IAliasDetailVO) {
            if (this.alias._id === alias._id) {
                return;
            }
            this.isJoined = false;
            var index, len;
            for (index = 0, len = this.joinedAliases.length; index < len; ++index) {
                if (this.joinedAliases[index]._id === alias._id) {
                    this.isJoined = true;
                    break;
                }
            }
        }

        updateSendRequest(alias: IAliasDetailVO) {
            if (this.alias._id === alias._id) {
                return;
            }
            this.sendRequest = false;
            var index, len;
            for (index = 0, len = this.joinRequests.length; index < len; ++index) {
                if (this.joinRequests[index]._id === alias._id) {
                    this.sendRequest = true;
                    break;
                }
            }
        }

        updateMoments(alias: IAliasDetailVO) {
            for (var i: number = 0; i < this.moments.length; ++i) {
                this.moments[i].isAlias = this.moments[i].alias === alias._id;
            }
        }

        canJoin(): boolean {
            return this.join !== JourneyJoinEnum.none;
        }
    }
}