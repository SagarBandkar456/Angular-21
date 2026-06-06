import { Routes } from '@angular/router';
import { Child } from './child/child';

export const routes: Routes = [
    { path: "", component: Child },
    { path: "child", component: Child },
    { path: "**", redirectTo: '/child' }
];
