from selenium import webdriver


def get_options():
    options = webdriver.ChromeOptions()
    options.add_argument("disable-infobars")
    options.add_argument("--headless")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-setuid-sandbox")
    options.add_argument("--window-size=1920, 1200")

    return options


class Driver:
    CHROMEDRIVER = "/usr/local/bin/chromedriver"

    def __init__(self):
        self._options = get_options()

    def __enter__(self):
        self._driver = webdriver.Chrome(self.CHROMEDRIVER, options=self._options)
        return self._driver

    def __exit__(self, exc_type, exc_value, traceback):
        self._driver.close()
