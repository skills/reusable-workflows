<!--
  <<< Author notes: Step 3 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
-->

## Step 3: Add a matrix strategy to your workflow

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
