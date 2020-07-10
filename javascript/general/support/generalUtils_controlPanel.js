"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sysControlPanel = __importStar(require("../support/system_controlPanel"));
exports.semiColonString = ";";
exports.singleQuoteString = "'";
exports.escapedDoubleQuotesString = "\"";
exports.subkeysJsonKey = "chaves";
exports.hmlbatSchemaName = "DBHMVS.HMLBAT.";
exports.jtrachSchemaName = "DBPMVS.JTRACH.";
exports.databaseClientTable = "cli";
exports.databaseQueryCdCliCondition = "cd_cli_cpf = ";
exports.databaseQueryCdCliCpaCondition = " AND cd_cli_cpa = 'T'";
exports.databaseQueryCdCliCnpjCondition = "cd_cli_doc = ";
exports.databaseQueryCdCtcelSer = "cd_ctcel_ser = ";
exports.databaseContagem = "CONTAGEM";
exports.databaseCountAll = `count(*) as ${exports.databaseContagem.toLocaleLowerCase()}`;
exports.memoryContagem = `${sysControlPanel.hashString}${exports.databaseContagem}${sysControlPanel.dollarString}`;
exports.devEnvironmentName = "dev";
exports.qaEnvironmentName = "qa";
exports.sandboxEnvironmentName = "sandbox";
exports.stgEnvironmentName = "stg";
exports.stressEnvironmentName = "stress";
exports.doubleDashAtStartRegex = /^\-+/;
exports.memoryReferenceRegex = /(#)([^\s#$]+)(\.[^\s#$]+)*(\$)/g;
exports.queryValidationRegex = /(''|[^'])*\b(\w*delete\w*|\w*drop\w*|\w*alter\w*|\w*create\w*)\b/;
exports.simpleQuoteDetectionRegex = /\'/g;
exports.defaultTestFolder = "testData";
exports.dataFolderString = "dataFolder";
exports.dataFilePath = "dataFiles.json";
exports.cpfVariableName = "CPF";
exports.cnpjVariableName = "CNPJ";
exports.nameVariableName = "NOME";
exports.surnameVariableName = "SOBRENOME";
exports.fullNameVariableName = "NOME COMPLETO";
exports.emailVariableName = "EMAIL";
exports.cellphoneVariableName = "CELULAR";
exports.landlineVariableName = "TELEFONE";
exports.zipcodeVariableName = "CEP";
exports.addressNumberVariableName = "NÚMERO";
exports.addressComplementVariableName = "COMPLEMENTO";
exports.birthdayVariableName = "ANIVERSÁRIO";
exports.imeiUpperVariableName = sysControlPanel.imeiVariableName.toLocaleUpperCase();
exports.numberGeneratorMin = 1;
exports.numberGeneratorMax = 99999;
exports.minYearBirthday = 1935;
exports.maxYearBirthday = 2002;
exports.minMonthBirthday = 1;
exports.maxMonthBirthday = 12;
exports.minDayNumber = 1;
exports.shortMonthDayNumber = 28;
exports.longMonthDayNumber = 30;
exports.longerMonthDayNumber = 31;
exports.januaryMonthNumber = 1;
exports.februaryMonthNumber = 2;
exports.marchMonthNumber = 3;
exports.aprilMonthNumber = 4;
exports.mayMonthNumber = 5;
exports.juneMonthNumber = 6;
exports.julyMonthNumber = 7;
exports.augustMonthNumber = 8;
exports.septemberMonthNumber = 9;
exports.octoberMonthNumber = 10;
exports.novemberMonthNumber = 11;
exports.decemberMonthNumber = 12;
exports.twoDigitThreshold = 10;
exports.cellphoneTemplateString = "119";
exports.cellphoneNumberGenerationTarget = 8;
exports.landlineTemplateString = "114";
exports.landlineNumberGenerationTarget = 7;
exports.phoneDigitNumberLimit = 9;
function BuildInvalidEnvironmentErrorMessage(incorrectEnvironmentReceived) {
    return `Could not determine what database environment to use from environment name. Defaulting to HMLBAT. Environment received: '${incorrectEnvironmentReceived}'.`;
}
exports.BuildInvalidEnvironmentErrorMessage = BuildInvalidEnvironmentErrorMessage;
function BuildOnlyNumericString(rawText) {
    return rawText.replace(/[^0-9]/g, "");
}
exports.BuildOnlyNumericString = BuildOnlyNumericString;
function BuildClientCpfCondition(cpf) {
    return `${exports.databaseQueryCdCliCondition}${exports.singleQuoteString}${cpf}${exports.singleQuoteString}`;
}
exports.BuildClientCpfCondition = BuildClientCpfCondition;
function BuildClientCnpjCondition(cnpj) {
    return `${exports.databaseQueryCdCliCnpjCondition}${exports.singleQuoteString}${cnpj}${exports.singleQuoteString}${exports.databaseQueryCdCliCpaCondition}`;
}
exports.BuildClientCnpjCondition = BuildClientCnpjCondition;
function BuildPcsCelQueryCondition(imeiNumber) {
    return `${exports.databaseQueryCdCtcelSer}${exports.singleQuoteString}${imeiNumber}${exports.singleQuoteString}`;
}
exports.BuildPcsCelQueryCondition = BuildPcsCelQueryCondition;
function BuildUnknownMemoryFetchErrorMessage(inputData) {
    return `Unknown error while fetching '${inputData}' from memory.`;
}
exports.BuildUnknownMemoryFetchErrorMessage = BuildUnknownMemoryFetchErrorMessage;
function BuildEmptyResultQueryErrorMessage() {
    return `A query retornou vazia, por favor rever a sua query`;
}
exports.BuildEmptyResultQueryErrorMessage = BuildEmptyResultQueryErrorMessage;
function BuildInvalidRandomGeneratorOption(options) {
    return `String seletora inválida. As opções são: ${options}`;
}
exports.BuildInvalidRandomGeneratorOption = BuildInvalidRandomGeneratorOption;
function BuildInvalidMonthErrorMessage() {
    return `Invalid month number input.`;
}
exports.BuildInvalidMonthErrorMessage = BuildInvalidMonthErrorMessage;
//# sourceMappingURL=generalUtils_controlPanel.js.map