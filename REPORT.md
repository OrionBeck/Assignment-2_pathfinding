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

- **It wanted to build a maze.** Every A* demo it knows is a maze solver. I had to insist on the homework graph.
- **Wrong numbers at first.** It guessed edge weights and h values from memory instead of reading them off the assignment figure. I checked every number myself.
- **Overcomplicated UI.** First passes had color, extra panels, and features I never asked for. I kept cutting it back to black and white and three buttons.
- **Wording.** Generated captions sounded like a textbook. I had to force them into short plain sentences.

## What I would do differently

Write the teaching point and the three views on paper first, then ask AI only to implement that spec. The AI is good at building what you describe. It’s bad at figuring out what you should describe.
