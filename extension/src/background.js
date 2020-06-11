import { fetchMoments } from "./utils/pupcket";

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  chrome.alarms.create("refresh", { periodInMinutes: 10 });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "twitter.com" },
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

chrome.pageAction.onClicked.addListener((tab) => {
  console.log(tab.url);
});
