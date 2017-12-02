#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

THEME = './pelican-themes/attila'
PYGMENTS_STYLE = 'solarizedlight'
MD_EXTENSIONS = ['linkify', 'del_ins', 'fenced_code', 'codehilite(css_class=highlight)', 'tables']
SHARE = True
TAG_SAVE_AS = ''
AUTHOR = 'shufo'
AUTHOR_SAVE_AS = ''
DIRECT_TEMPLATES = ('index', 'categories', 'archives')
TIPUE_SEARCH_SAVE_AS = 'tipue_search.json'
TWITTER_USERNAME = 'shufo_'
DISQUS_SITENAME = 'shufo'
FEED_ALL_ATOM = 'feeds/all.atom.xml'
DELETE_OUTPUT_DIRECTORY = True
LOAD_CONTENT_CACHE = False

AUTHOR = u'shufo'
SITENAME = u'shufo blog'
SITEURL = 'http://shufo.github.io/'
ALT_NAME = "#! " + SITENAME
SITESUBTITLE = "Random automation stuff"
FAVICON = '/images/favicon.ico'
FAVICON_TYPE = 'image/vnd.microsoft.icon'
META_IMAGE = SITEURL + "/static/img/og_logo.jpg"
META_IMAGE_TYPE = "image/jpeg"
GITHUB_URL = "https://github.com/shufo/"

PATH = 'content'

TIMEZONE = 'Asia/Tokyo'

DEFAULT_LANG = u'ja'
DEFAULT_DATE_FORMAT = '%Y %b/%d (%a)'

# Feed generation is usually not desired when developing
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
STATIC_PATHS = ['images', 'static']
GOOGLE_ANALYTICS = 'UA-1113986-11'

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('Twitter', 'https://twitter.com/shufo_'),
         ('Github', 'https://github.com/shufo'),
         ('envelope', 'mailto:meikyowise@gmail.com'),)

FOOTER = ("&copy; 2017 shufo. All rights reserved.<br>" +
              "Code snippets in the pages are released under " +
              "<a href=\"http://opensource.org/licenses/MIT\" target=\"_blank\">" +
              "The MIT License</a>, unless otherwise specified.")

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

PLUGIN_PATHS = ['pelican-plugins']
PLUGINS = ['assets', 'sitemap', 'optimize_images']
SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly'
    }
}

HEADER_COVER = 'assets/header.jpg'


# Author
AUTHOR_URL = 'author/{slug}'
AUTHOR_SAVE_AS = 'author/{slug}/index.html'
AUTHORS_SAVE_AS = 'authors.html'

CATEGORY_URL = 'category/{slug}'
CATEGORY_SAVE_AS = 'category/{slug}/index.html'
CATEGORIES_SAVE_AS = 'catgegories.html'
TAG_URL = 'tag/{slug}'
TAG_SAVE_AS = 'tag/{slug}/index.html'
TAGS_SAVE_AS = 'tags.html'
ARCHIVES_URL       = 'archives'
ARCHIVES_SAVE_AS   = 'archives/index.html'

ARTICLE_URL = '{slug}.html'
ARTICLE_SAVE_AS = '{slug}.html'
PAGE_URL = 'pages/{slug}/'
PAGE_SAVE_AS = 'pages/{slug}/index.html'
YEAR_ARCHIVE_SAVE_AS = '{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%Y}/{date:%m}/index.html'

MENUITEMS = (
	('About', '/hello-world.html'),
    ('Categories', '/categories'),
	('GitHub', 'https://github.com/shufo')
)

AUTHORS_BIO = {
  "shufo": {
    "name": "shufo",
    "cover": "https://avatars1.githubusercontent.com/u/1641039?s=400&u=e76a7e80d95805075226c95b7fc576ac0df4b6f1&v=4",
    "image": "https://avatars1.githubusercontent.com/u/1641039?s=400&u=e76a7e80d95805075226c95b7fc576ac0df4b6f1&v=4",
"website": "http://github.com/shufo",
    "location": "Tokyo"
  }
}

STATIC_PATHS = ['assets']
