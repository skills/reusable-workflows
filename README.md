<!--
  <<< Author notes: Header of the course >>>
  Read <https://skills.github.com/quickstart> for more information about how to build courses using this template.
  Include a 1280×640 image, course name in sentence case, and a concise description in emphasis.
  In your repository settings: enable template repository, add your 1280×640 social image, auto delete head branches.
  Next to "About", add description & tags; disable releases, packages, & environments.
  Add your open source license, GitHub uses Creative Commons Attribution 4.0 International.
-->

# Reusable workflows and matrix strategies

_Make a workflow reusable, call it in another workflow, and use a matrix strategy to run multiple versions_

<!--
  <<< Author notes: Start of the course >>>
  Include start button, a note about Actions minutes,
  and tell the learner why they should take the course.
  Each step should be wrapped in <details>/<summary>, with an `id` set.
  The start <details> should have `open` as well.
  Do not use quotes on the <details> tag attributes.
-->

<details id=0 open>
<summary><h2>Welcome</h2></summary>

Reusable workflows offer a simple and powerful way to avoid copying and pasting workflows across your repositories, and adding a matrix strategy lets you use variables in a single job definition to automatically create multiple job runs.

- **Who is this for**: Developers, DevOps engineers, students, managers, teams, GitHub users.
- **What you'll learn**: How to create and use reusable workflows, create a matrix strategy, trigger workflows, and find workflow logs.
- **What you'll build**: An Actions workflow with a matrix strategy that calls a reusable workflow to output multiple verisions of node.
- **Prerequisites**: In this course you will work with pull requests and YAML workflow files. We recommend you take the [Introduction to GitHub](https://github.com/skills/introduction-to-github) course first or be familiar with GitHub basics, and the [Hello GitHub Actions](https://github.com/skills/hello-github-actions) course for an introduction to GitHub Actions and workflow files.
- **How long**: This course is five steps long and can be finished in less than one hour.
- **Attribution**: This Skills course was inspired by a [demo video](https://www.youtube.com/watch?v=MBpyouQtY_M) created by Mickey Gousset ([@mickeygousset](https://github.com/mickeygousset)).

## How to start this course

<!-- For start course, run in JavaScript:
'https://github.com/new?' + new URLSearchParams({
  template_owner: 'skills',
  template_name: 'reusable-workflows',
  owner: '@me',
  name: 'skills-reusable-workflows',
  description: 'My clone repository',
  visibility: 'public',
}).toString()
-->

[![start-course](https://user-images.githubusercontent.com/1221423/235727646-4a590299-ffe5-480d-8cd5-8194ea184546.svg)](https://github.com/new?template_owner=skills&template_name=reusable-workflows&owner=%40me&name=skills-reusable-workflows&description=My+clone+repository&visibility=public)

1. Right-click **Start course** and open the link in a new tab.
2. In the new tab, most of the prompts will automatically fill in for you.
   - For owner, choose your personal account or an organization to host the repository.
   - We recommend creating a public repository, as private repositories will [use Actions minutes](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions).
   - Scroll down and click the **Create repository** button at the bottom of the form.
3. After your new repository is created, wait about 20 seconds, then refresh the page. Follow the step-by-step instructions in the new repository's README.

</details>

<!--
  <<< Author notes: Step 1 >>>
  Choose 3-5 steps for your course.
  The first step is always the hardest, so pick something easy!
  Link to docs.github.com for further explanations.
  Encourage users to open new tabs for steps!
-->

<details id=1>
<summary><h2>Step 1: Make a workflow reusable</h2></summary>

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

</details>

<!--
  <<< Author notes: Step 2 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
-->

<details id=2>
<summary><h2>Step 2: Add a job to call the reusable workflow</h2></summary>

_Nice work! :tada: You made a workflow reusable!_

Now that you have a reusable workflow, you can call it in another workflow within a new or existing job. But before we do that, let's take a minute to understand what our reusable workflow is doing by looking at the content of the file.

**Understanding the file contents of your reusable workflow**

```yaml
name: Reusable Workflow

on:
  workflow_call:
    inputs:
      node:
        required: true
        type: string

jobs:

  build:

    runs-on: ubuntu-latest

    steps:

      - uses: actions/checkout@v3

      - name: Output the input value
        run: |
         echo "The node version to use is: ${{ inputs.node }}"
```

The resuable workflow requires an `input` of `node` in order for the workflow to work. You need to make sure that the other workflow you are using to call this reusable workflow outputs a node version. If a node input is detected, the workflow will kick off a job called `build` that runs on ubuntu-latest.

The step within the `build` job uses an action called `checkout@v3` to checkout the code and then a step to output the input value by running an echo command to print to the Actions log console the following message, `The node version to use is: ${{ inputs.node }}`. The node input here is the output node value you need to have in your other workflow.

Okay, now that we know what the reusable workflow is doing, let's now add a new job to another workflow called **my-starter-workflow** to call our reusable workflow. We can do this by using the `uses:` command and then setting the path to the workflow we want to use. We also need to make sure we define that node input or the reusable workflow won't work.

### :keyboard: Activity: Add a job to your workflow to call the reusable workflow

1. Navigate to the `.github/workflows/` folder and open the `my-starter-workflow.yml` file.
1. Add a new job to the workflow called `call-reusable-workflow`.
1. Add a `uses` command and path the command to the `reusable-workflow.yml` file.
1. Add a `with` command to pass in a `node` paramater and set the value to `14`.

   ```yaml
   call-reusable-workflow:
     uses: ./.github/workflows/reusable-workflow.yml
     with:
       node: 14
   ```
1. To commit your changes, click **Start commit**, and then **Commit changes**.
1. Wait about 20 seconds for actions to run, then refresh this page (the one you're following instructions from) and an action will automatically close this step and open the next one.

</details>

<!--
  <<< Author notes: Step 3 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
-->

<details id=3>
<summary><h2>Step 3: Add a matrix strategy to your workflow</h2></summary>

_Well done! :sparkles:_

Your **My Starter Workflow** now has a job that outputs the node version of 14 and calls the reusable workflow called **Reusable Workflow**. It then prints a message to the Actions logs of the node version for the build. Now, we haven't checked the Actions logs at the point to see the message, but don't worry, we'll get there after this next step. Let's improve our **My Starter Workflow** a little more but adding a matrix strategy.

**What is a matrix strategy**: A matrix strategy lets you use variables in a single job definition to automatically create multiple job runs that are based on the combinations of the variables. For example, you can use a matrix strategy to test your code in multiple versions of a language or on multiple operating systems. Below is an example:

```yaml
jobs:
  example_matrix:
    strategy:
      matrix:
        version: [10, 12, 14]
        os: [ubuntu-latest, windows-latest]
```
To define a matrix strategy inside a job, you first need to define the matrix with the keyword `strategy` followed by the nested keyword `matrix`. You can then define variables for the matrix. In the above example, the variables are `version` with the values of `10, 12, and 14`, and another variable called `os` with the values of `ubuntu-latest and windows latest`.

The `example_matrix` job will run for each possible combination of the variables. So, in the above example, the workflow will run six jobs, one for each combination of the os and version variables. If you want to run a job for multiple versions, using a matrix strategy is a great solution over writing out 6 different jobs.

Let's add a matrix strategy to the **My Starter Workflow** so we can run our job on different versions of node instead of the hard-coded single verison of 14.

### :keyboard: Activity: Use a matrix strategy to run multiple versions

1. In the same `my-starter-workflow.yml` file, add a `strategy` keyword under the `call-reusable-workflow` job.
1. Under `strategy`, add a `matrix` keyword.
1. Define the `nodeversion` variable to run over the following versions of node `[14, 16, 18, 20]`.
1. Replace the hard-coded `node` paramter of 14 used in the `with` command, and call the `nodeversion` in the matrix by using the following syntax `${{ matrix.nodeversion }}`. Below is that your job should look like:

   ```yaml
   call-reusable-workflow:
     strategy:
       matrix:
         nodeversion: [14, 16, 18, 20]
     uses: ./.github/workflows/reusable-workflow.yml
     with:
       node: ${{ matrix.nodeversion }}
   ```
1. To commit your changes, click **Start commit**, and then **Commit changes**.
1. Wait about 20 seconds for actions to run, then refresh this page (the one you're following instructions from) and an action will automatically close this step and open the next one.

</details>

<!--
  <<< Author notes: Step 4 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
-->

<details id=4>
<summary><h2>Step 4: Merge your changes</h2></summary>

_Nicely done! :partying_face:_

You've added a matrix strategy to your workflow file that is now running on four different versions of node `[14, 16, 18, 20]` instead of the single hard-coded version of only `14`.

We'll now merge your changes so that your workflow file changes will be part of the `main` branch.

### :keyboard: Activity: Create and merge your pull request

1. Merge your changes from `reusable-workflow` into `main`. If you created the pull request in step 1, open that PR and click on **Merge pull request**. If you did not create the pull request earlier, you can do it now by following the instructions in step 1.
1. Optionally, click **Delete branch** to delete your `reusable-workflow` branch.
1. Wait about 20 seconds for actions to run, then refresh this page (the one you're following instructions from) and an action will automatically close this step and open the next one.


</details>

<!--
  <<< Author notes: Step 5 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
-->

<details id=5>
<summary><h2>Step 5: Trigger your workflow and view the Actions logs</h2></summary>

_You're almost done. Last step! :heart:_

Now that the changes have been merged into the `main` branch, let's trigger the **My Starter Workflow** workflow to see everyting in action! But before we do, let's recall what we should expect to see before we run the workflow.
  - We should expect to see five jobs running from our *My Starter Workflow**. Do you remember which ones? We have the `build` job and then the `call-reusable-workflow` job that has the matrix strategy.
    ![Screen Shot 2022-09-08 at 9 53 52 AM](https://user-images.githubusercontent.com/6351798/189220189-97361a5e-eecf-4666-a859-e0587354bafe.png)
  - We should also expect to see the echo message printed as an output from the reusable workflow with the node version for each of the matrix version jobs.
    ![Screen Shot 2022-09-08 at 9 52 41 AM](https://user-images.githubusercontent.com/6351798/189220620-0576540a-366f-44e1-866c-2955af399cdb.png)

### :keyboard: Activity: Run the My Starter Workflow and view the Actions logs

1. Navigate to the **Actions** tab in your repo.
1. Choose the **My Starter Workflow** workflow from the left, and select the **Run workflow** button and run the workflow on the **Main** branch.
1. Wait a few seconds for the workflow run to appear in the queue. Once it shows, select the **My Starter Workflow** from the workflow runs queue.

Notice the list of build jobs on the left. One for the `build` job and four for the different node versions (14, 16, 18, 20) that you are running from your matrix. When one of the node version jobs complete, you can select that job and view the Actions logs for the **Output the input value**. This will print out the message from the reusable workflow file.

When you're done reviewing the Actions logs, return here and refresh the page to finish the course! 🎉



</details>

<!--
  <<< Author notes: Finish >>>
  Review what we learned, ask for feedback, provide next steps.
-->

<details id=X>
<summary><h2>Finish</h2></summary>

_Congratulations friend, you've completed this course!_ 🎉

<img src="https://octodex.github.com/images/skatetocat.png" alt=celebrate width=300 align=right>

Here's a recap of all the tasks you've accomplished in your repository:

- You made a workflow reusable by using the `workflow_call` event trigger
- You created a new job in a separate workflow to call the reusable workflow
- You added a matrix strategy to run a job on multiple node versions
- You navigated through the Actions logs to view the workflow runs and results from specific jobs

### What's next?

- Learn more about GitHub Actions by reading "[Learn GitHub Actions](https://docs.github.com/actions/learn-github-actions)".
- Use actions created by others in [awesome-actions](https://github.com/sdras/awesome-actions).
- We'd love to hear what you thought of this course [in our discussion board](https://github.com/skills/.github/discussions).
- [Take another GitHub Skills course](https://github.com/skills).
- Learn more about GitHub by reading the "[Get started](https://docs.github.com/get-started)" docs.
- To find projects to contribute to, check out [GitHub Explore](https://github.com/explore).

</details>

<!--
  <<< Author notes: Footer >>>
  Add a link to get support, GitHub status page, code of conduct, license link.
-->

---

Get help: [Post in our discussion board](https://github.com/skills/.github/discussions) &bull; [Review the GitHub status page](https://www.githubstatus.com/)

&copy; 2022 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)
