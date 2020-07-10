import * as child_process from "child_process";
import * as controlPanel from "./webRunner_controlPanel";
import * as generalUtils from "../general/support/generalUtils_logic";
import * as sysControlPanel from "../general/support/system_controlPanel";

const command = controlPanel.protractorCommandTemplate;
const disableChecksFlag = controlPanel.protractorDisableChecksFlag;

let loopFlag: boolean = false;
let loopIteration: number = undefined;
let loopLimit: number = undefined;
let loopTimeout: number = undefined;
let testStartMoment: number = undefined;

export function initializeProtractorRun(
    configFileName: string,
    browserName: string
): void {
    try {
        const configFilePath = controlPanel.BuildJavascriptWebConfigFilesPath(configFileName);

        const stringArgs: string[] = [
            configFilePath,
            disableChecksFlag
        ];

        for (
            let idx = controlPanel.webArgumentIndexOffset;
            idx <= process.argv.length - 1;
            idx++
        ) {
            if (process.argv[idx].includes(sysControlPanel.equalsString)) {
                const valueArray = process.argv[idx].split(sysControlPanel.equalsString);
                let variableKey = valueArray[0];
                let variableValue = valueArray[1];

                if (variableKey === sysControlPanel.tagsParameterName) {
                    variableKey = controlPanel.webCucumberTagsParameter;
                }

                if (variableKey === sysControlPanel.loopIterationVariableName) {
                    loopIteration = parseInt(
                        variableValue,
                        sysControlPanel.parseIntDecimalRadix
                    );
                }

                if (valueArray[0] === sysControlPanel.loopLimitVariableName) {
                    loopLimit = parseInt(
                        valueArray[1],
                        sysControlPanel.parseIntDecimalRadix
                    );
    
                    if (loopLimit <= sysControlPanel.loopLimitMinimumThreshold) {
                        throw new Error(sysControlPanel.BuildLoopLimitUnderThresholdError(loopLimit));
                    }
                }
    
                if (valueArray[0] === sysControlPanel.loopTimeoutVariableName) {
                    loopTimeout = parseInt(
                        valueArray[1],
                        sysControlPanel.parseIntDecimalRadix
                    );
    
                    if (loopTimeout < sysControlPanel.loopTimeoutMinimumThreshold) {
                        throw new Error(sysControlPanel.BuildLoopTimeoutUnderThresholdError(loopTimeout));
                    } else {
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
                    stringArgs.push(
                        sysControlPanel.BuildKeyValueParameter(
                            variableKey,
                            variableValue
                        )
                    );
                } else {
                    stringArgs.push(
                        sysControlPanel.BuildKeyValueParameter(
                            variableKey,
                            variableValue,
                            true
                        )
                    );
                }
            } else {
                if (process.argv[idx] === sysControlPanel.loopFlagVariableName) {
                    loopFlag = true;
                }

                if (process.argv[idx] === controlPanel.webHeadlessParameterName) {
                    if (browserName === sysControlPanel.webChromeExecutionName) {
                        stringArgs.push(...controlPanel.webHeadlessCapabilitiesArray);
                    } else if (browserName === sysControlPanel.webFirefoxExecutionName) {
                        // TBD
                    } else if (
                        browserName === sysControlPanel.BuildExecutionNameWithOldPrefix(
                            sysControlPanel.webFirefoxExecutionName
                        )
                    ) {
                        // TBD
                    }
                } else if (process.argv[idx].includes(sysControlPanel.doubleDashString)) {
                    stringArgs.push(sysControlPanel.BuildKeywordParameter(process.argv[idx]));
                } else {
                    stringArgs.push(sysControlPanel.BuildKeywordParameter(process.argv[idx], true));
                }
            }
        }

        if (loopFlag && loopIteration === undefined) {
            loopIteration = 1;
            
            stringArgs.push(
                sysControlPanel.BuildKeyValueParameter(
                    sysControlPanel.loopIterationVariableName,
                    loopIteration.toString(),
                    true
                )
            )
        }

        testStartMoment = Date.now();
        protractorChildProcessBuiler(command, stringArgs);
    } catch(err) {
        throw new Error(err);
    }

    return;
}

async function protractorChildProcessBuiler(
    commandString: string,
    processArgs: string[]
): Promise<child_process.ChildProcess> {
    const childProcess = await child_process.spawn(
        commandString,
        processArgs,
        {
            shell : true,
            cwd : process.cwd(),
            stdio : sysControlPanel.childProcessStdIoOption
        }
    );

    childProcess.on(
        sysControlPanel.childProcessExitEventName,
        (fnArgs: any[]) => {
            if (loopLimit !== undefined && loopIteration >= loopLimit) {
                loopFlag = false;
                process.stdin.pause();
            }

            if (loopTimeout !== undefined && Date.now() - testStartMoment >= loopTimeout) {
                loopFlag = false;
                process.stdin.pause();
            }

            if (loopFlag) {
                let nextLoopNumber: number = loopIteration + 1;

                console.log(sysControlPanel.BuildNewIterationConsoleHeader(nextLoopNumber));

                processArgs = generalUtils.alterEntry(
                    processArgs,
                    sysControlPanel.BuildKeyValueParameter(
                        sysControlPanel.loopIterationVariableName,
                        loopIteration.toString(),
                        true
                    ),
                    sysControlPanel.BuildKeyValueParameter(
                        sysControlPanel.loopIterationVariableName,
                        nextLoopNumber.toString(),
                        true
                    )
                )

                loopIteration = nextLoopNumber;

                protractorChildProcessBuiler(
                    commandString,
                    processArgs
                );

                process.stdin.setRawMode(true);
                process.stdin.setEncoding(sysControlPanel.standardInputEncodingOption);
                process.stdin.resume();

                process.stdin.on(
                    sysControlPanel.standardInputDataEventName,
                    (fnData: any) => {
                        if (fnData === sysControlPanel.asciiStringCtrlC) {
                            process.exit();
                        } else if (fnData === sysControlPanel.childProcessLoopExitKey) {
                            loopFlag = false;
                            process.stdin.pause();
                        }
                    }
                );
            }
        }
    )

    return childProcess;
}