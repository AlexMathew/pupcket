from selenium import webdriver


class Driver:
    CHROMEDRIVER = "/usr/local/bin/chromedriver"
    USER_AGENT = (
        "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 "
        "Safari/537.36"
    )

    def __enter__(self):
        self._driver = webdriver.Chrome(self.CHROMEDRIVER, options=self._options)
        return self._driver

    def __exit__(self, exc_type, exc_value, traceback):
        self._driver.close()

    @property
    def _options(self):
        options = webdriver.ChromeOptions()
        options.add_argument("disable-infobars")
        options.add_argument(self.USER_AGENT)
        options.add_argument("--headless")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-gpu")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-setuid-sandbox")
        options.add_argument("--window-size=1920, 1200")

        return options
