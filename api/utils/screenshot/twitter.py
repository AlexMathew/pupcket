import re

from .base import Screenshot


class Twitter(Screenshot):
    SECTION_SELECTOR = "//div[@class='twitter-tweet twitter-tweet-rendered']"
    PHOTO_URL_RE = r"\d+\/photo\/"

    @classmethod
    def _clean_photo_url(cls, url):
        if re.search(cls.PHOTO_URL_RE, url):
            index = url.rfind("photo/")
            return url[:index]

        return url

    def generate_viewer_url(self, url):
        url = self._clean_photo_url(url)
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
