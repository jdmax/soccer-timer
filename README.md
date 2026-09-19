# Soccer Minutes

A playing-time tracker for a youth soccer game. Installs to the home screen and
works with no signal at all.

## Files

    index.html              the whole app
    manifest.webmanifest    name, colours, icons
    sw.js                   offline cache
    icon-192.png
    icon-512.png
    icon-maskable-512.png

All paths are relative, so it works from any repo name or subfolder.

## Publishing it

1. Make a repo on GitHub and put these six files in the root.
2. Settings -> Pages -> Build and deployment -> Source: **Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
3. Wait a minute. The URL will be
   `https://<your-username>.github.io/<repo-name>/`.

Pages serves over HTTPS, which the service worker requires.

## Installing on a phone

Open the URL in Chrome on Android, then menu -> **Add to Home screen**. It opens
full screen with no address bar. On iPhone it's Safari -> Share -> **Add to
Home Screen**.

Each phone keeps its own data in that browser's storage. Uninstalling the
icon does not erase it; clearing site data does.

## Changing the roster

Edit the `teamRoster` JSON block near the top of `index.html`, then bump the
`CACHE` constant in `sw.js` (`soccer-minutes-v1` -> `-v2`) so phones pick the
change up. Commit both.

Names are matched by spelling, so fixing a typo keeps that player's saved
minutes as long as the old spelling still exists in the saved data.

## Any other change

Same rule: edit, bump `CACHE` in `sw.js`, commit. The app serves from cache
first so it opens instantly offline, which means a new version appears the
*second* time it's launched after a deploy. To force it sooner, open the URL in
a normal browser tab and reload.

## Sharing the season

Season tab -> Copy, then commit the text as `season.json` in this repo. The
other coach pastes the raw URL
(`https://raw.githubusercontent.com/<user>/<repo>/main/season.json`) into the
load box on his Season tab. Player IDs come from the roster names, so the
games merge cleanly.
