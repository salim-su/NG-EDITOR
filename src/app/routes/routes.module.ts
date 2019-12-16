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
import { MainComponent } from './main/main.component';
import { WfdComponent } from './wfd/wfd.component';
import { ItemPanelComponent } from './item-panel/item-panel.component';
import { ToolbarPanelComponent } from './toolbar-panel/toolbar-panel.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { StarPanelComponent } from './right-panel/star-panel/star-panel.component';
import { AllRightPanelComponent } from './right-panel/all-right-panel/all-right-panel.component';
import { ApprovalPanelComponent } from './right-panel/approval-panel/approval-panel.component';
import { EndPanelComponent } from './right-panel/end-panel/end-panel.component';
import { BranchPanelComponent } from './right-panel/branch-panel/branch-panel.component';

const COMPONENTS = [
    DashboardComponent,
    // passport pages
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent,
    // single pages
    CallbackComponent,
    UserLockComponent,
    MainComponent,
    WfdComponent,
    ItemPanelComponent,
    ToolbarPanelComponent,
    WorkflowComponent,
    StarPanelComponent,
    AllRightPanelComponent,
    ApprovalPanelComponent,
    EndPanelComponent,
    BranchPanelComponent,

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
