import React, { useEffect } from "react";

export default function Twitter(props) {
  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search);
    const twitterUrl = urlParams.get("url");
    if (twitterUrl) {
      document.getElementsByClassName("pawcket-tweet")[0].innerHTML = "";
      const tweetId = twitterUrl.replace(/\/+$/, "").split("/").slice(-1)[0];
      window.twttr.widgets.createTweet(
        tweetId,
        document.getElementsByClassName("pawcket-tweet")[0],
        {
          align: "center",
        }
      );
    }
  }, [props.location.search]);

  return (
    <div
      className="pawcket-tweet"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
}
