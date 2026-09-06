# How A* chooses

Browser demo of A* on the homework graph (start **S**, goal **G**).

**Teaching point:** A* expands the node with smallest `f = g + h`. A cheap first step (S→C) can lose to a more expensive start (S→A) when the leftover guess is honest.

## Open the demo

From this folder:

```
python -m http.server 4173
```

Then open [http://localhost:4173/](http://localhost:4173/).

Or open `index.html` through any static host (GitHub Pages works; just serve this folder).

## What to do

1. **Step through**: Next step / Back / Reset, or arrow keys. Badges on nodes are `g+h=f`. The list is the open set, cheapest f first.
2. **A* vs Dijkstra**: same moment, Dijkstra would pick smallest g, A* picks smallest f.
3. **h vs h***: the table guess versus the true leftover to G. Click a node.
4. Click any node to see why it is next, waiting, or closed.

Stop rule: G is expanded, not merely discovered.

## Design

See [DESIGN.md](DESIGN.md). I chose the homework graph so the demo replays the writeup. The interesting beat is C (g=1, f=16) versus A (g=3, f=10).

## Extra-credit extras

- **Docs view**: the fourth tab on the page. README, DESIGN.md, REPORT.md, and the full AI_LOG.md are all on `index.html`, so the grader sees everything in one place.
- [AI_LOG.md](AI_LOG.md): every AI session used for this assignment
- [REPORT.md](REPORT.md): what AI helped with and where it failed
