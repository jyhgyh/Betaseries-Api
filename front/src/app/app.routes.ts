import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { SeriesItemComponent } from './components/series-item/series-item.component';

export const routes: Routes = [
    {
        path: 'azertyy', component: TestComponent
    },
    { path: 'test', component: SeriesItemComponent }
];
