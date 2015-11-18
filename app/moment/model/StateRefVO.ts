module jm.moment {

    export interface IStateRefVO {
        states: string[];
    }

    export class StateRefVO {
        states: string[];

        stateRefs: IStateVO[];

        constructor() {
            this.states = [];
            this.stateRefs = [];
        }

        parseData(data: IStateRefVO, refs ?: Object) {
            this.states = data.states || this.states;
            if (refs) {
                for (var i: number = 0; i < this.states.length; i++) {
                    this.stateRefs.push(refs[this.states[i]]);
                }
            }
        }

        addState(state: IStateVO) {
            this.states.push(state.id);
            this.stateRefs.push(state);
        }

        removeState(state: IStateVO) {
            this.states.splice(this.states.indexOf(state.id), 1);
            this.stateRefs.splice(this.stateRefs.indexOf(state), 1);
        }
    }
}
