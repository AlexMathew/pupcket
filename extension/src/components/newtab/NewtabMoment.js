import React from "react";
import { Helmet } from "react-helmet";
import NoMoments from "./NoMoments";
import { MOMENTS_STORAGE_FIELD } from "../../constants";

class NewtabMoment extends React.Component {
  state = {
    image: "",
  };

  componentDidMount() {
    chrome.storage.local.get(MOMENTS_STORAGE_FIELD, (result) => {
      const moments = result[[MOMENTS_STORAGE_FIELD]];
      if (moments === undefined || moments.length === 0) {
        this.setState({ image: null });
      }
      const imageIndex = Math.floor(Math.random() * moments.length);
      this.setState({ image: moments[imageIndex].screenshot_url });
    });
  }

  render() {
    if (this.state.image === null) {
      return <NoMoments />;
    }
    return (
      <div>
        <Helmet>
          <link rel="preload" as="image" href={this.state.image} />
        </Helmet>
        <div
          className="container"
          style={{ backgroundImage: `url(${this.state.image})` }}
        ></div>
        <div
          className="center"
          style={{ backgroundImage: `url(${this.state.image})` }}
        ></div>
      </div>
    );
  }
}

export default NewtabMoment;
