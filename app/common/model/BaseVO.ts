module jm.common {
    /**
     * Iteratable base class
     */
    export class BaseVO {
        constructor(json: any) {
            this.parseJson(json);
        }

        parseJson(json: any) {
            if (!json) {
                return;
            }
            this.forEach(json, (value, prop) => {
                this[prop] = value;
            });
        }

        /**
         * Basic forEach implementation.
         * @param json The json object to iterate over
         * @param iterator The function to be called at each iteration
         */
        forEach(json: Object, iterator: (value: Object, prop: string) => void) {
            for (var prop in json) {
                if (!json.hasOwnProperty(prop)) {
                    continue;
                }
                iterator(json[prop], prop);
            }
        }
    }
}