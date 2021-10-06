import {Component, Input, OnChanges} from '@angular/core';
import {TagDS} from "../../../../product/tag";



@Component({
    selector: 'text-tags',
    templateUrl: './text-tags.html',
    styleUrls: ['./text-tags.scss']
})
export class TextTagsComponent implements OnChanges {

    @Input() dataProvider: TagDS[] | undefined;

    public tags: TagDS[] | undefined;
    public noTags: boolean | undefined;

    public ngOnChanges(): void {

        this.tags = this.dataProvider;
        this.noTags = !this.tags || !this.tags.length;
    }
}
