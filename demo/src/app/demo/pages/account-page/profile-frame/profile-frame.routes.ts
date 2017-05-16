import { Routes } from '@angular/router';
import { ProfileFrameComponent } from './../../../../../../../dist';
import { translate } from './../../../../../../../dist/shared/utils';

export const DemoProfileFrameRoutes: Routes = [
  {
    path: '',
    component: ProfileFrameComponent,
    data: {
      name: 'profile',
      title: translate('Profile'),
      visible: true
    }
  }
];
