document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains("active");

    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.style.maxHeight = null;
    });
    document.querySelectorAll(".faq-question").forEach((q) => {
      q.classList.remove("active");
    });

    if (!isOpen) {
      btn.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
