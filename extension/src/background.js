import { AUTH_TOKEN_FIELD } from "./constants";

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  chrome.alarms.create("refresh", { periodInMinutes: 0.25 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name);
  helloWorld();
});

function helloWorld() {
  chrome.storage.local.get(AUTH_TOKEN_FIELD, (result) => {
    console.log(result);
  });
}
