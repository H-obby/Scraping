import { Routes } from '@angular/router';
import { FeatDisplayComponent } from './feat-display/feat-display.component';
import { FeatDetailsComponent } from './feat-details/feat-details.component';

export const routes: Routes = [
    {
        path: '',
        component: FeatDisplayComponent,
        title: 'Main display',
      },
      {
        path: 'feat_details/:id',
        component: FeatDetailsComponent,
        title: 'Feat details',
      },
];

export default routes