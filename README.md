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

## Everything else

The page has four tabs: Step through, A* vs Dijkstra, h vs h*, and Docs. The Docs tab contains the design notes, the experience report, and the full AI log, so everything is readable on the page itself. The same content is also in [DESIGN.md](DESIGN.md), [REPORT.md](REPORT.md), and [AI_LOG.md](AI_LOG.md).
