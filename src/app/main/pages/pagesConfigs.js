import { ForgotPasswordPageConfig } from './auth/forgot-password/ForgotPasswordPageConfig';
import { ResetPasswordPageConfig } from './auth/reset-password/ResetPasswordPageConfig';
import { LoginPageConfig } from './auth/login/LoginPageConfig';
import { MailConfirmPageConfig } from './auth/mail-confirm/MailConfirmPageConfig';
import { LockPageConfig } from './auth/lock/LockPageConfig';
import { Login2PageConfig } from './auth/login-2/Login2PageConfig';
import { Register2PageConfig } from './auth/register-2/Register2PageConfig';
import { ForgotPassword2PageConfig } from './auth/forgot-password-2/ForgotPassword2PageConfig';
import { ResetPassword2PageConfig } from './auth/reset-password-2/ResetPassword2PageConfig';
import { ComingSoonPageConfig } from './coming-soon/ComingSoonPageConfig';
import { Error404PageConfig } from './errors/404/Error404PageConfig';
import { Error500PageConfig } from './errors/500/Error500PageConfig';
import { MaintenancePageConfig } from './maintenance/MaintenancePageConfig';
import { TeamPageConfig } from './team/TeamPageConfig';
import { TeamMemberPageConfig } from './team-member/TeamMemberPageConfig';
import { CalendarAppConfig } from './calendar/CalendarAppConfig';
import { ModernInvoicePageConfig } from './invoices/modern/ModernInvoicePageConfig';
import { CompactInvoicePageConfig } from './invoices/compact/CompactInvoicePageConfig';
import { PricingStyle1PageConfig } from './pricing/style-1/PricingStyle1PageConfig';
import { SongPageConfig } from './songs/SongPageConfig';
import { ProfilePageConfig } from './profile/ProfilePageConfig';
import { ActivityConfig } from './activity/ActivityConfig';
import { ClassicSearchPageConfig } from './search/classic/ClassicSearchPageConfig';
import { ModernSearchPageConfig } from './search/modern/ModernSearchPageConfig';
import { FaqPageConfig } from './faq/FaqPageConfig';
import { KnowledgeBasePageConfig } from './knowledge-base/KnowledgeBaseConfig';

export const pagesConfigs = [
  ActivityConfig,
  SongPageConfig,
  TeamPageConfig,
  TeamMemberPageConfig,
  CalendarAppConfig,
  ProfilePageConfig,
  Register2PageConfig,
  PricingStyle1PageConfig,
  LoginPageConfig,
  ResetPasswordPageConfig,
  ForgotPasswordPageConfig,
  MailConfirmPageConfig,
  LockPageConfig,
  Login2PageConfig,
  ForgotPassword2PageConfig,
  ResetPassword2PageConfig,
  ComingSoonPageConfig,
  Error404PageConfig,
  Error500PageConfig,
  MaintenancePageConfig,
  ModernInvoicePageConfig,
  CompactInvoicePageConfig,
  ClassicSearchPageConfig,
  ModernSearchPageConfig,
  FaqPageConfig,
  KnowledgeBasePageConfig
];
