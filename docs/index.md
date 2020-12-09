---
pageClass: home-page
# some data for the components

name: Shuhei Hayashibara
profile: /assets/img/uploads/profile.jpg

bio: Software Engineer
email: meikyowise@gmail.com
---

<ProfileSection :frontmatter="$page.frontmatter" />

## About Me

<About />

## Posts 

<PostList />

## Projects

<ProjectList />

## PGP

My [PGP](/assets/keys/pgp.pub) keys

```
# To import my keys
curl https://keybase.io/shufo/pgp_keys.asc | gpg --import
```
