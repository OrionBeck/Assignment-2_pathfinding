# AI interaction log: extra credit only

Tool: Cursor (agent). This log covers only the extra-credit A* demo. The PDF for Problems 1 and 2 was already done before this session.

---

## Session 1 (2026-09-03, 3:16 PM)

**User:**

> Make a webpage that shows how A* works on the homework graph. Let me click through one step at a time. Show g, h, and f on each node. Let me go back and reset. Stop when G is picked. Let me click a node to see why it was chosen. Also show what Dijkstra would pick instead, and show h vs h*. Put the homework h table on the page. Keep it black and white and simple. No maze.

**Assistant:**

> I’ll turn the A* teaching page into a simpler extra-credit demo, then add the GitHub repo, AI log, and report.

**Assistant (tool calls):** Read DESIGN.md, read new-repo skill, checked git status (not a repo, gh not installed). Created `extra-credit/index.html`, `styles.css`, `app.js`. Wrote README.md, REPORT.md, AI_LOG.md, .gitignore. Updated DESIGN.md with “What shipped.” Verified files serve at `http://127.0.0.1:4173/extra-credit/`. Ran `git init -b main`, staged files, commit failed (no git identity).

**Assistant (final):**

> The extra-credit demo is the teaching page, cut down to three views and black-and-white so it is easier to move around. Open [http://localhost:4173/extra-credit/](http://localhost:4173/extra-credit/). What a viewer does: Step through: Next / Back / Reset. Node badges are g+h=f. The list is the open set, cheapest f first. Stop when G is expanded. A* vs Dijkstra: same moment: Dijkstra wants smallest g, A* wants smallest f. That is the C trap (g=1, f=16) versus A (g=3, f=10). h vs h*: claimed leftover versus true leftover. Click a node. That is your design from DESIGN.md: homework graph, one expansion per click, click-for-why, no maze editor. Deliverables in extra-credit/: browser app, AI_LOG.md, REPORT.md, README.md. GitHub repo is not up yet. Git is initialized and files are staged. This machine has no git name/email and no gh.

---



## Session 2 (2026-09-03, 11:04 PM)

**User:**

> show the homework heuristic table so the user can see all the h values - put it below everything just as reference ( makes sense right/)

**Assistant:**

> I’ll add the full h(n) table below everything as a reference.

**Assistant (tool calls):** Edited `index.html` to add a reference section with the full h(n) table under the footer. Edited `styles.css` for the reference table.

**Assistant (final):**

> Yes. A* only looks those up, so the table belongs under the demo as a reference, not in the stepping UI. Refresh [http://localhost:4173/extra-credit/](http://localhost:4173/extra-credit/). Under the graph: | n | S | A | B | C | D | E | F | G | | h(n) | 10 | 7 | 10 | 15 | 1 | 8 | 1 | 0 |

---



## Session 3 (2026-09-03, 11:11 PM)

**User:**

> step through uses it aswell

**Assistant:**

> I’ll put the same h table in the Step through panel and highlight the node being expanded.

**Assistant (tool calls):** Edited `app.js` to add `hTableHtml(used)` and `markRefH(used)`. The Step through panel now shows the homework h table with the current node’s h highlighted, and the bottom reference table tracks the same highlight.

**Assistant (final):**

> Step through now uses the same table. Each expansion highlights the h it just looked up, and f = g + that h. The black cell is the node being expanded (or the one you clicked). The reference table at the bottom tracks the same highlight. Refresh [http://localhost:4173/extra-credit/](http://localhost:4173/extra-credit/) and step from S: h(S)=10 is marked, then A’s 7, and so on.

---



## Session 4 (2026-09-03, 11:12 PM)

**User:**

> put the heuristic table for all H values below this: Homework graph: start S, goal G. Click a node for why it was picked or skipped. Arrow keys also step.

**Assistant:**

> I’ll put the h table in the footer, directly under that sentence.

**Assistant (tool calls):** Moved the h table from a separate `.ref` section into the `<footer>`, directly under the instructions. Updated `styles.css` so the footer table is compact and the highlight class works there.

**Assistant (final):**

> The h table now sits in the footer, directly under that sentence. Refresh the page and you should see: Homework graph: start S, goal G. … then Homework heuristic h(n) with S=10, A=7, B=10, C=15, D=1, E=8, F=1, G=0.

---



## Session 5 (2026-09-06, 12:26 PM)

**User:**

> prepare a submission folder that has all files we need to submit

**Assistant:**

> I’ll gather the required PDF plus the extra-credit demo, AI log, and report into one folder you can turn in.

**Assistant (tool calls):** Created `submission/`. Copied `Beck_Orion_Dijkstra_AStar.pdf` and `solution.md`. Created `submission/extra-credit/` and copied `index.html`, `app.js`, `styles.css`, `README.md`, `AI_LOG.md`, `REPORT.md`, `DESIGN.md`. Wrote `submission/README.md` explaining what to upload and what not to submit.

**Assistant (final):**

> Everything you turn in is in hw-pathfinding/submission. Required (LMS / PDF): Beck_Orion_Dijkstra_AStar.pdf: Problems 1 and 2. solution.md: same answers as text. Extra credit: folder submission/extra-credit/: browser app, AI_LOG.md, REPORT.md, README.md and DESIGN.md for the grader. Upload the PDF for the main assignment. Put the extra-credit folder in a shared GitHub repo and submit that URL (that part is still not published).

---

## Session 6 (2026-09-06, 12:59 PM)

**User:**

> include all .mds and extra credit submissables on the index.html

**Assistant:**

> I’ll add a Docs view to the page with the README, design notes, report, and this log, so the grader sees everything in one place.

**Assistant (tool calls):** Added a “Docs” nav button and a `#docs` section to `index.html` containing the full text of README.md, DESIGN.md, REPORT.md, and AI_LOG.md. Edited `app.js` so the Docs view hides the graph and shows the writeup. Edited `styles.css` for docs typography. Synced the updated files into `submission/extra-credit/`.

**Assistant (final):**

> The page now has a fourth view, Docs. It has everything the grader needs: how to open the demo (README), the design decisions (DESIGN.md), the experience report (REPORT.md), and this full AI log. The .md files are still in the repo, but nothing lives only in a file anymore. It is all on index.html.

---

