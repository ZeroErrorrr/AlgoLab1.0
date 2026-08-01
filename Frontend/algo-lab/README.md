# AlgoLab — Frontend

React + Vite + Tailwind CSS. Matches your architecture diagram:
Landing → Algorithm Hub → Simulation Engine (client-side) → optional AI Explanation (backend).

## Run it

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. No backend required to use any of the 4 simulations —
they run entirely in the browser off the local datasets in `src/data/datasets.js`.

## What's built

- `/` — Landing page
- `/hub` — Algorithm Hub (4 cards)
- `/sim/decision-tree` — animated decision path tracing
- `/sim/knn` — click-to-classify scatter plot
- `/sim/linear-regression` — animated best-fit convergence + predictor
- `/sim/neural-network` — animated forward pass
- `/tutor` — chat UI, calls the same backend endpoint as inline explanations
- `/challenge` — stub, marked as stretch goal

Every simulation ends in an `<ExplanationPanel />`. Clicking "Yes, explain" calls
`POST /api/explain`. Until your backend exists, it fails gracefully and shows a
labeled demo response instead — the frontend never breaks without the backend.

---

## Backend checklist (Node.js + Express + Gemini)

1. **Scaffold**
   ```bash
   mkdir algo-lab-server && cd algo-lab-server
   npm init -y
   npm install express cors dotenv @google/generative-ai
   ```

2. **Get a Gemini API key** from Google AI Studio. Put it in `.env`:
   ```
   GEMINI_API_KEY=your_key_here
   PORT=3000
   ```
   Never commit `.env` — add it to `.gitignore`.

3. **Single endpoint to build:** `POST /api/explain`
   - Request body: `{ algorithm: string, context: object }` — see each sim page for
     the exact shape of `context` it sends (e.g. decision tree sends
     `{ outlook, humidity, wind, result }`).
   - Build a prompt template per algorithm that includes the specific `context`,
     so Gemini explains *this specific run*, not a generic definition.
   - Response: `{ explanation: string }`.

4. **CORS** — enable it for `http://localhost:5173` in dev, and your deployed
   frontend URL in production.

5. **Error handling** — wrap the Gemini call in try/catch. If it fails or rate-limits,
   return a fallback string rather than a 500, so the frontend's fallback text isn't
   the only safety net.

6. **Test with curl/Postman before wiring the frontend:**
   ```bash
   curl -X POST http://localhost:3000/api/explain \
     -H "Content-Type: application/json" \
     -d '{"algorithm":"decisionTree","context":{"outlook":"sunny","humidity":"high","result":"Do not play"}}'
   ```

7. **Deploy** — Render, Railway, or Fly.io all have free tiers fast enough to set up
   during a hackathon. Set `GEMINI_API_KEY` as an environment variable there too.

8. **Update `vite.config.js` proxy target** (already set to `localhost:3000`) or the
   frontend's fetch URL once you deploy the backend somewhere else.
