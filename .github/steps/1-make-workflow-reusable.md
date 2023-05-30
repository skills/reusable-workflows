<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

## Step 1: Make a workflow reusable

_Welcome to "Reusable Workflows and Matrix Strategies"! :wave:_

You can do a lot with GitHub Actions! You can automate repetitive tasks, build continuous integration and continuous deployment pipelines, and customize essentially any part of your software development workflow. It doesn't matter if you're just learning about workflows and GitHub Actions for the first time or you're well exerpienced with the process, you'll quickly find yourself repeating automation jobs and steps within the same workflow, and even using the dreaded copy and paste method for workflows across multiple repositories.

Is there a solution to reduce these repetitive tasks? Yes, I'm glad you asked :wink: Enter **reusable workflows**, a simple and powerful way to avoid copying and pasting workflows across your repositories.

**What are the benefits of using reusable workflows?**: Reusable workflows are … reusable. Reusable workflows let you DRY (don’t repeat yourself) your Actions configurations, so you don’t need to copy and paste your workflows from one repository to another.

- Case in point: if you have three different Node applications and you’re building them all the same way, you can use one reusable workflow instead of copying and pasting your workflows again and again.

**I have a workflow, how do I make it reusable?**: A reusable workflow is just like any GitHub Actions workflow with one key difference: it includes a `workflow_call` event trigger, similar to event triggers like `push`, `issues`, and `workflow_dispatch`. This means that all you need to do to make a workflow reusable is to use the workflow call trigger.

Let's get started with our first step to see how this would work!

### :keyboard: Activity: Add a `workflow_call` trigger to a workflow

1. Open a new browser tab, and navigate to this same repository. Then, work on the steps in your second tab while you read the instructions in this tab.
1. Navigate to the **Code** tab.
1. From the **main** branch dropdown, click on the **reusable-workflow** branch.
1. Navigate to the `.github/workflows/` folder, then select the **reusable-workflow.yml** file.
1. Replace the `workflow_dispatch` event trigger with the `workflow_call` event trigger. It should look like the following:

   ```yaml
   name: Reusable Workflow

   on:
     workflow_call:
       inputs:
         node:
           required: true
           type: string
   ```

1. To commit your changes, click **Start commit**, and then **Commit changes**.
1. (optional) Create a pull request to view all the changes you'll make throughout this course. Click the **Pull Requests** tab, click **New pull request**, set `base: main` and `compare: reusable-workflow`.
1. Wait about 20 seconds for actions to run, then refresh this page (the one you're following instructions from) and an action will automatically close this step and open the next one.
