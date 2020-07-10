import * as sysControlPanel from "../support/system_controlPanel";

// Constant Variables
export const semiColonString: string = ";";
export const singleQuoteString: string = "'";
export const escapedDoubleQuotesString: string = "\"";

export const subkeysJsonKey: string = "chaves";

export const hmlbatSchemaName: string = "DBHMVS.HMLBAT.";
export const jtrachSchemaName: string = "DBPMVS.JTRACH.";

export const databaseClientTable: string = "cli";
export const databaseQueryCdCliCondition: string = "cd_cli_cpf = ";
export const databaseQueryCdCliCpaCondition: string = " AND cd_cli_cpa = 'T'";
export const databaseQueryCdCliCnpjCondition: string = "cd_cli_doc = ";
export const databaseQueryCdCtcelSer: string = "cd_ctcel_ser = ";
export const databaseContagem: string = "CONTAGEM";
export const databaseCountAll: string = `count(*) as ${databaseContagem.toLocaleLowerCase()}`;
export const memoryContagem: string = `${sysControlPanel.hashString}${databaseContagem}${sysControlPanel.dollarString}`;

export const devEnvironmentName: string = "dev";
export const qaEnvironmentName: string = "qa";
export const sandboxEnvironmentName: string = "sandbox";
export const stgEnvironmentName: string = "stg";
export const stressEnvironmentName: string = "stress";

export const doubleDashAtStartRegex: RegExp = /^\-+/;
export const memoryReferenceRegex: RegExp = /(#)([^\s#$]+)(\.[^\s#$]+)*(\$)/g;
export const queryValidationRegex: RegExp = /(''|[^'])*\b(\w*delete\w*|\w*drop\w*|\w*alter\w*|\w*create\w*)\b/;
export const simpleQuoteDetectionRegex: RegExp = /\'/g

export const defaultTestFolder: string = "testData";
export const dataFolderString: string = "dataFolder";
export const dataFilePath: string = "dataFiles.json";

export const cpfVariableName: string = "CPF";
export const cnpjVariableName: string = "CNPJ";
export const nameVariableName: string = "NOME";
export const surnameVariableName: string = "SOBRENOME";
export const fullNameVariableName: string = "NOME COMPLETO";
export const emailVariableName: string = "EMAIL";
export const cellphoneVariableName: string = "CELULAR";
export const landlineVariableName: string = "TELEFONE";
export const zipcodeVariableName: string = "CEP";
export const addressNumberVariableName: string = "NÚMERO";
export const addressComplementVariableName: string = "COMPLEMENTO";
export const birthdayVariableName: string = "ANIVERSÁRIO";
export const imeiUpperVariableName: string = sysControlPanel.imeiVariableName.toLocaleUpperCase();

export const numberGeneratorMin: number = 1;
export const numberGeneratorMax: number = 99999;
export const minYearBirthday: number = 1935;
export const maxYearBirthday: number = 2002;
export const minMonthBirthday: number = 1;
export const maxMonthBirthday: number = 12;

export const minDayNumber: number = 1;
export const shortMonthDayNumber: number = 28;
export const longMonthDayNumber: number = 30;
export const longerMonthDayNumber: number = 31;

export const januaryMonthNumber: number = 1;
export const februaryMonthNumber: number = 2;
export const marchMonthNumber: number = 3;
export const aprilMonthNumber: number = 4;
export const mayMonthNumber: number = 5;
export const juneMonthNumber: number = 6;
export const julyMonthNumber: number = 7;
export const augustMonthNumber: number = 8;
export const septemberMonthNumber: number = 9;
export const octoberMonthNumber: number = 10;
export const novemberMonthNumber: number = 11;
export const decemberMonthNumber: number = 12;

export const twoDigitThreshold: number = 10;

export const cellphoneTemplateString: string = "119";
export const cellphoneNumberGenerationTarget: number = 8;
export const landlineTemplateString: string = "114";
export const landlineNumberGenerationTarget: number = 7;
export const phoneDigitNumberLimit: number = 9;

// String Builders
export function BuildInvalidEnvironmentErrorMessage(incorrectEnvironmentReceived: string): string {
    return `Could not determine what database environment to use from environment name. Defaulting to HMLBAT. Environment received: '${incorrectEnvironmentReceived}'.`;
}

export function BuildOnlyNumericString(rawText: string): string {
    return rawText.replace(/[^0-9]/g, "");
}

export function BuildClientCpfCondition(cpf): string {
    return `${databaseQueryCdCliCondition}${singleQuoteString}${cpf}${singleQuoteString}`;
}

export function BuildClientCnpjCondition(cnpj): string {
    return `${databaseQueryCdCliCnpjCondition}${singleQuoteString}${cnpj}${singleQuoteString}${databaseQueryCdCliCpaCondition}`;
}

export function BuildPcsCelQueryCondition(imeiNumber: string): string {
    return `${databaseQueryCdCtcelSer}${singleQuoteString}${imeiNumber}${singleQuoteString}`;
}

export function BuildUnknownMemoryFetchErrorMessage(inputData: string): string {
    return `Unknown error while fetching '${inputData}' from memory.`;
}

export function BuildEmptyResultQueryErrorMessage(): string {
    return `A query retornou vazia, por favor rever a sua query`;
}

export function BuildInvalidRandomGeneratorOption(options: string[]): string {
    return `String seletora inválida. As opções são: ${options}`;
}

export function BuildInvalidMonthErrorMessage(): string {
    return `Invalid month number input.`;
}