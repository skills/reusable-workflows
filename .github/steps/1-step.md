## Step 1: Create your reusable workflow

Your company Octogames has been continuously shipping new web games! You, as the DevOps engineer were always tasked with creating GitHub Actions workflows for CI/CD.

You find yourself copy-pasting the same workflow logic across repositories. In this exercise, you'll create a reusable workflow to **centralize CI logic**, **standardize automation**, and **reuse it across repositories**.

<img width="900" alt="descriptive alt text" src="../images/octomatch.png" />

### 📖 Theory: What makes a workflow reusable?

A reusable workflow in GitHub Actions is a workflow that can be called from another workflow. This helps you keep repeated CI logic in one place instead of copying it across repositories.

A workflow becomes reusable when it includes the `workflow_call` trigger. Reusable workflows can also accept inputs and return outputs, so the same workflow can adapt to different projects and contexts.

In this step, you'll create a reusable workflow for Node.js quality checks and use it from a caller workflow in the next step.

### ⌨️ Activity: Set up your development environment

Let's use **GitHub Codespaces** to set up a cloud-based development environment and work in it for the remainder of the exercise!

1. Right-click the below button to open the **Create Codespace** page in a new tab. Use the default configuration.

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

1. Confirm the **Repository** field is your copy of the exercise, not the original, then click the green **Create Codespace** button.
   - ✅ Your copy: `/{{full_repo_name}}`
   - ❌ Original: `/skills/reusable-workflows`

1. Wait a moment for Visual Studio Code to fully load in your browser.

   > ⏳ **Wait:** This can take up to a few minutes.

1. (optional) Once your codespace is fully loaded you can run the folowing command to see the **Octomatch** application running:

   ```bash
   npm run dev
   ```

   > 🪧 **Note:** By the end of this exercise you will have a chance to play this game again, deployed to GitHub Pages by the workflows you are about to create!

### ⌨️ Activity: Create a reusable workflow

Let's start off by creating a reusable workflow for the Node.js projects in your company. This workflow will run linting, tests with coverage reporting, and end-to-end tests with Playwright.

1. In your codespace create a new branch named exactly `reusable-workflows` and switch to it.

   ```bash
   git checkout -b reusable-workflows
   ```

1. Within the `.github/workflows` directory create a new workflow file named:

   ```text
   reusable-node-quality.yml
   ```

1. Within that file, let's start by defining the workflow name, event trigger and permissions:

   ```yaml
   name: Reusable Node Quality
   run-name: Node {% raw %}${{ inputs.node-version }}{% endraw %} Quality Checks

   on:
     workflow_call:
       inputs:
         node-version:
           description: "Node.js version"
           required: false
           default: "20"
           type: string

   permissions:
     contents: read
   ```

   This workflow can be called from other workflows in the same repository or even from different repositories with no other permissions than read-only access to the repository contents.

1. Now we will add three separate jobs to the workflow: `lint`, `tests` and `e2e`.

   These are the jobs that you found yourself copy-pasting across repositories the most, so it makes sense to centralize them in a reusable workflow.

   Take a moment to understand and add the following content to the `reusable-node-quality.yml` file:

   ```yaml
   jobs:
     lint:
       name: Lint
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v6
         - uses: actions/setup-node@v6
           with:
             node-version: {% raw %}${{ inputs.node-version }}{% endraw %}
             cache: npm
         - run: npm ci
         - run: npm run lint

     tests:
       name: Tests with Coverage
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v6
         - uses: actions/setup-node@v6
           with:
             node-version: {% raw %}${{ inputs.node-version }}{% endraw %}
             cache: npm
         - run: npm ci
         - run: npm run test:coverage

     e2e:
       name: E2E Tests with Playwright
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v6
         - uses: actions/setup-node@v6
           with:
             node-version: {% raw %}${{ inputs.node-version }}{% endraw %}
             cache: npm
         - run: npm ci
         - run: npx playwright install --with-deps chromium
         - run: npm run test:e2e
   ```

   Each job checks out the repository code, sets up Node.js using the version specified in the workflow input, installs dependencies, and runs the appropriate npm script (`lint`, `test:coverage`, and `test:e2e` respectively).


1. Commit and push the `.github/workflows/reusable-node-quality.yml` file changes to the `reusable-workflows` branch.

   ```bash
   git add .github/workflows/reusable-node-quality.yml
   git commit -m "feat: create reusable node quality workflow"
   git push origin reusable-workflows
   ```

1. As you push your changes Mona will check your work and prepare the next step in this exercise!

<details>
<summary>Having trouble? 🤷</summary><br/>

- Make sure the file path is exactly `.github/workflows/reusable-node-quality.yml`.
- Check YAML indentation. You can run the following command in your terminal to validate the syntax of your workflow files:

    ```bash
    actionlint .github/workflows/reusable-node-quality.yml
    ```

</details>
