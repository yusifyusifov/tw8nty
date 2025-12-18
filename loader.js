(() => {
  const svg = document.getElementById("logoSvg");
  const group = document.getElementById("strokeGroup");
  const loader = document.getElementById("loader");

  // Auto-fit viewBox
  const bbox = group.getBBox();
  const padding = 40;
  svg.setAttribute(
    "viewBox",
    `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${
      bbox.height + padding * 2
    }`
  );

  const strokes = document.querySelectorAll(".stroke");
  const fills = document.querySelectorAll(".fill");

  const WRITE_DURATION = 2400;
  const ERASE_DURATION = 2400;
  const PAUSE = 800;

  function setup() {
    strokes.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
    });
  }

  function write() {
    strokes.forEach((path) => {
      path.style.transition = `stroke-dashoffset ${WRITE_DURATION}ms ease`;
      path.style.strokeDashoffset = 0;
    });
  }

  function showFill() {
    fills.forEach((p) => (p.style.opacity = 1));
  }

  function erase() {
    fills.forEach((p) => (p.style.opacity = 0));
    strokes.forEach((path) => {
      const len = path.getTotalLength();
      path.style.transition = `stroke-dashoffset ${ERASE_DURATION}ms ease`;
      path.style.strokeDashoffset = len;
    });
  }

  function loop() {
    write();
    setTimeout(showFill, WRITE_DURATION * 0.85);

    setTimeout(() => {
      erase();
      setTimeout(loop, ERASE_DURATION);
    }, WRITE_DURATION + PAUSE);
  }

  setup();
  loop();

  // 🔥 Fade out loader after 2 seconds and unlock scroll
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.style.overflow = "auto"; // unlock scroll
  }, 5000);
})();
