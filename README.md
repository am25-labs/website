# AM25 Website

## Podcast

`/podcast` redirects to `/es/podcast`, preserving the query string. The player is
also available at `/en/podcast`. Episode links use the `guid` query parameter.
The existing AM25 shell and CMS navigation remain in control of the header.

The podcast uses the original episode API and the AM25 Plank CMS `globals`
single entry for Spotify, Apple Podcasts, Amazon Music, and YouTube links. These
links use the original `podcast[0]` fields: `spotify`, `apple`, `amazon`, and
`youtube`. Configure this server-side variable locally and in the deployment
environment:

```dotenv
PODCAST_API=https://podcasters.alemartir.com/api/podcast
```

Podcast links use the existing AM25 `PLANK_URL` and `PLANK_TOKEN`.
Episodes are fetched without caching; platform links use the existing general CMS
cache. Podcast playback and sharing events use the existing production Umami
integration. Native sharing and Media Session controls depend on browser support.
