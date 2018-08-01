export interface IAppConfig {
    env?: {
        name: string;
    };
    appInsights?: {
        instrumentationKey: string;
    };
    logging?: {
        console: boolean;
        appInsights: boolean;
    };
    connection?: {
        requireAuth: boolean;
        tenant: string;
        clientId: string;
    };
    apiServer?: {
        metadata: string;
        rules: string;
    };
    debug?: boolean;
}
