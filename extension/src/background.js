import { fetchMoments, saveMoment } from "./utils/pupcket";

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  chrome.runtime.openOptionsPage();
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
  saveMoment(tab.url);
});
