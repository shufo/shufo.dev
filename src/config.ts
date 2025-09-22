import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://www.shufo.dev/",
  author: "shufo",
  desc: "https://www.shufo.dev/",
  title: "shufo.dev",
  ogImage: "profile.jpg",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/shufo",
    linkTitle: `Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shuhei-hayashibara/",
    linkTitle: `LinkedIn`,
    active: true,
  },
  {
    name: "Threads",
    href: "https://www.threads.net/@shufo",
    linkTitle: `Threads`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/shufo_",
    linkTitle: `Twitter`,
    active: true,
  },
  {
    name: "Qiita",
    href: "https://qiita.com/shufo",
    linkTitle: `Qiita`,
    active: true,
  },
  {
    name: "Scrapbox",
    href: "https://scrapbox.io/shufo/",
    linkTitle: `Scrapbox`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://discord.gg/vyraPGmjAN",
    linkTitle: `Discord`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:me@shufo.dev",
    linkTitle: `Send an email to ${SITE.author}`,
    active: true,
  },
];
