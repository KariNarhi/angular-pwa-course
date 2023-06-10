import { Component, OnInit } from "@angular/core";
import { LessonsService } from "../services/lessons.service";
import { Observable, of } from "rxjs";
import { Lesson } from "../model/lesson";
import { SwPush } from "@angular/service-worker";
import { catchError } from "rxjs/operators";
import { NewsletterService } from "../services/newsletter.service";

@Component({
  selector: "lessons",
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.css"],
})
export class LessonsComponent implements OnInit {
  lessons$!: Observable<Lesson[]>;
  isLoggedIn$!: Observable<boolean>;

  pushSub!: PushSubscription;

  readonly VAPID_PUBLIC_KEY =
    "BGPM_EUPB2mEuPsdMoxraXtFJD98Xf8_osoHLU5191nRB8dmaEb4CnDh8XIJaCUilVclJ6hVMtrLDnjvK6a9hdc";

  constructor(
    private lessonsService: LessonsService,
    private swPush: SwPush,
    private newsLetterService: NewsletterService
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessons$ = this.lessonsService
      .loadAllLessons()
      .pipe(catchError((err) => of([])));
  }

  async subscribeToNotifications() {
    const sub = await this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY,
    });

    this.pushSub = sub;

    console.log(sub);

    this.newsLetterService.addPushSubscriber(sub).subscribe();
  }

  sendNewsletter() {
    console.log("Sending newsletter to all subscribers");

    this.newsLetterService.send().subscribe();
  }
}
