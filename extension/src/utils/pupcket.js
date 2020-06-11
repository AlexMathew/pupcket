import { AUTH_TOKEN_FIELD, MOMENTS_STORAGE_FIELD } from "../constants";
import pupcket from "../api/pupcket";

export function fetchMoments() {
  chrome.storage.local.get(AUTH_TOKEN_FIELD, (result) => {
    const token = result[[AUTH_TOKEN_FIELD]];
    if (token !== undefined) {
      pupcket
        .get("/moment/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const moments = response.data.results;
          chrome.storage.local.set({ [MOMENTS_STORAGE_FIELD]: moments }, () => {
            console.log(`${response.data.count} moments stored`);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}
