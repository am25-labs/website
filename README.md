# AM25 Website

## Email

Contact forms send plain-text emails through the official Postmark SDK in
`src/lib/mailer.ts`. Configure these server-side variables locally and in the
deployment environment:

| Variable | Purpose |
| --- | --- |
| `POSTMARK_SERVER_TOKEN` | Required Postmark Server API Token, not an Account API Token or SMTP Token |
| `POSTMARK_FROM` | Required verified sender email address; keep the previous `SMTP_FROM` address |
| `POSTMARK_TRANSACTIONAL_STREAM` | Optional transactional Message Stream ID; defaults to `outbound` |

The mailer no longer reads `SMTP_*` variables and works with SMTP disabled in
Postmark. Recipients, subjects, message contents, and Turnstile verification remain
unchanged.

Run `node --test tests/mailer.test.mjs` to verify the transport with a mocked
Postmark client, without sending emails.

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
