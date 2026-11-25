THE QUIET BLOOM — WEBSITE PACKAGE

Files:
- index.html: responsive single-page website
- styles.css: complete styling and mobile layouts
- app.js: mobile navigation and Supabase-powered forms
- netlify.toml: Netlify publish configuration

Connected Supabase project:
https://xqtuabseumufpzctvyii.supabase.co

Database:
- public.contact_messages
- public.newsletter_subscribers
- public.reader_stories (submissions default to pending review; never auto-published)

All three tables have Row Level Security enabled. Anonymous visitors can insert only; public read access is not granted. Reader stories are private and pending editorial approval by default. Never add a Supabase service-role/secret key to browser code.

Preview locally:
Open index.html in a browser. An internet connection is needed for Google Fonts, Unsplash photos and Supabase forms.

Deploy:
Upload the contents of this folder to Netlify Drop (https://app.netlify.com/drop), or connect this folder's Git repository to Netlify.
Set the publish directory to ".". No build command is required.

Before public launch:
- Replace sample/placeholder journal entries with original, approved writing.
- Add official logo, WhatsApp number and social links.
- Review all copy, image licensing/brand choices and privacy wording.
- Configure a custom domain and contact email.
- Set up email notifications for new Supabase submissions (for example with an Edge Function and an email provider); the forms currently save submissions to the database but do not send email alerts.
