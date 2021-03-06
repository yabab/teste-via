import { GenericStringMap } from "./customTypes_logic";
export declare function sortEnvVariables(processEnvironment: string[], startingLocation?: number): void;
export declare function getEnvVar(key: string): any;
export declare function loadJsons(customTestFolder: string): void;
export declare function shuffle(array: any[]): any[];
export declare function getFromMemory(input: string): string;
export declare function dig(stringIndex: string): any;
export declare function insert(index: string, value: any): void;
export declare function getFullMemory(): GenericStringMap;
export declare function alterEntry(array: any[], elementToSearch: any, substituteElement: any, pushIfNotFound?: boolean): any[];
export declare function replaceSimpleQuotesIfPresent(stringValue: string): string;
