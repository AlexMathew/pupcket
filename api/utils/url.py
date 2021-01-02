from urllib.parse import urlparse


URL_TYPE_MAPPING = {
    "twitter.com": "twitter",
}


def get_url_type(url):
    parsed = urlparse(url)
    site = ".".join(parsed.netloc.split(".")[-2:])
    return URL_TYPE_MAPPING.get(site) or ""
