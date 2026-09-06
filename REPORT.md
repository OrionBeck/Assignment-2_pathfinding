# Extra credit report

## Why this was easy for me

I use AI every day and have built webpages for a lot of different things before this class. When the assignment said “you can use AI tools without any restriction,” the difficulty dropped to almost nothing. The hard part was figuring out what the demo should teach. Once I had that, the AI did the rest.

## What I actually designed

I wanted the demo to show *why* A* picks the next node, not just animate a path. Most A* demos are maze solvers. You click start and end, it floods, and a path appears. That doesn’t teach you what the algorithm is doing. So I skipped the maze and used the homework graph. The interesting part is the trap: S→C costs 1, but f(C)=16. S→A costs 3 but f(A)=10. A* picks A. That’s the whole point.

I gave the AI a plain prompt: “Make a webpage that shows how A* works on the homework graph. Let me click through one step at a time. Show g, h, and f on each node. Let me go back and reset. Stop when G is picked. Let me click a node to see why it was chosen. Also show what Dijkstra would pick instead, and show h vs h*. Put the homework h table on the page. Keep it black and white and simple. No maze.”

## Where AI tools helped

- **Turning my design into a working app fast.** I described the three views and the rules, and it wrote the HTML/CSS/JS.
- **Adding the h table when I asked.** Quick ask, worked.
- **Boilerplate.** README, folder layout, local server command.

## Where AI tools struggled

- **Understanding vs replaying.** Early tools let me click through tables without knowing what “admissible” or “optimal” meant. I had to keep asking in plain English.
- **Wrong letter pairs.** It mixed h with g, and f with the true end distance. The real checks are h ≤ h* and h(here) ≤ edge + h(next).
- **Graph weights.** It guessed different Problem 1 edge weights in different passes. I had to double-check the numbers myself.
- **Wording.** Generated sentences sounded like a textbook. I had to force the writeup into the two inequalities I actually understand.

## What I would do differently

Write the teaching point and the three views on paper first, then ask AI only to implement that spec. The AI is good at building what you describe. It’s bad at figuring out what you should describe.
