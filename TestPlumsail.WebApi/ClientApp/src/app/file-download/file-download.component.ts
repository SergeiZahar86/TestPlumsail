import {Component, OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ApiService} from "../services/api.service";

const URL = 'https://localhost:7281/weatherforecast/uploadfiles';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo'
  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }

  downloadFile() {
    this.apiService.getFile().subscribe(x => {
      console.log("This good");
      console.log(x);
      this.DF(x);
    }, z => {
      console.log("This bad");
      console.log(z)
    })
  }

  DF(data: Blob) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
