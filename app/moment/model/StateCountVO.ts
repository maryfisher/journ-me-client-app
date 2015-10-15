module jm.moment {

    export class StateCountVO {

        count: number = 0;
        state: IStateVO;

        constructor(state: IStateVO) {
            this.state = state;
        }

        addToState() {
            this.count++;
        }
    }
}