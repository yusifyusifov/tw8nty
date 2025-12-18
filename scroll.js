document.addEventListener("DOMContentLoaded", () => {
  const entries = document.querySelectorAll(".timeline-entry");

  const observer = new IntersectionObserver(
    (items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.classList.add("is-visible");
        } else {
          item.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.7, // % of block visible before triggering
    }
  );

  entries.forEach((entry) => observer.observe(entry));
});
