from .base import Screenshot


class Twitter(Screenshot):
    SECTION_SELECTOR = "//article[@role='article']"

    def crop_area(self, section):
        location = section.location
        size = section.size

        return (
            location["x"],
            location["y"],
            (location["x"]) + (size["width"]),
            (location["y"]) + (size["height"]),
        )
