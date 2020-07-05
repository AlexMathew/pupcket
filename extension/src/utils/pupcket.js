import { AUTH_TOKEN_FIELD, MOMENTS_STORAGE_FIELD } from "../constants";
import pupcket from "../api/pupcket";

export function fetchMoments() {
  chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
    const { auth_token } = result[[AUTH_TOKEN_FIELD]];
    if (auth_token !== undefined) {
      pupcket
        .get("/moment/random/", {
          headers: {
            Authorization: `Token ${auth_token}`,
          },
        })
        .then((response) => {
          const moments = response.data.results;
          chrome.storage.local.set({ [MOMENTS_STORAGE_FIELD]: moments }, () => {
            console.log(`${moments.length} moments stored`);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

export function saveMoment(url) {
  chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
    const { auth_token } = result[[AUTH_TOKEN_FIELD]];
    if (auth_token !== undefined && auth_token !== null) {
      pupcket
        .post(
          "/moment/",
          { url },
          {
            headers: {
              Authorization: `Token ${auth_token}`,
            },
          }
        )
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      chrome.runtime.openOptionsPage();
    }
  });
}
