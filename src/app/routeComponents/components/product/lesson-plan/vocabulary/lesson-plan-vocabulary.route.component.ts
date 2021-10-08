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
    //public editorData: WordSenseDTO[] | undefined;

    constructor() {
        this.dataProvider = WordSenseParser.fromDTOArrayToDSArray(wordSenseDTOCollectionMock as WordSenseDTO[])
    }
}
