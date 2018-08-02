import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { IAppConfig } from '../_models/_interfaces/app-config.model';

@Injectable()
export class AppConfigService {

    static settings: IAppConfig;

    constructor(private http: HttpClient) {}

    load() {
        const jsonFile = `../../assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: Response) => {
               AppConfigService.settings = <IAppConfig>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
