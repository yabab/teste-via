// Constant Variables
export const webEnvironmentVariablesScanOffset: number = 2;

export const seleniumDefaultConnectionProtocol: string = "http";
export const seleniumDefaultHostAddress: string = "127.0.0.1";
export const seleniumDefaultPortNumber: string = "4444";

export const protractorFrameworkOption: string = "custom";
export const protractorCustomFrameworkName: string = "protractor-cucumber-framework";
export const protractorChromeArgsList: string[] = ["--start-maximized"];

export const protractorSpecLocationList: string[] = [`../../../features/*.feature`];
export const protractorCodeLocationList: string[] = ["../../../javascript/{general,web}/{stepdefinitions,support}/*.js"];

// String Builders
export function BuildWebReportFormatGlob(signature: string, testTime: string): string {
    return `json:./reports/json/report_${signature}_${testTime}.json`;
}

export function BuildSeleniumServerConnectionString(seleniumProtocol: string, seleniumHost: string, seleniumPort: string): string {
    return `${seleniumProtocol}://${seleniumHost}:${seleniumPort}/wd/hub`;
}