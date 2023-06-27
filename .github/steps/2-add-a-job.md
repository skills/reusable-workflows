<!--
  <<< Author notes: Step 2 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
-->

## Step 2: Add a job to call the reusable workflow

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

The reusable workflow requires an `input` of `node` in order for the workflow to work. You need to make sure that the other workflow you are using to call this reusable workflow outputs a node version. If a node input is detected, the workflow will kick off a job called `build` that runs on ubuntu-latest.

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
