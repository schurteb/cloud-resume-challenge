import { fullpageApi } from "@fullpage/react-fullpage";

// Property needs explicit declaration to make typescript happy
declare global {
    interface Window { fullpage_api: fullpageApi; }
}