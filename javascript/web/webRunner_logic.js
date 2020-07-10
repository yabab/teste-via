"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = __importStar(require("child_process"));
const controlPanel = __importStar(require("./webRunner_controlPanel"));
const generalUtils = __importStar(require("../general/support/generalUtils_logic"));
const sysControlPanel = __importStar(require("../general/support/system_controlPanel"));
const command = controlPanel.protractorCommandTemplate;
const disableChecksFlag = controlPanel.protractorDisableChecksFlag;
let loopFlag = false;
let loopIteration = undefined;
let loopLimit = undefined;
let loopTimeout = undefined;
let testStartMoment = undefined;
function initializeProtractorRun(configFileName, browserName) {
    try {
        const configFilePath = controlPanel.BuildJavascriptWebConfigFilesPath(configFileName);
        const stringArgs = [
            configFilePath,
            disableChecksFlag
        ];
        for (let idx = controlPanel.webArgumentIndexOffset; idx <= process.argv.length - 1; idx++) {
            if (process.argv[idx].includes(sysControlPanel.equalsString)) {
                const valueArray = process.argv[idx].split(sysControlPanel.equalsString);
                let variableKey = valueArray[0];
                let variableValue = valueArray[1];
                if (variableKey === sysControlPanel.tagsParameterName) {
                    variableKey = controlPanel.webCucumberTagsParameter;
                }
                if (variableKey === sysControlPanel.loopIterationVariableName) {
                    loopIteration = parseInt(variableValue, sysControlPanel.parseIntDecimalRadix);
                }
                if (valueArray[0] === sysControlPanel.loopLimitVariableName) {
                    loopLimit = parseInt(valueArray[1], sysControlPanel.parseIntDecimalRadix);
                    if (loopLimit <= sysControlPanel.loopLimitMinimumThreshold) {
                        throw new Error(sysControlPanel.BuildLoopLimitUnderThresholdError(loopLimit));
                    }
                }
                if (valueArray[0] === sysControlPanel.loopTimeoutVariableName) {
                    loopTimeout = parseInt(valueArray[1], sysControlPanel.parseIntDecimalRadix);
                    if (loopTimeout < sysControlPanel.loopTimeoutMinimumThreshold) {
                        throw new Error(sysControlPanel.BuildLoopTimeoutUnderThresholdError(loopTimeout));
                    }
                    else {
                        loopTimeout = loopTimeout * sysControlPanel.oneSecondInMilliseconds;
                    }
                }
                if (variableKey === controlPanel.webRemoteServerParameterName) {
                    variableKey = controlPanel.remoteServerInternalParameter;
                    if (!variableValue.includes(controlPanel.seleniumServerHubEndpoint)) {
                        variableValue = variableValue + controlPanel.seleniumServerHubEndpoint;
                    }
                }
                if (variableKey.includes(sysControlPanel.doubleDashString)) {
                    stringArgs.push(sysControlPanel.BuildKeyValueParameter(variableKey, variableValue));
                }
                else {
                    stringArgs.push(sysControlPanel.BuildKeyValueParameter(variableKey, variableValue, true));
                }
            }
            else {
                if (process.argv[idx] === sysControlPanel.loopFlagVariableName) {
                    loopFlag = true;
                }
                if (process.argv[idx] === controlPanel.webHeadlessParameterName) {
                    if (browserName === sysControlPanel.webChromeExecutionName) {
                        stringArgs.push(...controlPanel.webHeadlessCapabilitiesArray);
                    }
                    else if (browserName === sysControlPanel.webFirefoxExecutionName) {
                    }
                    else if (browserName === sysControlPanel.BuildExecutionNameWithOldPrefix(sysControlPanel.webFirefoxExecutionName)) {
                    }
                }
                else if (process.argv[idx].includes(sysControlPanel.doubleDashString)) {
                    stringArgs.push(sysControlPanel.BuildKeywordParameter(process.argv[idx]));
                }
                else {
                    stringArgs.push(sysControlPanel.BuildKeywordParameter(process.argv[idx], true));
                }
            }
        }
        if (loopFlag && loopIteration === undefined) {
            loopIteration = 1;
            stringArgs.push(sysControlPanel.BuildKeyValueParameter(sysControlPanel.loopIterationVariableName, loopIteration.toString(), true));
        }
        testStartMoment = Date.now();
        protractorChildProcessBuiler(command, stringArgs);
    }
    catch (err) {
        throw new Error(err);
    }
    return;
}
exports.initializeProtractorRun = initializeProtractorRun;
function protractorChildProcessBuiler(commandString, processArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        const childProcess = yield child_process.spawn(commandString, processArgs, {
            shell: true,
            cwd: process.cwd(),
            stdio: sysControlPanel.childProcessStdIoOption
        });
        childProcess.on(sysControlPanel.childProcessExitEventName, (fnArgs) => {
            if (loopLimit !== undefined && loopIteration >= loopLimit) {
                loopFlag = false;
                process.stdin.pause();
            }
            if (loopTimeout !== undefined && Date.now() - testStartMoment >= loopTimeout) {
                loopFlag = false;
                process.stdin.pause();
            }
            if (loopFlag) {
                let nextLoopNumber = loopIteration + 1;
                console.log(sysControlPanel.BuildNewIterationConsoleHeader(nextLoopNumber));
                processArgs = generalUtils.alterEntry(processArgs, sysControlPanel.BuildKeyValueParameter(sysControlPanel.loopIterationVariableName, loopIteration.toString(), true), sysControlPanel.BuildKeyValueParameter(sysControlPanel.loopIterationVariableName, nextLoopNumber.toString(), true));
                loopIteration = nextLoopNumber;
                protractorChildProcessBuiler(commandString, processArgs);
                process.stdin.setRawMode(true);
                process.stdin.setEncoding(sysControlPanel.standardInputEncodingOption);
                process.stdin.resume();
                process.stdin.on(sysControlPanel.standardInputDataEventName, (fnData) => {
                    if (fnData === sysControlPanel.asciiStringCtrlC) {
                        process.exit();
                    }
                    else if (fnData === sysControlPanel.childProcessLoopExitKey) {
                        loopFlag = false;
                        process.stdin.pause();
                    }
                });
            }
        });
        return childProcess;
    });
}
//# sourceMappingURL=webRunner_logic.js.map