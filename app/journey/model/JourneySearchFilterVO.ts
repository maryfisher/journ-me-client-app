///<reference path="..\..\common\model\SearchFilterVO.ts"/>
module jm.journey {
    'use strict';

    export interface IJourneySearchFilter {
        text: string;
        textMatcher: number;
        join: number;
        joinMatcher: number;
        categories: string[];
        categoriesMatcher: number;
        topics: string[];
        topicsMatcher: number;
    }

    export class JourneySearchFilterVO extends jm.common.SearchFilterVO implements IJourneySearchFilter {
        text: string;
        textMatcher: number;
        join: number;
        joinMatcher: number;
        categories: string[];
        categoriesMatcher: number;
        topics: string[];
        topicsMatcher: number;

        constructor() {
            super();
            // initial values when searchFilter is instantiated
            this.text = undefined;
            this.textMatcher = 0;
            this.join = undefined;
            this.joinMatcher = 0;
            this.categories = [];
            this.categoriesMatcher = 0;
            this.topics = [];
            this.topicsMatcher = 0;
        }
    }
}