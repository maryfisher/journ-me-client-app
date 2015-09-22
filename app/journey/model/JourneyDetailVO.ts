/// <reference path="../../../common/interfaces/journey/JourneyJoinEnum.ts" />
module jm.journey {

    import IAliasDetailVO = jm.user.IAliasDetailVO;

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

        constructor(data ? : IJourneyDetailVO) {
            super(data);
            if (data) {
                this.parseData(data);
            }
        }

        //maybe put this into super class and loop over properties to set them
        parseData(data: IJourneyDetailVO) {
            super.parseData(data);
            //TODO make sure to not overwrite if the properties are not set
            this.moments = data.moments;
            this.followers = data.followers;
            this.linkedToJourneys = data.linkedToJourneys;
            this.linkedFromJourneys = data.linkedFromJourneys;
            this.joinedAliases = data.joinedAliases ? data.joinedAliases : this.joinedAliases;
            this.joinRequests = data.joinRequests ? data.joinRequests : this.joinRequests;
            this.isAlias = data.isAlias ? data.isAlias : this.isAlias;
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
            for (i = 0, len = this.linkedFromJourneys.length; i < len; ++i) {
                for (j = 0, len2 = this.linkedToJourneys.length; j < len2; ++j) {
                    if (this.linkedFromJourneys[i]._id === this.linkedToJourneys[j]._id) {
                        this.joinedLinkedJourneys.push(this.linkedFromJourneys[i]);
                        //NOTE probably gonna throw an error, have to keep an eye on this
                        this.linkedFromJourneys.splice(i, 1);
                        this.linkedToJourneys.splice(j, 1);
                    }
                }
            }
        }

        updateFromAlias(alias: IAliasDetailVO) {
            this.updateAlias(alias);
            this.updateFollowing(alias);
            this.updateAliasJourneyLink(alias);
            this.updateIsJoined(alias);
            this.updateSendRequest(alias);
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

        canJoin(): boolean {
            return this.join !== JourneyJoinEnum.none;
        }
    }
}