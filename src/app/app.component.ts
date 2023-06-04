import { Component, OnInit } from "@angular/core";
import { SwPush, SwUpdate } from "@angular/service-worker";

@Component({
  selector: "pwa-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((versionEvent) => {
        if (versionEvent.type == "VERSION_READY") {
          if (confirm("New version available. Load New Version?")) {
            window.location.reload();
          }
        }
      });
    }
  }
}
