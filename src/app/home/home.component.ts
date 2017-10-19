import { Component, OnInit } from '@angular/core';
import {AppsService} from '../apps.service';
import {AuthService} from '../providers/auth.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public apps: Array<any>;
  public loading: boolean;
  public hasError: boolean;
  public appFilter: string;
  public title1 = 'Welcome to ';
  public title2 = 'enjoy the coolest apps'
  public listOfSelected= ['all categories'];
  public appTypes= ['all categories'];
  private theRatingResult: any;
  allApps: FirebaseObjectObservable<any[]>;

  constructor(private appsService: AppsService,  private db: AngularFireDatabase) {
    this.loading = true;
    this.hasError = false;
    this.appFilter = '';
  }

  ngOnInit() {
    if (performance.navigation.type === 1) {
      this.title1 = 'You are at ';
      this.title2 = 'enjoy the coolest apps';
      console.log( 'This page is reloaded' );
    } else {
      this.title1 = 'Welcome to ';
      this.title2 = 'enjoy the coolest apps';
      console.log( 'This page is not reloaded');
    }
    $('#close').css('display', 'none');
    $('#open').css('display', 'block');

    $('#check-all').css('display', 'block');
    $('#uncheck-all').css('display', 'none');
    this.appsService.all().subscribe(apps => {
        this.allApps = this.db.object('/apps/' + apps.id);
        const appsRes = this.allApps;
        let obj = {};
        appsRes.forEach(function (app) {
          const myObj = app;
          for (const count of app){
            obj[count] = app;
          }
          // console.log(obj);
          obj = app;
          // this.apps = obj;
        });
      this.apps = apps;
      this.loading = false;
      this.hasError = false;
    },
    error => {
      this.loading = false;
      this.hasError = true;
    });

  }

  openNavigation() {
    console.log('open sidebar');
    $('#thisSideNav').css('width', '200px');
    $('#content').css('marginLeft', '200px');
    $('#close').css('display', 'block');
    $('#open').css('display', 'none');
  }

  closeNavigation() {
    console.log('close sidebar');
    $('#thisSideNav').css('width', '0');
    $('#content').css('marginLeft', '0');
    $('#open').css('display', 'block');
    $('#close').css('display', 'none');
  }

  checkAll () {
    $(':checkbox').prop('checked', true);
    $('#check-all').css('display', 'none');
    $('#uncheck-all').css('display', 'block');
    const selectedOnes = [];
    const appTypesSelected = [];
    $(':checked').each(function () {
      appTypesSelected.push(this.value);
      if (this.value === 'web') {
        selectedOnes.push(' Web Apps');
      } else if (this.value === 'ios') {
        selectedOnes.push(' Ios Apps');
      } else if (this.value === 'window') {
        selectedOnes.push(' Windows Apps');
      } else if (this.value === 'os') {
        selectedOnes.push(' Os Apps');
      } else if (this.value === 'android') {
        selectedOnes.push(' Android Apps');
      } else if (this.value === 'plugin') {
        selectedOnes.push(' Plugins');
      } else if (this.value === 'widget') {
        selectedOnes.push(' Widgets');
      }
    });
    this.listOfSelected = appTypesSelected;
    this.appTypes = selectedOnes;
}

  UnCheckAll () {
    $(':checkbox').prop('checked', false);
    $('#check-all').css('display', 'block');
    $('#uncheck-all').css('display', 'none');
    this.listOfSelected = ['all categories'];
    this.appTypes = ['all categories'];
  }

  getValue() {
    const selectedOnes = []; const appTypesSelected = [];
    if ($(':checked').length > 0 ) {
      $(':checked').each(function () {
        appTypesSelected.push(this.value);
        if (this.value === 'web') {
          selectedOnes.push(' Web Apps');
        } else if (this.value === 'ios') {
          selectedOnes.push(' Ios Apps');
        } else if (this.value === 'window') {
          selectedOnes.push(' Windows Apps');
        } else if (this.value === 'os') {
          selectedOnes.push(' Os Apps');
        } else if (this.value === 'android') {
          selectedOnes.push(' Android Apps');
        } else if (this.value === 'plugin') {
          selectedOnes.push(' Plugins');
        } else if (this.value === 'widget') {
          selectedOnes.push(' Widgets');
        }
      });
    } else {
      selectedOnes.push('all categories');
      appTypesSelected.push('all categories');
    }
    this.listOfSelected = appTypesSelected;
    this.appTypes = selectedOnes;
  }

  getCategory(val) {
    const selectedOnes = []; const appTypesSelected = [];
    appTypesSelected.push(val);
    if (val === 'web') {
      selectedOnes.push(' Web Apps');
    } else if (val === 'ios') {
      selectedOnes.push(' Ios Apps');
    } else if (val === 'window') {
      selectedOnes.push(' Windows Apps');
    } else if (val === 'os') {
      selectedOnes.push(' Os Apps');
    } else if (val === 'android') {
      selectedOnes.push(' Android Apps');
    } else if (val === 'plugin') {
      selectedOnes.push(' Plugins');
    } else if (val === 'widget') {
      selectedOnes.push(' Widgets');
    }
    this.listOfSelected = appTypesSelected;
    this.appTypes = selectedOnes;
  }

  changeTitle2(id) {
    if (id === 1) {
      this.title2 = 'the home of the coolest apps';
    } else if (id === 2) {
      this.title2 = 'enjoy the coolest apps';
    } else if (id === 3) {
      this.title2 = 'the store of the coolest apps, apps of the future';
    }
  }
}
