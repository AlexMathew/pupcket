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

export async function saveMoment(url) {
  const save = new Promise((resolve, reject) => {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], async (result) => {
      const { auth_token } = result[[AUTH_TOKEN_FIELD]];
      if (auth_token !== undefined && auth_token !== null) {
        try {
          const response = await pupcket.post(
            "/moment/",
            { url },
            {
              headers: {
                Authorization: `Token ${auth_token}`,
              },
            }
          );

          resolve(response);
        } catch (error) {
          if (error.response?.status === 401) {
            chrome.storage.local.remove([AUTH_TOKEN_FIELD]);
            chrome.runtime.openOptionsPage();
          }
          reject();
        }
      } else {
        chrome.runtime.openOptionsPage();
      }
    });
  });

  return await save;
}
