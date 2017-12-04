import { DemoAppComponent } from './app.component';
export { DemoAppComponent } from './app.component';
import { DemoAppModule } from './app.module';
export { DemoAppModule } from './app.module';
import { DemoRoutes } from './app.routes';
export { DemoRoutes } from './app.routes';
import { DemoNavbarComponent } from './controls/navbar/navbar.component';
export { DemoNavbarComponent } from './controls/navbar/navbar.component';
import { DemoNavbarModule } from './controls/navbar/navbar.module';
export { DemoNavbarModule } from './controls/navbar/navbar.module';
import { RuckenDemoRuI18n } from './i18n/ru.i18n';
export { RuckenDemoRuI18n } from './i18n/ru.i18n';
import { DemoAccountPageModule } from './pages/account-page/account-page.module';
export { DemoAccountPageModule } from './pages/account-page/account-page.module';
import { DemoAccountPageRoutes } from './pages/account-page/account-page.routes';
export { DemoAccountPageRoutes } from './pages/account-page/account-page.routes';
import { DemoProfileFrameModule } from './pages/account-page/profile-frame/profile-frame.module';
export { DemoProfileFrameModule } from './pages/account-page/profile-frame/profile-frame.module';
import { DemoProfileFrameRoutes } from './pages/account-page/profile-frame/profile-frame.routes';
export { DemoProfileFrameRoutes } from './pages/account-page/profile-frame/profile-frame.routes';
import { DemoAdminPageModule } from './pages/admin-page/admin-page.module';
export { DemoAdminPageModule } from './pages/admin-page/admin-page.module';
import { DemoAdminPageRoutes } from './pages/admin-page/admin-page.routes';
export { DemoAdminPageRoutes } from './pages/admin-page/admin-page.routes';
import { DemoGroupsFrameModule } from './pages/admin-page/groups-frame/groups-frame.module';
export { DemoGroupsFrameModule } from './pages/admin-page/groups-frame/groups-frame.module';
import { DemoGroupsFrameRoutes } from './pages/admin-page/groups-frame/groups-frame.routes';
export { DemoGroupsFrameRoutes } from './pages/admin-page/groups-frame/groups-frame.routes';
import { DemoUsersFrameModule } from './pages/admin-page/users-frame/users-frame.module';
export { DemoUsersFrameModule } from './pages/admin-page/users-frame/users-frame.module';
import { DemoUsersFrameRoutes } from './pages/admin-page/users-frame/users-frame.routes';
export { DemoUsersFrameRoutes } from './pages/admin-page/users-frame/users-frame.routes';
import { DemoComponentsPageModule } from './pages/components-page/components-page.module';
export { DemoComponentsPageModule } from './pages/components-page/components-page.module';
import { DemoComponentsPageRoutes } from './pages/components-page/components-page.routes';
export { DemoComponentsPageRoutes } from './pages/components-page/components-page.routes';
import { DemoControlsFrameModule } from './pages/components-page/controls-frame/controls-frame.module';
export { DemoControlsFrameModule } from './pages/components-page/controls-frame/controls-frame.module';
import { DemoControlsFrameRoutes } from './pages/components-page/controls-frame/controls-frame.routes';
export { DemoControlsFrameRoutes } from './pages/components-page/controls-frame/controls-frame.routes';
import { DemoHomePageComponent } from './pages/home-page/home-page.component';
export { DemoHomePageComponent } from './pages/home-page/home-page.component';
import { DemoHomePageModule } from './pages/home-page/home-page.module';
export { DemoHomePageModule } from './pages/home-page/home-page.module';
import { DemoHomePageRoutes } from './pages/home-page/home-page.routes';
export { DemoHomePageRoutes } from './pages/home-page/home-page.routes';
import { DemoThemesPageModule } from './pages/themes-page/themes-page.module';
export { DemoThemesPageModule } from './pages/themes-page/themes-page.module';
import { DemoThemesPageRoutes } from './pages/themes-page/themes-page.routes';
export { DemoThemesPageRoutes } from './pages/themes-page/themes-page.routes';
import { DemoEndpointHelper } from './shared/helpers/endpoint.helper';
export { DemoEndpointHelper } from './shared/helpers/endpoint.helper';
import { DemoHttpHelper } from './shared/helpers/http.helper';
export { DemoHttpHelper } from './shared/helpers/http.helper';
export const RuckenDemoModules: any[] = [DemoNavbarModule.forRoot()];
export const RuckenDemoComponents: any[] = [DemoAppComponent, DemoNavbarComponent, DemoHomePageComponent];
export const RuckenDemoShareds: any[] = [DemoRoutes, RuckenDemoRuI18n, DemoAccountPageRoutes, DemoProfileFrameRoutes, DemoAdminPageRoutes, DemoGroupsFrameRoutes, DemoUsersFrameRoutes, DemoComponentsPageRoutes, DemoControlsFrameRoutes, DemoHomePageRoutes, DemoThemesPageRoutes, DemoEndpointHelper, DemoHttpHelper];
export const RuckenDemoServices: any[] = [];
export const RuckenDemoPipes: any[] = [];
