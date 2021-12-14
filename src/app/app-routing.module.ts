import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuard } from 'src/app/shared/guards/guest';
import { AuthGuard } from 'src/app/shared/guards/auth';

const routes: Routes = [
  {
    path: 'terms-of-service',
    loadChildren: () => import('./pages/terms-of-service/terms-of-service.module').then((m) => m.TermsOfServiceModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule)
  },
  {
    path: 'advertising-opportunities',
    loadChildren: () => import('./pages/advertising-opportunities/advertising-opportunities.module').then((m) => m.AdvertisingOpportunitiesModule)
  },
  {
    path: 'report-harmful-content',
    loadChildren: () => import('./pages/report-harmful-content/report-harmful-content.module').then((m) => m.ReportHarmfulContentModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then((m) => m.HelpModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard]
  },
  {
    path: 'reset-password',
    canLoad: [GuestGuard],
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordModule)
  },
  {
    path: 'reset-password/:token/confirm',
    canLoad: [GuestGuard],
    canActivate: [GuestGuard],
    loadChildren: () => import('./pages/password-confirm/password-confirm.module').then((m) => m.PasswordConfirmModule)
  },
  {
    path: 'sms-verification',
    loadChildren: () => import('./pages/sms-verification/sms-verification.module').then((m) => m.SmsVerificationModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'studio',
    loadChildren: () => import('src/app/pages/studio/studio.module').then((m) => m.StudioModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: 'write-review',
    loadChildren: () => import('src/app/pages/write-review/write-review.module').then((m) => m.WriteReviewModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  // ORDER HERE MATTERS!
  {
    path: '',
    loadChildren: () => import('./layouts/main-layout/main-layout.module').then((m) => m.MainLayoutModule)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
