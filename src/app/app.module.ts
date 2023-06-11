import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LessonsComponent } from "./lessons/lessons.component";

import { LessonsService } from "./services/lessons.service";
import { ReactiveFormsModule } from "@angular/forms";

import { environment } from "../environments/environment.prod";
import { ServiceWorkerModule } from "@angular/service-worker";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { NewsletterService } from "./services/newsletter.service";

@NgModule({
  declarations: [AppComponent, LessonsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: !environment.production,
    }),
    RouterModule,
  ],
  providers: [LessonsService, NewsletterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
