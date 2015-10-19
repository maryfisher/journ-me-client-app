///<reference path="..\..\moment\model\StateVO.ts"/>
module jm.common {

    import IStateVO = jm.moment.IStateVO;

    export class FilterUtil {

        static STATE_SELECT_FILTER: string = 'stateSelectFilter';

        static stateSelectFilter(states: IStateVO[], typeFilters: number[]): IStateVO[] {
            var out: IStateVO[] = [];
            for (var i: number = 0; i < states.length; i++) {
                if (typeFilters.indexOf(states[i].type) !== -1) {
                    out.push(states[i]);
                }
            }

            return out;
        }
    }
}
