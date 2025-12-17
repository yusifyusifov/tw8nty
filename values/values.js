// Sequence of connections
const sequence = [
  ["resonance", "ambition"],
  ["ambition", "authenticity"],
  ["authenticity", "legacy"],
  ["legacy", "bold"],
  ["bold", "innovation"],
  ["innovation", "unity"],
  ["unity", "vision"],
];

let svg;
let coords = {};
let glow; // single persistent glow

// --- UTILITIES ---
function getCenter(el) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 1 + window.scrollY,
  };
}

function computeCoords() {
  coords = {};
  const ids = new Set(sequence.flat());
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    coords[id] = getCenter(el);
  });
}

// --- ANIMATION ---
function animateThread(index = 0) {
  const [from, to] = sequence[index];
  const fromC = coords[from],
    toC = coords[to];
  if (!fromC || !toC) return;

  // Create a fresh line each cycle
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", fromC.x);
  line.setAttribute("y1", fromC.y);
  line.setAttribute("x2", toC.x);
  line.setAttribute("y2", toC.y);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);

  const length = Math.hypot(toC.x - fromC.x, toC.y - fromC.y);
  line.setAttribute("stroke-dasharray", length);
  line.setAttribute("stroke-dashoffset", length);

  // Animate line draw
  gsap.to(line, { strokeDashoffset: 0, duration: 1 });

  // Animate glow move (reuse single glow)
  gsap.fromTo(
    glow,
    { attr: { cx: fromC.x, cy: fromC.y } },
    {
      attr: { cx: toC.x, cy: toC.y },
      duration: 1,
      onComplete: () => {
        // Fade out line only
        gsap.to(line, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => {
            line.remove();
            // Glow stays at target until next cycle moves it
            animateThread((index + 1) % sequence.length);
          },
        });
      },
    }
  );
}

// --- INIT ---
window.addEventListener("load", () => {
  svg = document.getElementById("thread-svg");
  computeCoords();

  // Create single persistent glow once
  glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  glow.setAttribute("r", "6");
  glow.setAttribute("fill", "white");
  glow.setAttribute("filter", "url(#glow)");
  svg.appendChild(glow);

  animateThread(0);
});
