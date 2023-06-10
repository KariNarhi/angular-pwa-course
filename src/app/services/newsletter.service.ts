import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class NewsletterService {
  constructor(private http: HttpClient) {}

  addPushSubscriber(sub: PushSubscription) {
    return this.http.post<PushSubscription>("/api/notifications", sub);
  }

  send() {
    return this.http.post<null>("/api/newsletter", null);
  }
}
