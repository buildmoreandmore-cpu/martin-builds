/**
 * martin.builds — Embeddable Agent Widget
 * Usage: <script src="https://martinbuilds.ai/agent.js?key=YOUR_EMBED_KEY"></script>
 * Zero dependencies. Vanilla JS.
 */
(function () {
  var script = document.currentScript;
  var params = new URLSearchParams(script.src.split("?")[1] || "");
  var EMBED_KEY = params.get("key");
  if (!EMBED_KEY) {
    console.warn("[martin.builds] Missing embed key in agent.js");
    return;
  }

  var API_URL = script.src.split("/agent.js")[0] + "/api/widget/chat";
  var GREEN = "#c8ff00";
  var BG = "#0a0a0a";
  var CARD = "#1a1a1a";
  var isOpen = false;
  var messages = [];

  // --- Styles ---
  var style = document.createElement("style");
  style.textContent =
    "#mb-widget-bubble{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:" +
    GREEN +
    ";cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:99999;transition:transform .2s,box-shadow .2s;border:none}" +
    "#mb-widget-bubble:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(200,255,0,0.3)}" +
    "#mb-widget-panel{position:fixed;bottom:92px;right:24px;width:380px;max-height:520px;background:" +
    BG +
    ";border:1px solid #2a2a2a;border-radius:16px;z-index:99999;display:none;flex-direction:column;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,0.5);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}" +
    "#mb-widget-panel.open{display:flex}" +
    "#mb-widget-header{padding:16px 20px;border-bottom:1px solid #2a2a2a;display:flex;align-items:center;justify-content:space-between}" +
    "#mb-widget-messages{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;max-height:340px}" +
    "#mb-widget-input-wrap{padding:12px 16px;border-top:1px solid #2a2a2a;display:flex;gap:8px}" +
    "#mb-widget-input{flex:1;background:" +
    CARD +
    ";border:1px solid #2a2a2a;border-radius:8px;padding:10px 14px;color:#f5f5f0;font-size:14px;outline:none}" +
    "#mb-widget-input:focus{border-color:" +
    GREEN +
    "}" +
    "#mb-widget-send{background:" +
    GREEN +
    ";border:none;border-radius:8px;width:40px;cursor:pointer;display:flex;align-items:center;justify-content:center}" +
    ".mb-msg{max-width:85%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.5;word-wrap:break-word}" +
    ".mb-msg-user{background:" +
    GREEN +
    ";color:" +
    BG +
    ";align-self:flex-end;border-bottom-right-radius:4px}" +
    ".mb-msg-bot{background:" +
    CARD +
    ";color:#e0e0e0;align-self:flex-start;border-bottom-left-radius:4px}" +
    ".mb-typing{align-self:flex-start;padding:10px 14px;background:" +
    CARD +
    ";border-radius:12px;border-bottom-left-radius:4px;font-size:13px;color:#888}" +
    "@media(max-width:480px){#mb-widget-panel{right:12px;left:12px;bottom:84px;width:auto;max-height:70vh}}";
  document.head.appendChild(style);

  // --- Bubble ---
  var bubble = document.createElement("button");
  bubble.id = "mb-widget-bubble";
  bubble.setAttribute("aria-label", "Chat with us");
  bubble.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  document.body.appendChild(bubble);

  // --- Panel ---
  var panel = document.createElement("div");
  panel.id = "mb-widget-panel";
  panel.innerHTML =
    '<div id="mb-widget-header">' +
    '<span style="font-size:14px;font-weight:700;color:#f5f5f0">Chat with us</span>' +
    '<button id="mb-widget-close" style="background:none;border:none;color:#888;cursor:pointer;font-size:18px;padding:0;line-height:1">&times;</button>' +
    "</div>" +
    '<div id="mb-widget-messages"></div>' +
    '<div id="mb-widget-input-wrap">' +
    '<input id="mb-widget-input" placeholder="Type a message..." autocomplete="off" />' +
    '<button id="mb-widget-send"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>' +
    "</div>";
  document.body.appendChild(panel);

  var msgContainer = document.getElementById("mb-widget-messages");
  var input = document.getElementById("mb-widget-input");
  var sendBtn = document.getElementById("mb-widget-send");
  var closeBtn = document.getElementById("mb-widget-close");

  function toggle() {
    isOpen = !isOpen;
    panel.classList.toggle("open", isOpen);
    if (isOpen && messages.length === 0) {
      addMessage("bot", "Hey! How can I help you today?");
    }
    if (isOpen) input.focus();
  }

  function addMessage(role, text) {
    messages.push({ role: role, text: text });
    var div = document.createElement("div");
    div.className = "mb-msg " + (role === "user" ? "mb-msg-user" : "mb-msg-bot");
    div.textContent = text;
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function showTyping() {
    var div = document.createElement("div");
    div.className = "mb-typing";
    div.id = "mb-typing";
    div.textContent = "Typing...";
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById("mb-typing");
    if (el) el.remove();
  }

  async function send() {
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    addMessage("user", text);
    showTyping();

    try {
      var res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embed_key: EMBED_KEY, message: text }),
      });
      var data = await res.json();
      hideTyping();
      addMessage("bot", data.response || data.error || "Something went wrong.");
    } catch (e) {
      hideTyping();
      addMessage("bot", "Connection error. Please try again.");
    }
  }

  bubble.addEventListener("click", toggle);
  closeBtn.addEventListener("click", toggle);
  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") send();
  });
})();
