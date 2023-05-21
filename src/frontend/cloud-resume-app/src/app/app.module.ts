import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CertificationInfoComponent } from './certification-info/certification-info.component';
import { EmploymentHistoryComponent } from './employment-history/employment-history.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalInfoComponent,
    CertificationInfoComponent,
    EmploymentHistoryComponent,
    ProjectInfoComponent,
    TechStackComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    AngularFullpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
