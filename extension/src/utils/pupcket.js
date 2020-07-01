import {
  AUTH_TOKEN_FIELD,
  MOMENTS_STORAGE_FIELD,
  MOMENTS_COUNT_FIELD,
} from "../constants";
import pupcket from "../api/pupcket";

export function fetchMoments() {
  chrome.storage.local.get(
    [AUTH_TOKEN_FIELD, MOMENTS_COUNT_FIELD],
    (result) => {
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
            const total = response.data.count;
            chrome.storage.local.set(
              { [MOMENTS_STORAGE_FIELD]: moments },
              () => {
                console.log(`${moments.length} moments stored`);
              }
            );
            chrome.storage.local.set({ [MOMENTS_COUNT_FIELD]: total });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
}

export function saveMoment(url) {
  chrome.storage.local.get(
    [AUTH_TOKEN_FIELD, MOMENTS_COUNT_FIELD],
    (result) => {
      const { auth_token } = result[[AUTH_TOKEN_FIELD]];
      const count = result[[MOMENTS_COUNT_FIELD]];
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
          .then(() => {
            if (count === 0) {
              fetchMoments();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        chrome.runtime.openOptionsPage();
      }
    }
  );
}
