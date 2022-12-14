import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {FetchDataComponent} from './fetch-data/fetch-data.component';
import {FileDownloadComponent} from './file-download/file-download.component';
import {FileUploadModule} from "ng2-file-upload";
import {ApiService} from "./services/api.service";

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		HomeComponent,
		CounterComponent,
		FetchDataComponent,
		FileDownloadComponent,
	],
	imports: [
		FileUploadModule,
		BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([
			{
				path: '',
				component: HomeComponent,
				pathMatch: 'full'
			},
			{
				path: 'counter',
				component: CounterComponent
			},
			{
				path: 'fetch-data',
				component: FetchDataComponent
			},
			{
				path: 'file-download',
				component: FileDownloadComponent
			},
		])
	],
	providers: [ApiService],
	bootstrap: [AppComponent]
})
export class AppModule {}
