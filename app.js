const GRAPH = {
  nodes: ["S", "A", "B", "C", "D", "E", "F", "G"],
  h: { S: 10, A: 7, B: 10, C: 15, D: 1, E: 8, F: 1, G: 0 },
  hStar: { S: 11, A: 8, B: 12, C: 20, D: 2, E: 8, F: 1, G: 0 },
  pos: {
    S: [70, 200],
    A: [250, 70],
    B: [250, 200],
    C: [250, 330],
    D: [450, 70],
    E: [450, 200],
    F: [640, 70],
    G: [640, 200],
  },
  edges: [
    ["S", "A", 3],
    ["S", "B", 2],
    ["S", "C", 1],
    ["A", "D", 6],
    ["B", "E", 4],
    ["C", "G", 20],
    ["D", "F", 1],
    ["E", "G", 8],
    ["F", "G", 1],
  ],
};

function neighbors(n) {
  return GRAPH.edges.filter(([u]) => u === n).map(([, v, w]) => [v, w]);
}

function snapshots() {
  const g = { S: 0 };
  const pred = { S: null };
  const f = (n) => g[n] + GRAPH.h[n];
  let open = ["S"];
  const closed = [];
  const snaps = [
    {
      current: null,
      open: ["S"],
      closed: [],
      g: { S: 0 },
      pred: { S: null },
      note: "Start. Only S is open. f(S) = 0 + 10 = 10. A* will expand the smallest f, not the cheapest first step.",
    },
  ];

  while (open.length) {
    open.sort((a, b) => f(a) - f(b) || a.localeCompare(b));
    const current = open.shift();
    closed.push(current);
    if (current === "G") {
      snaps.push({
        current,
        open: [...open],
        closed: [...closed],
        g: { ...g },
        pred: { ...pred },
        done: true,
        note: "G is expanded. Stop here, not when G first appeared in the open set. Path follows parents: S-A-D-F-G. Cost g(G) = 11.",
      });
      break;
    }
    for (const [v, w] of neighbors(current)) {
      if (closed.includes(v)) continue;
      const neu = g[current] + w;
      if (neu < (g[v] ?? Infinity)) {
        g[v] = neu;
        pred[v] = current;
        if (!open.includes(v)) open.push(v);
      }
    }
    const ranked = [...open].sort((a, b) => f(a) - f(b) || a.localeCompare(b));
    const dijk = Object.keys(g)
      .filter((n) => !closed.includes(n))
      .sort((a, b) => g[a] - g[b] || a.localeCompare(b))[0];
    const next = ranked[0];
    let note = `Expand ${current}. g=${g[current]}, h=${GRAPH.h[current]}, f=${f(current)}.`;
    if (current === "S") {
      note +=
        " C has the cheapest step (g=1) but f(C)=16. A has g=3 and f=10, so A* goes to A.";
    } else if (dijk && next && dijk !== next) {
      note += ` Dijkstra would touch ${dijk} next (smallest g). A* touches ${next} (smallest f).`;
    }
    snaps.push({
      current,
      open: [...open],
      closed: [...closed],
      g: { ...g },
      pred: { ...pred },
      dijk,
      next,
      note,
    });
  }
  return snaps;
}

const SNAPS = snapshots();

function pathAt(snap) {
  if (!snap.done) return [];
  const path = [];
  let n = "G";
  while (n != null) {
    path.push(n);
    n = snap.pred[n];
  }
  return path.reverse();
}

function nodeClass(n, snap, path) {
  if (path.includes(n) && snap.done) return "path";
  if (snap.current === n) return "cur";
  if (snap.closed.includes(n)) return "done";
  if (snap.open.includes(n)) return "open";
  return "idle";
}

function draw(snap, focus, view) {
  const path = pathAt(snap);
  const pathEdges = new Set();
  for (let i = 0; i < path.length - 1; i++) pathEdges.add(`${path[i]}|${path[i + 1]}`);
  let html =
    '<defs><marker id="arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" /></marker></defs>';
  for (const [u, v, w] of GRAPH.edges) {
    const [x1, y1] = GRAPH.pos[u];
    const [x2, y2] = GRAPH.pos[v];
    const on = pathEdges.has(`${u}|${v}`);
    html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#arrow)" stroke="#111" stroke-width="${on ? 3.2 : 1.4}" fill="none" />`;
    html += `<text x="${(x1 + x2) / 2 + 8}" y="${(y1 + y2) / 2 - 6}" font-size="12">${w}</text>`;
  }
  for (const n of GRAPH.nodes) {
    const [x, y] = GRAPH.pos[n];
    const kind = nodeClass(n, snap, path);
    const fill = kind === "cur" || kind === "path" ? "#111" : kind === "done" ? "#bbb" : "#fff";
    const strokeW = kind === "open" || n === focus ? 3 : 1.5;
    const g = snap.g[n];
    let badge = "";
    if (view === "honest") badge = `h=${GRAPH.h[n]}  h*=${GRAPH.hStar[n]}`;
    else if (g != null) badge = `${g}+${GRAPH.h[n]}=${g + GRAPH.h[n]}`;
    const ink = fill === "#111" ? "#fff" : "#111";
    html += `<g class="hit" data-node="${n}" transform="translate(${x},${y})" style="cursor:pointer">
      <circle r="22" fill="${fill}" stroke="#111" stroke-width="${strokeW}" />
      <text y="${badge ? -2 : 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${ink}">${n}</text>
      ${badge ? `<text y="13" text-anchor="middle" font-size="9" fill="${ink}">${badge}</text>` : ""}
    </g>`;
  }
  document.getElementById("svg").innerHTML = html;
}

function openRows(snap) {
  const ranked = [...snap.open].sort(
    (a, b) => snap.g[a] + GRAPH.h[a] - (snap.g[b] + GRAPH.h[b]) || a.localeCompare(b)
  );
  if (!ranked.length) return "<p>Open set is empty.</p>";
  return ranked
    .map((n, i) => {
      const g = snap.g[n];
      const h = GRAPH.h[n];
      return `<div class="row ${i === 0 ? "next" : ""}"><b>${n}</b><span>g=${g} · h=${h}</span><span>f=${g + h}</span></div>`;
    })
    .join("");
}

function hTableHtml(used) {
  const nodes = GRAPH.nodes;
  const mark = (n) => (n === used ? " class=\"is-used\"" : "");
  return `<p><b>Look up h</b> from the homework table. f = g + that number.</p>
    <table class="htab">
      <tr><th>n</th>${nodes.map((n) => `<th${mark(n)}>${n}</th>`).join("")}</tr>
      <tr><th>h(n)</th>${nodes.map((n) => `<td${mark(n)}>${GRAPH.h[n]}</td>`).join("")}</tr>
    </table>`;
}

function markRefH(used) {
  document.querySelectorAll("#h-ref-row [data-h]").forEach((cell) => {
    cell.classList.toggle("is-used", cell.dataset.h === used);
  });
}

function whyNode(n, snap) {
  const h = GRAPH.h[n];
  const g = snap.g[n];
  if (g == null) return `${n} has not been reached yet.`;
  const f = g + h;
  if (snap.current === n) return `${n} is being expanded because it had the smallest f (${f}).`;
  if (snap.closed.includes(n)) return `${n} is closed. A* already expanded it (f=${f}).`;
  if (snap.open.includes(n)) {
    if (n === "C") return `C is open with g=1, the cheapest first step, but f=16. A* waits because A/D/F/G have smaller f.`;
    return `${n} is waiting in the open set. f=${f} (g=${g}+h=${h}). Not the smallest f yet.`;
  }
  return `${n}: g=${g}, h=${h}, f=${f}.`;
}

const panel = document.getElementById("panel");
const stepLabel = document.getElementById("step-label");
const btnStep = document.getElementById("btn-step");
const btnBack = document.getElementById("btn-back");
let view = "play";
let step = 0;
let focus = null;

const mainEl = document.querySelector("main");
const docsEl = document.getElementById("docs");

function render() {
  document.querySelectorAll("nav button").forEach((b) => b.classList.toggle("on", b.dataset.view === view));
  if (view === "docs") {
    mainEl.hidden = true;
    docsEl.hidden = false;
    return;
  }
  mainEl.hidden = false;
  docsEl.hidden = true;
  const snap = SNAPS[step];
  const used = focus || snap.current || "S";
  draw(snap, focus, view);
  markRefH(used);
  btnBack.disabled = step === 0;
  btnStep.disabled = step >= SNAPS.length - 1;
  stepLabel.textContent = `Step ${step + 1} of ${SNAPS.length}`;

  if (view === "honest") {
    const n = focus || "A";
    panel.innerHTML = `<h2>h is a guess. h* is the truth.</h2>
      <p>A* only uses h from the table. h* is the real leftover to G. The guess is allowed if h ≤ h*.</p>
      <table>
        <tr><th>n</th><th>h</th><th>h*</th><th>ok?</th></tr>
        ${GRAPH.nodes
          .map((m) => {
            const ok = GRAPH.h[m] <= GRAPH.hStar[m];
            const mark = m === n ? " style=\"font-weight:700\"" : "";
            return `<tr${mark}><td>${m}</td><td>${GRAPH.h[m]}</td><td>${GRAPH.hStar[m]}</td><td>${ok ? "yes" : "no"}</td></tr>`;
          })
          .join("")}
      </table>
      <div class="why">${n}: claimed leftover ${GRAPH.h[n]}, true leftover ${GRAPH.hStar[n]}.</div>`;
    return;
  }

  if (view === "compare") {
    const dijk = snap.dijk;
    const next = snap.next;
    panel.innerHTML = `<h2>Same list, different pick</h2>
      <p>Dijkstra expands smallest <b>g</b> (paid so far). A* expands smallest <b>f = g + h</b>.</p>
      ${
        snap.done
          ? `<p>A* has already stopped at G. Cost 11. Dijkstra would still have wanted to look at leftover cheap-g nodes.</p>`
          : `<p>Right now Dijkstra would pick <b>${dijk || "-"}</b>. A* picks <b>${next || snap.current || "S"}</b>.</p>`
      }
      ${openRows(snap)}
      <div class="why">${snap.note}</div>`;
    return;
  }

  panel.innerHTML = `<h2>${snap.current ? `Expand ${snap.current}` : "Initialize"}</h2>
    <p>${snap.note}</p>
    ${hTableHtml(used)}
    <p><b>Open set</b> (cheapest f first)</p>
    ${openRows(snap)}
    <div class="why">${focus ? whyNode(focus, snap) : "Click a node to see why it is open, closed, or next."}</div>`;
}

document.getElementById("svg").addEventListener("click", (event) => {
  const hit = event.target.closest("[data-node]");
  if (!hit) return;
  focus = hit.dataset.node;
  render();
});

document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", () => {
    view = btn.dataset.view;
    render();
  });
});

document.getElementById("btn-step").addEventListener("click", () => {
  if (step < SNAPS.length - 1) {
    step += 1;
    render();
  }
});
document.getElementById("btn-back").addEventListener("click", () => {
  if (step) {
    step -= 1;
    render();
  }
});
document.getElementById("btn-reset").addEventListener("click", () => {
  step = 0;
  focus = null;
  render();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && step < SNAPS.length - 1) step += 1;
  else if (event.key === "ArrowLeft" && step > 0) step -= 1;
  else return;
  render();
});

render();
