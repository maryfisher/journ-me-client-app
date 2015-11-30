module jm.common {
    export class NumberUtil {

        static numberToString(val: number): string {
            return '' + val;
        }

        static stringToNumber(val: string): number {
            return parseInt(val, 10);
        }

    }
}