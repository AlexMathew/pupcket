import { fetchMoments } from "./utils/pupcket";

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  chrome.alarms.create("refresh", { periodInMinutes: 10 });
});

chrome.alarms.onAlarm.addListener(() => {
  prefetchMoments();
});

function prefetchMoments() {
  fetchMoments();
}
