# LectureMate — Nursing Lecture Assistant MVP

## What works in this starter
- Clerk registration and login
- Next.js dashboard and personal lecture library
- Browser microphone recording and audio file upload
- Direct signed Cloudinary upload
- OpenAI `gpt-transcribe` transcription
- AI summary, structured notes, salient points, and definitions
- Editable and saved notes
- MongoDB persistence with per-user lecture ownership

## Current MVP limitation
Recording is captured in the browser and uploaded when the student stops. Transcription and note generation run after upload. This is not yet live streaming transcription. The transcription endpoint accepts files up to 25 MB. For long lectures and production use, move processing into a durable worker/queue and add the OpenAI Realtime transcription workflow.

## Local setup
1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in all values.
4. Create MongoDB Atlas, OpenAI, Cloudinary, and Clerk projects.
5. In Clerk, configure `/sign-in` and `/sign-up` as the sign-in and sign-up paths.
6. Run `npm run dev` and open `http://localhost:3000`.

## Deployment
1. Push the folder to a GitHub repository.
2. Import the repository into Vercel.
3. Add every variable from `.env.example` in Vercel Project Settings → Environment Variables.
4. Deploy and add the Vercel domain to Clerk's allowed domains/redirect URLs.
5. Test registration, a short recording, an audio upload, transcription, note generation, and note editing.

## Important setup notes
- MongoDB Atlas: create a database user and configure network access. For a quick prototype, a broad allowlist may work, but restrict it before real use.
- OpenAI: create an API key and set a spending limit. Keep the key server-side only.
- Cloudinary: use your cloud name, API key, and API secret. Audio is uploaded directly from the browser using a short-lived server-generated signature.
- Clerk: use your publishable and secret keys. Never expose the secret key in a `NEXT_PUBLIC_` variable.
- Keep uploaded audio below 24 MB in this MVP. OpenAI's file transcription API currently has a 25 MB file limit.
- The processing route may exceed Vercel's execution limit for longer files, especially on lower tiers. Do not treat this single-request processing design as production-ready for long lectures.

## Before real students use it
- Add request rate limits and per-user transcription quotas.
- Move transcription and AI generation to a durable background worker.
- Add robust retry and idempotency handling.
- Add audio deletion from Cloudinary when a lecture is deleted.
- Add polling/notifications for processing status.
- Obtain permission before recording lecturers or classmates.
- Provide audio/transcript deletion and account deletion.
- Verify generated clinical content against lecturer materials and trusted nursing references. AI notes are study aids, not clinical authority.
