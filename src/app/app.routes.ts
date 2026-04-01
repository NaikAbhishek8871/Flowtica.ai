 import { Routes } from '@angular/router';
import { DashboardLayout } from './Layout/dashboard-layout/dashboard-layout';
import { Login } from './Auth/login/login';
import { Forgotpassword } from './Auth/forgotpassword/forgotpassword';
import { Register } from './Auth/register/register';
import { ResetPassword } from './Auth/reset-password/reset-password';
import { Dashboard } from './Pages/dashboard/dashboard';
import { authGuard } from './Core/Guards/auth-guard';
import { Automation } from './Pages/automation/automation';
import { Leads } from './Pages/leads/leads';
import { Products } from './Pages/products/products';
import { Analytics } from './Pages/analytics/analytics';
import { BioPageComponent } from './Pages/bio-page/bio-page';
import { AccountInfo } from './Pages/setting/pages/account-info/account-info';
import { Integrations } from './Pages/setting/pages/integrations/integrations';
import { Security } from './Pages/setting/pages/security/security';
import { Setting } from './Pages/setting/setting';
import { Subscription } from './Pages/setting/pages/subscription/subscription';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Public
  { path: 'login', component: Login },
  { path: 'forgotpassword', component: Forgotpassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'register', component: Register },

  // Protected - Added the guard here!
  {
    path: 'app',
    component: DashboardLayout,
    canActivate: [], 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      {path:'bio-page',component:BioPageComponent},
      { path: 'Automation', component:Automation},
      { path: 'leads', component: Leads },
      { path: 'products', component: Products },
      {path:'analytics',component:Analytics},
      {path:'setting', component:Setting},
      {path:'account-info', component:AccountInfo},
      {path:'integrations', component:Integrations},
      {path:'security', component:Security},
      {path:'subscription', component:Subscription}
    ]
  },

  { path: '**', redirectTo: 'login' }
];