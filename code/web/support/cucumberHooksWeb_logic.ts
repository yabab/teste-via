import * as controlPanel from "./cucumberHooksWeb_controlPanel";
import * as cucumber from "cucumber";
import * as sysControlPanel from "../../general/support/system_controlPanel";

cucumber.Before(
    async function(
        this: cucumber.World,
        scenario: cucumber.HookScenarioResult
    ): Promise<void> {
        try {
            console.log(sysControlPanel.BuildTestCaseConsoleHeader(scenario.pickle));
        } catch(err) {
            return Promise.reject(err);
        }

        return Promise.resolve();
    }
);