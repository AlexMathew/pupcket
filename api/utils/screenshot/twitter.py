from .base import Screenshot


class Twitter(Screenshot):
    SECTION_SELECTOR = "//div[@class='twitter-tweet twitter-tweet-rendered']"

    def generate_viewer_url(self, url):
        return f"https://viewer.getpawcket.com/twitter?url={url}"

    def crop_area(self, section):
        location = section.location
        size = section.size

        return (
            location["x"],
            location["y"],
            (location["x"]) + (size["width"]),
            (location["y"]) + (size["height"]),
        )
