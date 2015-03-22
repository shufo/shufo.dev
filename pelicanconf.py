#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

THEME = './pelican-themes/pelican-mg'
PYGMENTS_STYLE = 'solarizedlight'
MD_EXTENSIONS = ['linkify', 'del_ins', 'fenced_code', 'codehilite(css_class=highlight)', 'tables']
SHARE = True
TAG_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
DIRECT_TEMPLATES = ('index', 'categories', 'archives', 'search', 'tipue_search')
TIPUE_SEARCH_SAVE_AS = 'tipue_search.json'
TWITTER_USERNAME = 'shufo_'
DISQUS_SITENAME = 'shufo'
FEED_ALL_ATOM = 'feeds/all.atom.xml'
DELETE_OUTPUT_DIRECTORY = True

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
SOCIAL = (('twitter', 'https://twitter.com/shufo_'),
         ('github', 'https://github.com/shufo'),
         ('envelope', 'mailto:meikyowise@gmail.com'),)

FOOTER = ("&copy; 2015 shufo. All rights reserved.<br>" +
              "Code snippets in the pages are released under " +
              "<a href=\"http://opensource.org/licenses/MIT\" target=\"_blank\">" +
              "The MIT License</a>, unless otherwise specified.")

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
