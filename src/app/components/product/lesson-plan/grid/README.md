### EF Class Lesson Plan Grid

## Acceptance Criteria


## IO

- **@Input [dataProvider] :** [`PlaylistSummaryDto`](https://github.com/EFEducationFirstMobile/ef-class-web/blob/master/libraries/core/src/lib/playlist/summary/playlist-summary.dto.ts)[]
- **@Input [header]: string**
- **@Input [title]: string**
- **@Input [showHero]: boolean**
- **@Input [fiveCardLayout]: boolean**
- **@Input [itemTemplate]: TemplateRef**

- **@Output (lessonPlanSelected)** - triggered through a lesson plan card click

## Usage

```html
<ef-class-lesson-plan-grid
    [dataProvider]="dataProvider"
    [header]="'header'"
    [title]="'title'"
    [showHero]="true"
    [fiveCardLayout]="true"
    [itemTemplate]="itemTemplate"
    (lessonPlanSelected)="onLessonPlanSelect($event)">
</ef-class-lesson-plan-grid>
```
