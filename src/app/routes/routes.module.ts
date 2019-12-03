import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { TestComponent } from './test/test.component';
import { MainComponent } from './main/main.component';
import { WfdComponent } from './wfd/wfd.component';
import { ItemPanelComponent } from './item-panel/item-panel.component';
import { ToolbarPanelComponent } from './toolbar-panel/toolbar-panel.component';
import { WorkflowComponent } from './workflow/workflow.component';

const COMPONENTS = [
    DashboardComponent,
    // passport pages
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent,
    // single pages
    CallbackComponent,
    UserLockComponent,
    TestComponent,
    MainComponent,
    WfdComponent,
    ItemPanelComponent,
    ToolbarPanelComponent,
    WorkflowComponent,

];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, RouteRoutingModule],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
    ],
    entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {
}
