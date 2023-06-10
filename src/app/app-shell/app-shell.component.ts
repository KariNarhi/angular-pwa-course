import { Component } from "@angular/core";

@Component({
  selector: "pwa-app-shell",
  template: ` <img class="loading-indicator" src="/assets/loading.gif" /> `,
  styles: [
    `
      .loading-indicator {
        height: 300px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AppShellComponent {}
