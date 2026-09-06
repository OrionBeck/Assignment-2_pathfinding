# Extra credit design: you own these decisions

AI may write the code. Do not let it invent the teaching point.

## Teaching point (one sentence)

A* expands the node with smallest **f = g + h**, so a cheap first step (S → C) can lose to a more expensive start (S → A) when the remaining estimate is honest.

## Graph

Use the **Problem 2** directed graph and the given h(n). Same numbers as the writeup. The viewer should be able to replay the homework.

## Viewer can

1. See the graph with nodes colored: unvisited / open / current / closed / on final path.
2. See the open set sorted by f, with g and h on every row.
3. Step forward one expansion, step back, and reset.
4. Click a node to read why it was expanded or left in the open set.
5. Optional toggle: “node Dijkstra would pick next” vs “node A* picks next.”

## Viewer cannot need

- A maze editor (out of scope unless you finish the core demo early).
- A lecture transcript. Short captions beat paragraphs.

## Implementation notes for whoever codes it

- Keep the search engine pure: `state → nextState`. The UI only renders snapshots.
- Stop when G is **expanded**, not when it first enters the open set.
- Record parent pointers every step so the final path can be highlighted.
- No backend. Static browser app.

## What shipped

Three views, black and white, one graph always on screen:

1. **Step through**: expand by smallest f. Open set shows g, h, f.
2. **A\* vs Dijkstra**: same snapshot, two picks.
3. **h vs h\***: claimed leftover vs true leftover.

## Repo

Public or shared GitHub repo. README must say how to open the demo (`python -m http.server` or GitHub Pages).
