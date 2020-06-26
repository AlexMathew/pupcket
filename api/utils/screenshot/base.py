import time
from abc import abstractmethod

from PIL import Image
from selenium.webdriver.common.keys import Keys

from .driver import Driver


class Screenshot:
    SECTION_SELECTOR = None

    def __init__(self, url, filename):
        self.url = url
        self.filename = filename

    @abstractmethod
    def crop_area(self, section):
        """
        Returns a 4-tuple to crop image - (left, upper, right, lower)
        """
        pass

    def generate_screenshot(self):
        with Driver() as driver:
            driver.get(self.url)
            driver.maximize_window()
            time.sleep(5)
            if self.SECTION_SELECTOR:
                section = driver.find_element_by_xpath(self.SECTION_SELECTOR)
                driver.execute_script(
                    "return arguments[0].scrollIntoView(true);", section
                )
                for _ in range(10):
                    driver.find_element_by_tag_name("body").send_keys(Keys.PAGE_UP)
                self._area = self.crop_area(section)
            driver.save_screenshot(f"/tmp/{self.filename}_original.png")
            if section:
                self._crop_screenshot()

    def _crop_screenshot(self):
        image = Image.open(f"/tmp/{self.filename}_original.png")
        cropped = image.crop(self._area)
        cropped.save(f"/tmp/{self.filename}.png")
