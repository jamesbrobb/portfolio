# **Lesson Plan Grid**

## IO

**@Input (dataProvider) :** [`PlaylistSummaryDto`]()[]

**@Input (header): `string`**

**@Input (title): `string`**

**@Input (showHero): `boolean`**

**@Input (fiveCardLayout): `boolean`**

**@Input (itemTemplate): `TemplateRef`**

**@Output (lessonPlanSelected)** - triggered through a lesson plan card click

## Usage

```html
<lesson-plan-grid
    [dataProvider]="dataProvider"
    [header]="'header'"
    [title]="'title'"
    [showHero]="true"
    [fiveCardLayout]="true"
    [itemTemplate]="itemTemplate"
    (lessonPlanSelected)="onLessonPlanSelect($event)">
</lesson-plan-grid>
```
