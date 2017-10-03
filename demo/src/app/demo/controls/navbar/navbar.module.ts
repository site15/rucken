import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModalModule, ConfirmModalModule, PipesModule, SharedModule } from '@rucken/web';
import { CollapseModule } from 'ngx-bootstrap';

import { DemoNavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ConfirmModalModule.forRoot(),
    AuthModalModule.forRoot(),
    CollapseModule.forRoot(),
    PipesModule.forRoot(),
    RouterModule
  ],
  declarations: [
    DemoNavbarComponent
  ],
  exports: [
    DemoNavbarComponent
  ],
  entryComponents: [DemoNavbarComponent]
})
export class DemoNavbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoNavbarModule,
      providers: []
    };
  }
}
