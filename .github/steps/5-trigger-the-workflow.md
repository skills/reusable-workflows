<!--
  <<< Author notes: Step 5 >>>
  Start this step by acknowledging the previous step.
  Define terms and link to docs.github.com.
-->

## Step 5: Trigger your workflow and view the Actions logs

_You're almost done. Last step! :heart:_

Now that the changes have been merged into the `main` branch, let's trigger the **My Starter Workflow** workflow to see everyting in action! But before we do, let's recall what we should expect to see before we run the workflow.

- We should expect to see five jobs running from our \*My Starter Workflow\*\*. Do you remember which ones? We have the `build` job and then the `call-reusable-workflow` job that has the matrix strategy.
  ![Screen Shot 2022-09-08 at 9 53 52 AM](https://user-images.githubusercontent.com/6351798/189220189-97361a5e-eecf-4666-a859-e0587354bafe.png)
- We should also expect to see the echo message printed as an output from the reusable workflow with the node version for each of the matrix version jobs.
  ![Screen Shot 2022-09-08 at 9 52 41 AM](https://user-images.githubusercontent.com/6351798/189220620-0576540a-366f-44e1-866c-2955af399cdb.png)

### :keyboard: Activity: Run the My Starter Workflow and view the Actions logs

1. Navigate to the **Actions** tab in your repo.
1. Choose the **My Starter Workflow** workflow from the left, and select the **Run workflow** button and run the workflow on the **Main** branch.
1. Wait a few seconds for the workflow run to appear in the queue. Once it shows, select the **My Starter Workflow** from the workflow runs queue.

Notice the list of build jobs on the left. One for the `build` job and four for the different node versions (14, 16, 18, 20) that you are running from your matrix. When one of the node version jobs complete, you can select that job and view the Actions logs for the **Output the input value**. This will print out the message from the reusable workflow file.

When you're done reviewing the Actions logs, return here and refresh the page to finish the course! 🎉
