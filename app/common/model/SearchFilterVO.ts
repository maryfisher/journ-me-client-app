module jm.common {

    export class SearchFilterVO {

        getTextMatches(): EnumVO[] {
            return EnumUtil.getNamesAndValues(SearchFilterTextMatch);
        }

        getCollectionMatches(): EnumVO[] {
            return EnumUtil.getNamesAndValues(SearchFilterCollectionMatch);
        }

        getElementMatches(): EnumVO[] {
            return EnumUtil.getNamesAndValues(SearchFilterElementMatch);
        }
    }

    export const enum SearchFilterTextMatch {
        ANY_WORD_IGNORE_CASE,
        ALL_WORDS_IGNORE_CASE,
        CONTAINS_PHRASE_IGNORE_CASE,
        EXACT_PHRASE_IGNORE_CASE
    }

    export const enum SearchFilterCollectionMatch {
        ANY_ELEMENT,
        ALL_ELEMENTS
    }

    export const enum SearchFilterElementMatch {
        EQUAL,
        UNEQUAL
    }
}
