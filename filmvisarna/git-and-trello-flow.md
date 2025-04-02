# Git and Trello Flow

<details open>
<summary>Table of Contents</summary>

- [Git Flow](#git-flow)
  - [Before starting a new task](#before-starting-a-new-task)
  - [Working on your feature branch](#working-on-your-feature-branch)
  - [Merging your branch with master/main](#merging-your-branch-with-mastermain)
    - [Step 1 – Update your local master/main](#step-1--update-your-local-mastermain)
    - [Step 2 – Merge master/main into your feature branch](#step-2--merge-mastermain-into-your-feature-branch)
    - [Step 3 – Create a Pull Request (PR)](#step-3--create-a-pull-request-pr)
- [Trello Flow](#trello-flow)
  - [Product Backlog](#product-backlog)
  - [Sprint Backlog](#sprint-backlog)
  - [Tasks](#tasks)
  - [Review](#review)
  - [Done](#done)

</details>

## Git Flow

When working together as a group in this project, you need to manage your shared codebase using GitHub. To avoid issues and reduce the risk of code conflicts or errors, everyone must follow a clear and consistent workflow.

### Before starting a new task

**On `master` or `main`:**

- `git pull`  
  Fetch the latest code from the master/main branch.

- `git checkout -b feature/your-branch-name`  
  Create a new branch based on the latest `master` or `main`.  
  Branches should always be created from the main branch to avoid unnecessary conflicts.  
  Name your branch after the task you're working on, e.g., `feature/login-form`.

[Back to top](#git-and-trello-flow)

### Working on your feature branch

While working on your task, make frequent commits to reduce the risk of losing work.

- `git add .` or `git add file/name`  
  Stage your changes.

- `git commit -m "Short but descriptive message"`  
  Commit your staged changes with a clear message.  
  Always include the `-m` flag to avoid opening the terminal editor (often VIM, which can be tricky if you're unfamiliar with it).

- `git push`  
  Push your commits to the remote repository.

Repeat this process as needed while you continue working on your feature.

[Back to top](#git-and-trello-flow)

### Merging your branch with master/main

Once your feature is complete, follow these steps to merge it into `master` or `main`:

#### Step 1 – Update your local master/main

- `git checkout master` (or `main`)
- `git pull`  
  Make sure your local master/main branch is up to date.  
  _Important: Before switching branches, commit or stash all your current changes._

[Back to top](#git-and-trello-flow)

#### Step 2 – Merge master/main into your feature branch

- `git checkout your-feature-branch`
- `git merge master` (or `main`)  
  This brings the latest changes from master into your feature branch.

  **Why?**  
  This ensures any merge conflicts are handled locally on your machine, keeping the remote repository stable.

  **Tip – Abort a merge:**  
  If you accidentally start a merge and want to cancel it (e.g., because of unexpected conflicts), you can run:

  - `git merge --abort`

  This will stop the merge process and return your branch to its previous state.

If conflicts occur, use the built-in merge conflict editor in VS Code to resolve them.  
After resolving:

- `git add .`
- `git commit`
- `git push`

Now your branch is up to date with master and ready for review.

[Back to top](#git-and-trello-flow)

### Step 3 – Create a Pull Request (PR)

Go to GitHub and open a Pull Request from your feature branch to `master`/`main`.  
Assign one or two teammates to review your code.  
Once it's approved, you can merge it.

After merging, start your next task by creating a new branch from the updated `master`/`main`.

[Back to top](#git-and-trello-flow)

## Trello Flow

To manage your tasks and user stories during the sprint, we use **Trello** as a visual project management board following the Scrum methodology. Your Trello board should have the following columns:

[Back to top](#git-and-trello-flow)

### Product Backlog

This column contains all the user stories and tasks that are planned for future sprints but are **not yet prioritized**. It acts as the source of all upcoming work and is usually managed by the product owner or team lead.

[Back to top](#git-and-trello-flow)

### Sprint Backlog

At the beginning of each sprint, selected items from the Product Backlog are moved into the Sprint Backlog. These are the tasks the team **commits to completing during the current sprint**.

Each card should represent a user story or a clear task, ideally with acceptance criteria or a checklist.

[Back to top](#git-and-trello-flow)

### Tasks

This is where you move your cards when you have started working on them. It reflects tasks that are **in progress**.

Each card in this column should be assigned to one or more team members. You can use labels or checklist items to track sub-tasks or technical details if needed.

[Back to top](#git-and-trello-flow)

### In Progress

This is wher you move a task that has been assigned to one of the team members. It symolizes that the tasks is being worked on.

### Review

Once your feature or task is complete and you’ve created a Pull Request on GitHub, move the card to the **Review** column.  
This signals that the task is **waiting for code review by other team members**.

Make sure to:

- Link the PR in the Trello card. _(not necessary)_
- Tag the reviewers.
- Update the card if changes are requested.

[Back to top](#git-and-trello-flow)

### Done

After the Pull Request is approved and merged into `master` or `main`, move the card to **Done**. This column represents all the tasks that are **finished and part of the codebase**.

[Back to top](#git-and-trello-flow)
