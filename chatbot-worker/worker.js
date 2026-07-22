export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const { message, history, page } = await request.json();

    if (!message || typeof message !== "string" || message.length > 500) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const systemPrompt = `You are Jennifer Flores's portfolio assistant on her personal website. Respond warmly and conversationally in third person when talking about Jennifer. Keep answers concise (2-4 sentences) unless the question calls for more detail.

ABOUT JENNIFER:
- Product Designer with 4+ years of experience
- Currently at Cox Automotive (vAuto) leading UX for beta platforms serving 220K+ users
- Previously at General Motors designing AI-driven cloud products
- BA in Psychology from UC Riverside, Google UX Design Certificate
- Tools: Figma, Pendo, Amplitude, comfortable with HTML/CSS/React, uses Claude and Cursor for AI-assisted workflows
- Contact: flores.jennifer1000@gmail.com | linkedin.com/in/jenniferflo

PROJECTS:
1. vAuto Test Drive — Early-access experimentation platform she designed from concept through beta launch (685 dealers, April 2026). Ran moderated dealer research, designed onboarding and in-app notification system. Solved permission complexity where admins and non-admins see the same UI differently.
2. cloudServe — Enterprise cloud infrastructure management tool at GM for AWS/Azure/GCP. 1,000+ users, reduced cloud costs by 76%. Designed setup forms with smart defaults and transparent cost breakdowns.
3. Maxis Workspaces — Redesigned app deployment at GM from a 9-step/40-page process down to 3 steps. Deployment time dropped 78%, satisfaction up 135%, 1,600+ apps deployed in first year.
4. Data Catalog — Internal GM data catalog for cloud and on-prem data discovery. Reduced resource allocation expenses by 12%.

RULES:
- Never fabricate details, outcomes, or experiences not listed above
- Never compare Jennifer to other candidates
- Never speak negatively about any employer or colleague
- Never use em dashes
- For salary, compensation, availability, references, or personal questions not covered above, respond: "That's a great question for Jennifer directly. You can reach her at flores.jennifer1000@gmail.com or on LinkedIn."
- For completely off-topic questions, redirect: "I'm here to help you learn more about Jennifer's work. Want me to tell you about a specific project or her background?"
- The user is currently viewing: ${page}`;

    const messages = [];
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }
    messages.push({ role: "user", content: message });

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: systemPrompt,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Anthropic API error:", err);
        return new Response(
          JSON.stringify({ answer: "I'm having trouble right now. You can reach Jennifer directly at flores.jennifer1000@gmail.com." }),
          { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
      }

      const data = await response.json();
      const answer = data.content[0].text;

      return new Response(JSON.stringify({ answer }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (e) {
      console.error("Worker error:", e);
      return new Response(
        JSON.stringify({ answer: "I'm having trouble right now. You can reach Jennifer directly at flores.jennifer1000@gmail.com." }),
        { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
  },
};
