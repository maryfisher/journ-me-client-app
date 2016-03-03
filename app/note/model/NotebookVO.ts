///<reference path="NoteVO.ts"/>
module jm.note {

    export interface INotebookVO {
        id: string;
        name: string;
        descript: string;
    }

    export class NotebookVO implements INotebookVO {

        id: string;
        name: string;
        descript: string;
        notes: NoteVO[];

        constructor(data ?: INotebookVO) {
            this.parseJson(data);
        }

        parseJson(data: INotebookVO) {
            if (data) {
                jm.common.VOUtil.parseJson(data, this);
            }
        }

        parseNotes(notes: INoteVO[]) {
            this.notes = [];
            for (var i: number = 0; i < notes.length; i++) {
                this.notes.push(new NoteVO(notes[i]));
            }
        }
    }
}