document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("chatModal");
  const messagesBox = document.getElementById("chatMessages");
  const chatWith = document.getElementById("chatWith");
  const chatDate = document.getElementById("chatDate");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");

  // Conversaciones simuladas (puedes cambiar por backend luego)
  const conversations = {
    conv_001: {
      with: "Psicóloga Ana Ruiz",
      date: "12 Feb 2025 · 16:32",
      messages: [
        { from: "them", text: "Hola Fabiana, ¿cómo te sientes hoy?" },
        { from: "me", text: "He estado con mucho nerviosismo y ansiedad." },
        { from: "them", text: "Gracias por compartirlo ❤️ ¿Cuándo empezó?" }
      ]
    }
  };

  // ABRIR POPUP
  document.querySelectorAll(".msg-open").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      const convId = btn.dataset.conv;
      const conv = conversations[convId];

      if (!conv) return;

      chatWith.textContent = conv.with;
      chatDate.textContent = conv.date;

      // limpiar
      messagesBox.innerHTML = "";

      conv.messages.forEach(m => {
        const bubble = document.createElement("div");
        bubble.classList.add("chat-msg", m.from);
        bubble.textContent = m.text;
        messagesBox.appendChild(bubble);
      });

      modal.classList.remove("hidden");
    });
  });

  // CERRAR POPUP
  document.addEventListener("click", e => {
    if (e.target.id === "closeChat" || e.target.hasAttribute("data-close")) {
      modal.classList.add("hidden");
    }
  });

  // ESC para cerrar
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.add("hidden");
  });

  // ENVIAR MENSAJE
  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    const bubble = document.createElement("div");
    bubble.classList.add("chat-msg", "me");
    bubble.textContent = text;

    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    chatInput.value = "";
  });

});
