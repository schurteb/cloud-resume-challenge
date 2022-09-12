import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cloud-resume-app';

  // fullpage.js config
  config: any;
  fullpage_api: any;

  colors: any;

  constructor() {
    this.colors = {
      background: "rgba(255,255,255,1)",
      border: "rgba(102,102,102,1)",
      letter: "rgba(245,245,245,1)"
    };

    // for more details on config options please visit fullPage.js docs
    this.config = {

      // fullpage options

      // front-end code cannot be completely hidden, however, this doesn't matter in this case
      // as stated in https://alvarotrigo.com/fullPage/help/Where-to-use-fullPage-license/
      licenseKey: '6D2F6AF8-A80D4A6B-A3058064-6895EFD8',
      
      anchors: [
        'me',
        'certs',
        'technical',
        'work',
        'projects'
      ],

      menu: '#menu',
      navigation: true,
      navigationPosition: "right",
      slidesNavigation: true,
      slidesNavPosition: "bottom",

      // Init programmatically set properties
      sectionsColor: [],
      navigationTooltips: [],

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      afterLoad: (origin: any, destination: any, direction: any) => {
        console.log(origin.index);
      }
    };

    // Set common properties for each anchor element defined
    this.config.anchors.forEach((anchor: any) => {
      this.config.sectionsColor.push(this.colors.letter);
      this.config.navigationTooltips.push(anchor);
    });
  }

  getRef(fullPageRef: any) {
    this.fullpage_api = fullPageRef;
  }
}
