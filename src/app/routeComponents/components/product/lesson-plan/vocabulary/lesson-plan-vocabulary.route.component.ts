import { Component } from '@angular/core';
import {WordSenseDS, WordSenseDTO, WordSenseParser} from "../../../../../product";
import {wordSenseDTOCollectionMock} from "../../../../../product/word-sense/index.mock";




@Component({
    selector: 'app-lesson-plan-vocabulary.route',
    templateUrl: './lesson-plan-vocabulary.route.component.html',
    styleUrls: ['./lesson-plan-vocabulary.route.component.scss']
})
export class LessonPlanVocabularyRouteComponent {

    public dataProvider: WordSenseDS[];
    public editorData: WordSenseDS[];

    constructor() {
        this.dataProvider = WordSenseParser.fromDTOArrayToDSArray(wordSenseDTOCollectionMock as WordSenseDTO[]);
        this.editorData = this.dataProvider;
    }

    public onDataChangeHandler(data: any): void {
        this.dataProvider = data;
    }
}
