(function () {
  /* ── Jennifer's Q&A Knowledge Base ── */
  var QA = [
    {
      keywords: ["who", "about", "tell me", "introduce", "yourself", "jennifer", "jen"],
      answer: "Hi! I'm Jennifer Flores, a Product Designer with 4+ years of experience. I'm currently at Cox Automotive (vAuto) where I lead UX for beta platforms serving 220K+ users. Before that, I was at General Motors designing AI-driven cloud products. I love turning complexity into clarity."
    },
    {
      keywords: ["experience", "work", "career", "background", "history", "resume"],
      answer: "I've worked across enterprise and consumer products:\n\n<b>Cox Automotive / vAuto</b> (2025–Present) — Product Designer II, leading UX research for a beta platform with 5,000+ users. Designed onboarding flows that lifted engagement 2.5x.\n\n<b>General Motors</b> (2023–2025) — Product Designer, shipped 2 products to 30,000+ users, led AI + UX strategy for Maxis 3.0, and reduced cognitive load by 33%.\n\n<b>WEDO</b> (2022) — UX Designer, redesigned the website and built an accessible design system.\n\n<b>Bridge of the Americas</b> (2021–2022) — Product Designer for cross-platform fundraising experiences."
    },
    {
      keywords: ["skill", "tools", "software", "figma", "technical", "tech stack", "programs"],
      answer: "My toolkit includes:\n\n<b>Design:</b> Figma, Sketch, Adobe XD, InVision\n<b>Technical:</b> HTML, CSS, Material UI, React (basic)\n<b>Methods:</b> User Research, Usability Testing, Prototyping, Wireframing, Design Systems, WCAG Accessibility, Interaction Design\n<b>Other:</b> Pendo, Claude AI, Spec-Driven Development"
    },
    {
      keywords: ["education", "school", "degree", "university", "study", "college", "ucr"],
      answer: "I have a BA in Psychology from UC Riverside, which gives me a strong foundation in understanding human behavior — super valuable for UX. I also hold a Google UX Design Certificate."
    },
    {
      keywords: ["vauto", "cox", "cox automotive", "test drive", "labs", "current"],
      answer: "At Cox Automotive / vAuto, I'm a Product Designer II working on vAuto Labs — an experimental feature platform that lets beta dealers discover, enable, and give feedback on new features before they roll out to 220K+ users. I designed the full onboarding experience using Pendo guides, which lifted engagement by 2.5x. I also designed enablement and waitlist flows that reduced support tickets by 18%."
    },
    {
      keywords: ["gm", "general motors", "maxis", "cloud", "cloudserve"],
      answer: "At General Motors, I worked on cloud infrastructure products including cloudServe (centralizing AWS/Azure/GCP management) and Maxis Workspaces (enabling data scientists to deploy datasets). I led the AI + UX strategy for Maxis 3.0, shipped 2 products to 30K+ users, and drove a 33% reduction in cognitive load through AI-driven workflows. I also led the team's migration from Adobe XD to Figma, improving efficiency by 20%."
    },
    {
      keywords: ["why", "hire", "stand out", "unique", "strength", "best", "amazing", "great", "good"],
      answer: "A few things set me apart:\n\n<b>1. I ship real impact</b> — 2.5x engagement lift, 33% cognitive load reduction, 18% fewer support tickets. I measure my work by outcomes, not outputs.\n\n<b>2. Research-driven</b> — I don't guess. I run contextual interviews, usability tests, and synthesize findings into actionable direction.\n\n<b>3. I bridge design + engineering</b> — I speak both languages. I write specs, build in HTML/CSS, and collaborate directly with developers.\n\n<b>4. Enterprise scale</b> — I've designed for platforms serving 30K–220K+ users across automotive and cloud infrastructure."
    },
    {
      keywords: ["research", "usability", "testing", "interview", "user research"],
      answer: "Research is core to how I work. At vAuto, I planned and ran moderated interviews with alpha dealers to validate the Labs experience before scaling to beta. At GM, I conducted semi-structured interviews across cloud architects, engineering leads, and developers to uncover pain points. I use affinity mapping, journey diagrams, and persona frameworks to turn ambiguous signals into clear direction."
    },
    {
      keywords: ["design system", "component", "system", "library"],
      answer: "I've built and maintained design systems at multiple companies. At GM, I created and maintained the cloudServe design system in Figma, which was crucial to the UX team's consistency and speed. At WEDO, I built a WCAG-compliant design system from scratch. I believe the best design system is the one teams actually reach for."
    },
    {
      keywords: ["contact", "email", "reach", "connect", "hire", "phone", "linkedin"],
      answer: "I'd love to connect! You can reach me at:\n\n<b>Email:</b> flores.jennifer1000@gmail.com\n<b>LinkedIn:</b> <a href='https://www.linkedin.com/in/jenniferflo/' target='_blank' style='color:#DCFF7D'>linkedin.com/in/jenniferflo</a>"
    },
    {
      keywords: ["project", "portfolio", "case study", "work sample"],
      answer: "Check out my featured projects on the home page:\n\n<b>1. vAuto Test Drive</b> — Beta feature platform for 220K+ users\n<b>2. cloudServe</b> — Cloud infrastructure management for AWS/Azure/GCP\n<b>3. Maxis Workspaces</b> — Data scientist deployment tool\n<b>4. Data Catalog</b> — Internal GM cloud data catalog\n\nEach case study walks through the problem, research, design decisions, and outcomes."
    },
    {
      keywords: ["process", "approach", "how do you", "methodology", "workflow"],
      answer: "My design process is research-first and outcome-driven:\n\n<b>1. Discover</b> — User interviews, stakeholder alignment, competitive analysis\n<b>2. Define</b> — Synthesize insights into personas, journey maps, and problem statements\n<b>3. Design</b> — Wireframes, prototypes, and iteration with eng collaboration\n<b>4. Deliver</b> — Detailed specs, Pendo guides, and post-launch measurement\n\nI adapt the process to the project — sometimes fast and scrappy, sometimes deep and methodical."
    },
    {
      keywords: ["accessibility", "a11y", "wcag", "accessible", "inclusive"],
      answer: "Accessibility is a priority in my work. At WEDO, I built a fully WCAG-compliant design system. I design with contrast, keyboard navigation, and screen reader support in mind. I believe inclusive design makes products better for everyone, not just users with disabilities."
    },
    {
      keywords: ["ai", "artificial intelligence", "machine learning", "claude"],
      answer: "I'm actively working at the intersection of AI and UX. At GM, I led the AI + UX strategy for Maxis 3.0, designing AI-driven web workflows that reduced cognitive load by 33%. I'm also proficient with Claude AI as a design and productivity tool. I believe AI should augment human decision-making, not replace it."
    },
    {
      keywords: ["hobby", "hobbies", "fun", "interest", "outside", "free time", "personal"],
      answer: "Outside of design, I love video games, traveling, and spending time with my fur babies! These interests actually fuel my creativity and empathy as a designer — understanding what brings people joy is at the heart of good UX."
    }
  ];

  var GREETING = "Hey there! I'm Jennifer's portfolio assistant. Ask me anything about her experience, skills, projects, or why she'd be a great fit for your team!";

  var FALLBACK = "Great question! I don't have a specific answer for that, but Jennifer would love to chat with you directly. Reach out at <a href='mailto:flores.jennifer1000@gmail.com' style='color:#DCFF7D'>flores.jennifer1000@gmail.com</a> or connect on <a href='https://www.linkedin.com/in/jenniferflo/' target='_blank' style='color:#DCFF7D'>LinkedIn</a>.";

  var SUGGESTIONS = [
    "Why should I hire Jennifer?",
    "What's her experience?",
    "What tools does she use?",
    "Tell me about vAuto Labs"
  ];

  /* ── Match user input to Q&A ── */
  function findAnswer(input) {
    var lower = input.toLowerCase().replace(/[^\w\s]/g, "");
    var best = null;
    var bestScore = 0;

    for (var i = 0; i < QA.length; i++) {
      var score = 0;
      for (var k = 0; k < QA[i].keywords.length; k++) {
        if (lower.indexOf(QA[i].keywords[k]) !== -1) {
          score += QA[i].keywords[k].length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = QA[i];
      }
    }

    return bestScore > 0 ? best.answer : FALLBACK;
  }

  /* ── Build the UI ── */
  function init() {
    var css = document.createElement("style");
    css.textContent = [
      "#jf-chat-toggle{position:fixed;bottom:28px;right:28px;z-index:9999;width:56px;height:56px;border-radius:50%;background:#DCFF7D;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(220,255,125,.3);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s}",
      "#jf-chat-toggle:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(220,255,125,.45)}",
      "#jf-chat-toggle svg{width:28px;height:28px;fill:#000}",
      "#jf-chat-window{position:fixed;bottom:96px;right:28px;z-index:9998;width:380px;max-height:520px;background:#1a1a1a;border:1px solid rgba(255,255,255,.1);border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,.5);font-family:Inter,system-ui,sans-serif}",
      "#jf-chat-window.open{display:flex}",
      "#jf-chat-header{padding:16px 20px;background:#111;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:10px}",
      "#jf-chat-header .dot{width:8px;height:8px;border-radius:50%;background:#DCFF7D}",
      "#jf-chat-header span{color:#fff;font-size:14px;font-weight:500}",
      "#jf-chat-messages{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;scrollbar-width:none;-ms-overflow-style:none}",
      "#jf-chat-messages::-webkit-scrollbar{display:none}",
      ".jf-msg{max-width:85%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.55;animation:jf-fade .25s ease}",
      ".jf-msg a{color:#DCFF7D}",
      ".jf-msg.bot{background:#2a2a2a;color:#e0e0e0;align-self:flex-start;border-bottom-left-radius:4px}",
      ".jf-msg.user{background:#DCFF7D;color:#000;align-self:flex-end;border-bottom-right-radius:4px}",
      ".jf-suggestions{display:flex;flex-wrap:wrap;gap:6px;padding:0 20px 12px}",
      ".jf-sug{background:transparent;border:1px solid rgba(255,255,255,.15);color:#aaa;font-size:11px;padding:6px 12px;border-radius:20px;cursor:pointer;font-family:inherit;transition:border-color .2s,color .2s}",
      ".jf-sug:hover{border-color:#DCFF7D;color:#DCFF7D}",
      "#jf-chat-input-wrap{padding:12px 16px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:8px;background:#111}",
      "#jf-chat-input{flex:1;background:#2a2a2a;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:10px 16px;color:#fff;font-size:13px;font-family:inherit;outline:none;transition:border-color .2s}",
      "#jf-chat-input:focus{border-color:#DCFF7D}",
      "#jf-chat-input::placeholder{color:#666}",
      "#jf-chat-send{background:#DCFF7D;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s}",
      "#jf-chat-send:hover{transform:scale(1.1)}",
      "#jf-chat-send svg{width:16px;height:16px;fill:#000}",
      "@keyframes jf-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}",
      "@media(max-width:479px){#jf-chat-window{right:12px;left:12px;width:auto;bottom:88px;max-height:70vh}#jf-chat-toggle{bottom:20px;right:20px}}"
    ].join("\n");
    document.head.appendChild(css);

    /* Toggle button */
    var toggle = document.createElement("button");
    toggle.id = "jf-chat-toggle";
    toggle.setAttribute("aria-label", "Chat with Jennifer's assistant");
    toggle.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>';
    document.body.appendChild(toggle);

    /* Chat window */
    var win = document.createElement("div");
    win.id = "jf-chat-window";
    win.innerHTML = [
      '<div id="jf-chat-header"><div class="dot"></div><span>Chat with Jennifer\'s Assistant</span></div>',
      '<div id="jf-chat-messages"></div>',
      '<div class="jf-suggestions" id="jf-suggestions"></div>',
      '<div id="jf-chat-input-wrap">',
      '<input id="jf-chat-input" type="text" placeholder="Ask me anything..." autocomplete="off"/>',
      '<button id="jf-chat-send" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>',
      '</div>'
    ].join("");
    document.body.appendChild(win);

    var messages = document.getElementById("jf-chat-messages");
    var input = document.getElementById("jf-chat-input");
    var sugWrap = document.getElementById("jf-suggestions");
    var isOpen = false;

    function addMessage(text, type) {
      var div = document.createElement("div");
      div.className = "jf-msg " + type;
      div.innerHTML = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function showSuggestions() {
      sugWrap.innerHTML = "";
      SUGGESTIONS.forEach(function (s) {
        var btn = document.createElement("button");
        btn.className = "jf-sug";
        btn.textContent = s;
        btn.addEventListener("click", function () {
          sendMessage(s);
        });
        sugWrap.appendChild(btn);
      });
    }

    function sendMessage(text) {
      addMessage(text, "user");
      sugWrap.innerHTML = "";
      input.value = "";

      setTimeout(function () {
        addMessage(findAnswer(text), "bot");
      }, 400);
    }

    /* Events */
    toggle.addEventListener("click", function () {
      isOpen = !isOpen;
      if (isOpen) {
        win.classList.add("open");
        if (messages.children.length === 0) {
          addMessage(GREETING, "bot");
          showSuggestions();
        }
        input.focus();
      } else {
        win.classList.remove("open");
      }
    });

    document.getElementById("jf-chat-send").addEventListener("click", function () {
      var text = input.value.trim();
      if (text) sendMessage(text);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var text = input.value.trim();
        if (text) sendMessage(text);
      }
    });
  }

  /* ── Start ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
