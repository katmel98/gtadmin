import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { IAppConfig } from '../_models/_interfaces/app-config.model';

@Injectable()
export class AppConfigService {

    static settings: IAppConfig;

    // We use HttpBackend to avoid Interceptors affect this service
    constructor(private http: HttpClient, handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }

    load() {
        console.log('Loading config file ...');
        const jsonFile = `/assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: Response) => {
               console.log(response);
               AppConfigService.settings = <IAppConfig>response;
               resolve();
            }).catch((response: any) => {
               console.log(response);
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
