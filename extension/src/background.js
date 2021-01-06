import { fetchMoments } from "./utils/pupcket";

const REFRESH_HOURS = 1;

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  // chrome.runtime.openOptionsPage();
  chrome.alarms.create("refresh", { periodInMinutes: REFRESH_HOURS * 60 });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "twitter.com", pathContains: "/status/" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  prefetchMoments();
});

function prefetchMoments() {
  fetchMoments();
}
