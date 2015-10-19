module jm.moment {

    export class StateCountVO {

        count: number = 0;
        state: IStateVO;
        isAlias: boolean = false;

        constructor(state: IStateVO) {
            this.state = state;
        }

        addToState() {
            this.count++;
        }
    }
}