(function () {
  /* ── Global Q&A (available on all pages) ── */
  var GLOBAL_QA = [
    {
      keywords: ["who", "about", "tell me", "introduce", "yourself", "jennifer", "jen"],
      answer: "Hi! I'm Jennifer Flores, a Product Designer with 4+ years of experience. I'm currently at Cox Automotive (vAuto) where I lead UX for beta platforms serving 220K+ users. Before that, I was at General Motors designing AI-driven cloud products. I love turning complexity into clarity."
    },
    {
      keywords: ["experience", "work", "career", "background", "history", "resume"],
      answer: "Jennifer has about five years of experience designing for complex, high-stakes products, the kind where getting the UX wrong has real consequences for real people. She's worked across enterprise software, consumer-facing tools, and nonprofit platforms, so she's comfortable in both scrappy and highly structured environments. She tends to care about more than just the design layer; she wants to understand the strategy behind what she's building and have a real say in shaping it, not just executing on someone else's vision."
    },
    {
      keywords: ["skill", "tools", "software", "figma", "technical", "tech stack", "programs"],
      answer: "Her specific stack matters less than her ability to ramp on whatever a team is using. She picks up new tools fast and has a track record of not just learning them but finding ways to use them better than the team was before. That said, Figma is her home base for design. She uses Pendo and Amplitude for research and behavioral data, and she's comfortable enough with HTML, CSS, and React to have real conversations with engineers. She's also been building out AI-assisted workflows with Claude and Cursor, which she uses to speed up documentation and decision logging."
    },
    {
      keywords: ["education", "school", "degree", "university", "study", "college", "ucr"],
      answer: "I have a BA in Psychology from UC Riverside, which gives me a strong foundation in understanding human behavior — super valuable for UX. I also hold a Google UX Design Certificate."
    },
    {
      keywords: ["vauto", "cox", "cox automotive", "test drive"],
      answer: "vAuto Test Drive is an early-access experimentation platform Jennifer designed from the ground up. The idea was to give dealers a structured way to try new vAuto features before they hit general availability, join waitlists, and submit feedback that actually shaped what got built next. Before this existed, features were being developed with limited real-world input and shipped to the full user base of roughly 220,000 users, which meant problems got discovered way too late.\n\nJennifer was the lead designer from concept through beta, which launched to about 685 dealers in April 2026. She ran two rounds of moderated dealer research, designed the full onboarding experience, and created a scalable in-app notification system to keep dealers informed at every step of the process. She also contributed to the naming decision when research with 385 dealers showed that the original name was making dealers hesitant and a new name rooted in an auto-industry metaphor they already understood landed much better.\n\nOne of the trickier design challenges was that not everyone who could see the platform could actually enable features; only system admins could do that. So she had to design a single experience that made sense for both audiences without building two separate flows, which meant thinking carefully about how the same copy and UI read differently depending on who was looking at it."
    },
    {
      keywords: ["why", "hire", "stand out", "unique", "strength", "best", "amazing", "great", "good"],
      answer: "Jennifer doesn't just design screens; she takes ownership of the whole product experience. She comes in wanting to understand the strategy, not just the brief, and she brings research, systems thinking, and detailed interaction design together in a way that's hard to find in one person. She's shipped features at scale, run her own research, pushed back on stakeholders when the data supported it, and documented her decisions so engineering isn't left guessing. If you need someone who treats design as a craft and a business function at the same time, that's her."
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
      keywords: ["contact", "email", "reach", "connect", "phone", "linkedin"],
      answer: "I'd love to connect! You can reach me at:\n\n<b>Email:</b> flores.jennifer1000@gmail.com\n<b>LinkedIn:</b> <a href='https://www.linkedin.com/in/jenniferflo/' target='_blank' style='color:#6a6ff7'>linkedin.com/in/jenniferflo</a>"
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

  /* ── CloudServe page Q&A ── */
  var CLOUDSERVE_QA = [
    {
      keywords: ["tell me about", "cloudserve", "what is", "overview", "project"],
      answer: "CloudServe is an enterprise tool Jennifer designed at General Motors that lets technical users provision and manage cloud infrastructure accounts across AWS and Azure without having to wait on a central IT team. Before it existed, engineers and developers had to go through slow, unclear processes just to get access to the cloud resources they needed to do their jobs, which was creating real bottlenecks.\n\nJennifer came in as the UX designer and researcher on a pretty tight timeline, about four months. She started with user interviews across three different roles: cloud architects, engineering leads, and developers, since each had very different needs and pain points. That research shaped the core design decisions, including a setup form with smart defaults and transparent cost breakdowns so users could make informed choices without accidentally over-provisioning resources.\n\nThe product went through two rounds of design, with usability testing in between driving meaningful changes to the second version. Things like moving the resources section into the global navigation for easier access and tightening up the form layout came directly from what users flagged.\n\nWhen it launched, CloudServe had over 1,000 users and brought cloud costs down by 76 percent. The next phase was going to introduce deployment archetypes to make the experience even more accessible for first-time cloud users."
    },
    {
      keywords: ["role", "your role", "what did you do", "responsibility"],
      answer: "Jennifer was the UX designer and researcher on the project. She owned everything from the initial discovery and user interviews through final designs and usability testing."
    },
    {
      keywords: ["how long", "timeline", "duration", "time"],
      answer: "About four months, from March through Q2 2024."
    },
    {
      keywords: ["problem", "solving", "challenge", "why"],
      answer: "Engineers and developers at General Motors had no clear, self-service way to access the cloud resources they needed to do their jobs. They were dependent on central IT teams, which created slow turnaround times and real bottlenecks. CloudServe was built to fix that."
    },
    {
      keywords: ["research", "interview", "discovery", "user research"],
      answer: "Jennifer started with semi-structured interviews across three user types: cloud architects, engineering leads, and developers. Each role had different needs and pain points, so it was important to hear from all three before making any design decisions. She also did deep research into AWS, Azure, and GCP to make sure the designs reflected how those platforms actually work."
    },
    {
      keywords: ["tight timeline", "fast", "speed", "handle"],
      answer: "By staying closely aligned with stakeholders throughout rather than disappearing and coming back with a big reveal. Regular check-ins meant feedback came early and often, which kept the team moving forward with confidence instead of backtracking late in the process."
    },
    {
      keywords: ["v1", "v2", "change", "version", "iteration", "between"],
      answer: "The core structure stayed the same but usability testing surfaced some friction points. The resources section got moved into the global navigation so it was easier to find, the form layout was tightened up to feel more efficient, and clearer instructions were added upfront so users knew what they needed before they started filling things out."
    },
    {
      keywords: ["differently", "improve", "redo", "mistake"],
      answer: "Jennifer would have pushed earlier to include first-time cloud users in the research. A lot of the initial interviews skewed toward more experienced technical users, and some of the gaps that surfaced later, like users not knowing what selections to make, pointed to a need for more onboarding support from the start."
    },
    {
      keywords: ["result", "outcome", "impact", "metric", "success", "number"],
      answer: "CloudServe launched to over 1,000 users and brought cloud infrastructure costs down by 76 percent. It also supported two cloud service providers at launch with GCP planned as the next addition."
    },
    {
      keywords: ["work", "design work", "know"],
      answer: "The adoption numbers and cost reduction were the clearest signals. Beyond that, the fact that users could provision accounts independently without needing IT support was the core goal, and that became the reality after launch."
    },
    {
      keywords: ["track", "metric", "measure", "kpi"],
      answer: "Active subscriptions, total users, and cost reduction were the primary outcomes tracked. On the design side, usability testing between V1 and V2 helped identify friction points before they became bigger problems post-launch."
    },
    {
      keywords: ["team", "collaborate", "work with", "who"],
      answer: "Jennifer worked closely with stakeholders at General Motors, engineering teams, and a UX team where multiple members independently mapped out user flows before coming together on a final version. She also collaborated directly with the three user groups throughout research."
    },
    {
      keywords: ["engineer", "engineering", "handoff", "dev"],
      answer: "She kept engineers in the loop early and often, using regular check-ins to validate assumptions before moving to higher fidelity. The goal was to avoid surprises during handoff and make sure the designs were grounded in what was actually buildable."
    },
    {
      keywords: ["stakeholder", "feedback", "leadership", "manager"],
      answer: "Stakeholders came in with a clear sense of what they wanted, so Jennifer used that as a starting point rather than fighting it. She built in validation checkpoints throughout the process so feedback was gathered incrementally, which made it easier to course correct early rather than late."
    },
    {
      keywords: ["wrong", "mid-project", "pivot", "constraint"],
      answer: "The tight timeline was the biggest constraint. It meant making smart decisions about what to prioritize for the MVP and what to push to later versions. The team had to move fast without cutting corners on the research that would make the product actually work for users."
    },
    {
      keywords: ["decision", "why did you", "rationale", "reasoning"],
      answer: "Most of the key decisions came directly from research. Things like the smart defaults in the setup form and the transparent cost breakdown weren't assumptions, they came from hearing directly from users that they were over-provisioning resources because they didn't have enough information to make confident choices."
    },
    {
      keywords: ["prioritize", "feature", "mvp", "scope"],
      answer: "The MVP features were determined alongside stakeholders based on what was critical for the product to function at all. Optimized cloud setup, account status monitoring, and access to resources were the three non-negotiables. Everything else was scoped for later iterations."
    },
    {
      keywords: ["balance", "business", "user need", "tradeoff"],
      answer: "In this case they were pretty aligned. The business needed to reduce reliance on central IT and speed up cloud access. Users needed a clearer, faster way to get the resources they needed. CloudServe solved both at the same time, which made the design decisions feel grounded rather than like a compromise."
    },
    {
      keywords: ["hardest", "difficult", "tough", "hard part"],
      answer: "Designing for users with very different technical backgrounds under a tight timeline. A cloud architect and a developer have completely different mental models for how cloud provisioning should work, and the design had to make sense to both without dumbing it down for one or overwhelming the other."
    },
    {
      keywords: ["live", "still", "launched", "shipping"],
      answer: "Yes, CloudServe launched and was actively being used by 1,000+ users at General Motors. V2 was the next planned phase with deployment archetypes to make the experience more accessible for first-time cloud users."
    },
    {
      keywords: ["v3", "next", "future", "roadmap"],
      answer: "The next natural step would have been expanding cloud service provider support to include GCP and building out the deployment archetypes concept, which would let users browse and deploy predefined cloud resource templates. That would have made the platform much more accessible to users who were newer to working in the cloud."
    },
    {
      keywords: ["learn", "takeaway", "lesson", "insight"],
      answer: "That moving fast does not have to mean skipping research. The team stayed scrappy without cutting the steps that mattered most, and the usability testing between V1 and V2 proved its worth in the changes it surfaced. Jennifer also learned a lot about designing for technical users who have strong opinions and deep expertise, which pushed her to be more precise and rigorous in how she framed design decisions."
    }
  ];

  /* ── Maxis Workspaces page Q&A ── */
  var MAXIS_QA = [
    {
      keywords: ["tell me about", "maxis", "workspaces", "what is", "overview", "project", "deploy"],
      answer: "Maxis Workspaces is an internal data platform at General Motors used by over 3,000 data engineers, scientists, and analysts. Jennifer's work focused on redesigning the app deployment process, which required following a 40-page document and nine steps just to ship something. She brought that down to three. Deployment time dropped 78 percent, satisfaction scores went up 135 percent, and over 1,600 apps were deployed in the first year."
    },
    {
      keywords: ["role", "your role", "what did you do", "responsibility"],
      answer: "Jennifer was the UX designer on the project, responsible for translating a complex technical deployment process into a simple, intuitive experience for data scientists and developers at General Motors."
    },
    {
      keywords: ["how long", "timeline", "duration", "time"],
      answer: "About two months, launching at the end of Q1 in April 2023."
    },
    {
      keywords: ["problem", "solving", "challenge", "why"],
      answer: "Deploying a data application at General Motors required navigating a 40-page document and a nine-step process full of approvals, backend setup, and a steep learning curve. It was so cumbersome that it was actively getting in the way of the actual work. The goal was to reduce all of that down to something a developer could do in three steps without needing to understand the complex infrastructure behind it."
    },
    {
      keywords: ["research", "interview", "discovery", "user research"],
      answer: "The team analyzed existing user research before doing any design work. Key pain points that surfaced included reluctance to trust a new tool over the one they were already using, a need for better error messaging when things went wrong, and requests for email notifications on failed jobs. Jennifer also worked closely with the engineering team to understand the technical backend, including whiteboarding sessions that mapped out the code flow so she knew exactly what needed to be reflected in the UI."
    },
    {
      keywords: ["tight timeline", "fast", "speed", "handle"],
      answer: "By getting aligned on the user flow early and moving into design with confidence from there. Each designer on the team independently mapped out their version of the flow before coming together to compare, which helped surface blind spots and reduce bias before any decisions were locked in."
    },
    {
      keywords: ["approach", "design approach", "method", "process"],
      answer: "The core idea was to automate as much of the backend complexity as possible and only surface what the user actually needed to make decisions about. The three-step deployment wizard covered selecting a package, configuring security credentials, and choosing where to publish. Default settings handled everything else so users could move through it without needing deep technical knowledge."
    },
    {
      keywords: ["differently", "improve", "redo", "mistake"],
      answer: "Jennifer would have pushed to include more non-expert users in the research earlier. A lot of the initial context came from technically sophisticated users, and some of the friction that surfaced later pointed to a need for even more guardrails and guidance for users who were newer to the deployment process."
    },
    {
      keywords: ["result", "outcome", "impact", "number", "success"],
      answer: "The results were strong across the board. User adoption went up 65 percent, average deployment time dropped by 78 percent, and user satisfaction scores increased by 135 percent. Over 1,600 live apps were deployed in the year following launch."
    },
    {
      keywords: ["work", "design work", "know"],
      answer: "The numbers tell the story pretty clearly. A 78 percent reduction in deployment time and a 135 percent increase in satisfaction scores are hard to argue with. The adoption rate going up 65 percent also signaled that people were actually using the new flow rather than defaulting to the old process."
    },
    {
      keywords: ["track", "metric", "measure", "kpi"],
      answer: "User adoption rate, average deployment time, user satisfaction scores, and total live apps deployed year-to-date."
    },
    {
      keywords: ["team", "collaborate", "work with", "who"],
      answer: "Jennifer worked closely with the engineering and development team at General Motors, who built out the technical flow diagrams that informed the UI. She also collaborated with other designers on the UX team, each of whom independently mapped user flows before aligning on a final version together."
    },
    {
      keywords: ["engineer", "engineering", "handoff", "dev"],
      answer: "Engineering was involved from the start on this one because the technical complexity was so high. Jennifer participated in whiteboarding sessions with the dev team to understand how the backend provisioning actually worked, which made sure the design reflected reality rather than assumptions about what was possible."
    },
    {
      keywords: ["stakeholder", "feedback", "leadership", "manager"],
      answer: "Stakeholders had a clear picture of the problem they needed solved, so Jennifer used that as a foundation and focused her energy on figuring out the right way to solve it for users. Regular check-ins kept everyone aligned without letting feedback derail the timeline."
    },
    {
      keywords: ["wrong", "mid-project", "pivot", "constraint"],
      answer: "The biggest challenge was the inherent tension between technical complexity and simplicity. The backend process is genuinely complicated, and there was ongoing work to figure out what needed to be visible to the user versus what could be handled automatically in the background. Getting that balance right was an ongoing conversation between design and engineering throughout the project."
    },
    {
      keywords: ["decision", "why did you", "rationale", "reasoning"],
      answer: "The three-step wizard structure came directly from the problem. If the old process was nine steps and 40 pages of documentation, the design had to feel like the opposite of that. Every decision about what to include or cut was filtered through the question of whether it was something the user actually needed to think about or whether the system could just handle it."
    },
    {
      keywords: ["prioritize", "feature", "mvp", "scope"],
      answer: "The MVP focused on the three things that had to work for the feature to be useful at all: packaging the app, configuring security, and publishing it. More advanced options like custom resource settings were intentionally left out of the first version to keep the experience simple and approachable."
    },
    {
      keywords: ["balance", "business", "user need", "tradeoff"],
      answer: "They were closely aligned here. The business needed developers to ship applications faster and with less IT overhead. Users needed the process to stop being a blocker. Simplifying deployment served both goals at the same time, which made the design direction feel clear rather than like a compromise."
    },
    {
      keywords: ["hardest", "difficult", "tough", "hard part"],
      answer: "Making something genuinely simple when the underlying system is genuinely complex. It is easy to design a clean interface that falls apart the moment something goes wrong or a user deviates from the happy path. Making sure error states, failed deployments, and edge cases were handled clearly without adding cognitive load to the main flow took real thought."
    },
    {
      keywords: ["live", "still", "launched", "shipping"],
      answer: "Yes, the deploy feature launched at General Motors and had over 1,600 live apps deployed in its first year."
    },
    {
      keywords: ["v3", "next", "future", "roadmap", "version"],
      answer: "The natural next step would be expanding the feature to support more deployment configurations and giving more experienced users access to advanced settings that the MVP intentionally kept hidden. Better tooling around monitoring and managing existing deployments was also an area with room to grow."
    },
    {
      keywords: ["learn", "takeaway", "lesson", "insight"],
      answer: "That simplicity is a design achievement, not a starting point. Getting a nine-step process down to three required a deep understanding of the technical backend, close collaboration with engineering, and a lot of deliberate decisions about what to hide from the user without taking away their control. Jennifer also learned how much the framing of a feature matters; presenting something as a guided wizard rather than a form made the same information feel far less intimidating."
    }
  ];

  /* ── Data Catalog page Q&A ── */
  var DATACATALOG_QA = [
    {
      keywords: ["tell me about", "data catalog", "what is", "overview", "project", "catalog"],
      answer: "The Data Catalog is an internal tool Jennifer designed at General Motors that gave employees a centralized place to search and discover both cloud and on-premises data across the organization. Before it existed, a recent software transition had left users without clear documentation on how to find data or understand the costs associated with it, so people were either reaching out to multiple teams or doing time-consuming research on their own just to get started.\n\nJennifer came in as the UX designer and researcher, building the product from the ground up over three months. She ran multiple rounds of user interviews, organized workshops with senior leadership to align on features, and used the insights to design a catalog with enhanced search capabilities, clear data documentation, and a streamlined access request flow. The product launched in Q4 2023 and reduced resource allocation expenses by 12 percent."
    },
    {
      keywords: ["result", "outcome", "impact", "metric", "success", "number"],
      answer: "The Data Catalog successfully met its core goal of giving users a self-service way to find and request access to internal data. It also led to a 12 percent reduction in resource allocation expenses by streamlining how data was accessed and managed across the organization."
    },
    {
      keywords: ["work", "design work", "know"],
      answer: "The 12 percent cost reduction is the clearest signal. Beyond that, the Data Catalog fulfilled its primary objective of making data discoverable without requiring users to reach out to other teams, which was the core problem it was built to solve."
    },
    {
      keywords: ["live", "still", "launched", "shipping"],
      answer: "Yes, the Data Catalog launched at General Motors in Q4 2023. It was also designed to integrate with CloudServe, another internal tool Jennifer worked on, to create a more connected self-service data ecosystem."
    },
    {
      keywords: ["v3", "next", "future", "roadmap", "version"],
      answer: "The planned next step was deeper integration with CloudServe so users could move seamlessly between discovering data in the Data Catalog and provisioning the cloud resources needed to work with it. That connection between the two products was identified as a natural evolution after both launched."
    },
    {
      keywords: ["learn", "takeaway", "lesson", "insight"],
      answer: "That stakeholder alignment is a design activity, not just a kickoff checkbox. Jennifer organized the workshops herself rather than waiting for product to facilitate them, and that ownership early in the process directly shaped how smoothly the design phase went. She also learned a lot about designing for data-heavy environments, where the challenge is not just making things look clean but making complex information actually navigable."
    }
  ];

  /* ── Detect current page ── */
  var path = window.location.pathname.toLowerCase();
  var pageQA, pageSuggestions, pageGreeting;

  if (path.indexOf("cloudserve") !== -1) {
    pageQA = CLOUDSERVE_QA;
    pageSuggestions = ["Tell me about cloudServe", "What were the results?", "What was the research process?", "What was the hardest part?"];
    pageGreeting = "Hey! You're viewing the cloudServe case study. Ask me anything about this project, Jennifer's process, or her work in general.";
  } else if (path.indexOf("maxis") !== -1) {
    pageQA = MAXIS_QA;
    pageSuggestions = ["Tell me about Maxis Workspaces", "What were the results?", "What was the design approach?", "What was the hardest part?"];
    pageGreeting = "Hey! You're viewing the Maxis Workspaces case study. Ask me anything about this project, Jennifer's process, or her work in general.";
  } else if (path.indexOf("data-catalog") !== -1) {
    pageQA = DATACATALOG_QA;
    pageSuggestions = ["Tell me about the Data Catalog", "What were the results?", "What did Jennifer learn?", "What's next for this product?"];
    pageGreeting = "Hey! You're viewing the Data Catalog case study. Ask me anything about this project, Jennifer's process, or her work in general.";
  } else if (path.indexOf("vauto") !== -1) {
    pageQA = [];
    pageSuggestions = ["Tell me about vAuto Test Drive", "Why should I hire Jennifer?", "What's her experience?", "What tools does she use?"];
    pageGreeting = "Hey! You're viewing the vAuto Test Drive case study. Ask me anything about this project, Jennifer's process, or her work in general.";
  } else {
    pageQA = [];
    pageSuggestions = ["Why should I hire Jennifer?", "What's her experience?", "What tools does she use?", "Tell me about vAuto Test Drive"];
    pageGreeting = "Hey there! I'm Jennifer's portfolio assistant. Ask me anything about her experience, skills, projects, or why she'd be a great fit for your team!";
  }

  /* Combine page-specific QA (higher priority) with global */
  var QA = pageQA.concat(GLOBAL_QA);
  var SUGGESTIONS = pageSuggestions;
  var GREETING = pageGreeting;

  var FALLBACK = "Great question! I don't have a specific answer for that, but Jennifer would love to chat with you directly. Reach out at <a href='mailto:flores.jennifer1000@gmail.com' style='color:#6a6ff7'>flores.jennifer1000@gmail.com</a> or connect on <a href='https://www.linkedin.com/in/jenniferflo/' target='_blank' style='color:#6a6ff7'>LinkedIn</a>.";

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
      /* ── Orb toggle ── */
      "#jf-chat-toggle{position:fixed;bottom:2.5rem;right:2.5rem;z-index:9999;width:48px;height:48px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.45) 0%,rgba(255,255,255,.08) 30%,#333 60%,#111 100%);box-shadow:0 0 20px rgba(106,111,247,.2),0 0 60px rgba(106,111,247,.08);transition:filter .25s,transform .15s;animation:orb-breathe 4s ease-in-out infinite}",
      "#jf-chat-toggle::before{content:'';position:absolute;inset:-4px;border-radius:50%;background:conic-gradient(from 0deg,#6a6ff7,#7df0c4,#7db8ff,#c47dff,#ff7dca,#ffb07d,#6a6ff7);animation:orb-rainbow 4s linear infinite;-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2.5px),#000 calc(100% - 2.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 2.5px),#000 calc(100% - 2.5px))}",
      "#jf-chat-toggle::after{content:'';position:absolute;inset:-8px;border-radius:50%;background:conic-gradient(from 180deg,#6a6ff7,#7df0c4,#7db8ff,#c47dff,#ff7dca,#ffb07d,#6a6ff7);animation:orb-rainbow 5s linear infinite reverse;opacity:.25;filter:blur(10px);z-index:-1}",
      "#jf-chat-toggle:hover{filter:brightness(1.2);transform:scale(1.06)}",
      "#jf-chat-toggle:active{transform:scale(0.95)}",
      "#jf-chat-toggle svg{width:22px;height:22px;fill:rgba(255,255,255,.85);position:relative;z-index:1;filter:drop-shadow(0 1px 3px rgba(0,0,0,.4))}",
      "@keyframes orb-rainbow{to{transform:rotate(360deg)}}",
      "@keyframes orb-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}",
      /* ── Chat window ── */
      "#jf-chat-window{position:fixed;bottom:96px;right:28px;z-index:9998;width:380px;max-height:520px;background:#1a1a1a;border:1px solid rgba(255,255,255,.1);border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,.5);font-family:Inter,system-ui,sans-serif;transition:width .3s ease,max-height .3s ease}",
      "#jf-chat-window.open{display:flex}",
      "#jf-chat-window.expanded{width:560px;max-height:700px}",
      /* ── Header ── */
      "#jf-chat-header{padding:12px 16px;background:#111;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:10px}",
      "#jf-chat-header .dot{width:8px;height:8px;border-radius:50%;background:#6a6ff7}",
      "#jf-chat-header span{color:#fff;font-size:14px;font-weight:500;flex:1}",
      "#jf-chat-header button{background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:background .15s}",
      "#jf-chat-header button:hover{background:rgba(255,255,255,.1)}",
      "#jf-chat-header button svg{width:16px;height:16px;fill:rgba(255,255,255,.5)}",
      /* ── Messages ── */
      "#jf-chat-messages{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;scrollbar-width:none;-ms-overflow-style:none}",
      "#jf-chat-messages::-webkit-scrollbar{display:none}",
      ".jf-msg{max-width:85%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.55;animation:jf-fade .25s ease}",
      ".jf-msg a{color:#6a6ff7}",
      ".jf-msg.bot{background:#2a2a2a;color:#e0e0e0;align-self:flex-start;border-bottom-left-radius:4px}",
      ".jf-msg.user{background:#6a6ff7;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}",
      /* ── Suggestions ── */
      ".jf-suggestions{display:flex;flex-wrap:wrap;gap:6px;padding:0 20px 12px}",
      ".jf-sug{background:transparent;border:1px solid rgba(255,255,255,.15);color:#aaa;font-size:11px;padding:6px 12px;border-radius:20px;cursor:pointer;font-family:inherit;transition:border-color .2s,color .2s}",
      ".jf-sug:hover{border-color:#6a6ff7;color:#6a6ff7}",
      /* ── Input ── */
      "#jf-chat-input-wrap{padding:12px 16px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:8px;background:#111}",
      "#jf-chat-input{flex:1;background:#2a2a2a;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:10px 16px;color:#fff;font-size:13px;font-family:inherit;outline:none;transition:border-color .2s}",
      "#jf-chat-input:focus{border-color:#6a6ff7}",
      "#jf-chat-input::placeholder{color:#666}",
      "#jf-chat-send{background:#6a6ff7;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s}",
      "#jf-chat-send:hover{transform:scale(1.1)}",
      "#jf-chat-send svg{width:16px;height:16px;fill:#fff}",
      "@keyframes jf-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}",
      "@media(max-width:479px){#jf-chat-window{right:12px;left:12px;width:auto;bottom:80px;max-height:70vh}#jf-chat-window.expanded{width:auto;max-height:85vh}#jf-chat-toggle{bottom:1.25rem;right:1.25rem}}"
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
      '<div id="jf-chat-header">',
      '<div class="dot"></div>',
      '<span>Chat with Jennifer\'s Assistant</span>',
      '<button id="jf-chat-expand" aria-label="Expand"><svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg></button>',
      '<button id="jf-chat-close" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>',
      '</div>',
      '<div id="jf-chat-messages"></div>',
      '<div class="jf-suggestions" id="jf-suggestions"></div>',
      '<div id="jf-chat-input-wrap">',
      '<input id="jf-chat-input" type="text" placeholder="Ask me anything..." autocomplete="off"/>',
      '<button id="jf-chat-send" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>',
      '</div>'
    ].join("");
    document.body.appendChild(win);

    var messages = document.getElementById("jf-chat-messages");
    messages.addEventListener("wheel", function (e) {
      var atTop = messages.scrollTop === 0;
      var atBottom = messages.scrollTop + messages.clientHeight >= messages.scrollHeight - 1;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        e.preventDefault();
      }
      e.stopPropagation();
    }, { passive: false });

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
      input.value = "";

      setTimeout(function () {
        addMessage(findAnswer(text), "bot");
        showSuggestions();
      }, 400);
    }

    function openChat() {
      isOpen = true;
      win.classList.add("open");
      if (messages.children.length === 0) {
        addMessage(GREETING, "bot");
        showSuggestions();
      }
      input.focus();
    }

    function closeChat() {
      isOpen = false;
      win.classList.remove("open");
    }

    /* Events */
    toggle.addEventListener("click", function () {
      if (isOpen) { closeChat(); } else { openChat(); }
    });

    document.getElementById("jf-chat-close").addEventListener("click", closeChat);

    document.getElementById("jf-chat-expand").addEventListener("click", function () {
      win.classList.toggle("expanded");
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
