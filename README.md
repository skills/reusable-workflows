# Create and use reusable workflows

_Learn how to create reusable GitHub Actions workflows and call them from another workflow._

## Welcome

- **Who is this for**: Developers and maintainers who want to reduce duplication in GitHub Actions pipelines.
- **What you'll learn**: How to define and call reusable workflows, and how permissions flow across caller and nested reusable workflows.
- **What you'll build**: A CI setup that runs reusable quality checks, deploys to GitHub Pages, and comments deployment details on pull requests.
- **Prerequisites**:
  - Basic familiarity with GitHub Actions workflows
  - A GitHub account with permission to create repositories from templates

- **How long**: This exercise takes less than 30 minutes to complete.

In this exercise, you will:

1. Create a reusable workflow using `workflow_call`.
1. Call that reusable workflow from a CI workflow.
1. Add permissions-aware deployment and PR feedback jobs.

### How to start this exercise

Simply copy the exercise to your account, then give your favorite Octocat (Mona) **about 20 seconds** to prepare the first lesson, then **refresh the page**.

[![](https://img.shields.io/badge/Copy%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=FidelusAleksander&template_name=reusable-workflows&owner=%40me&name=skills-reusable-workflows&description=Exercise:+Reusable+Workflows&visibility=public)

<details>
<summary>Having trouble? 🤷</summary><br/>

When copying the exercise, we recommend the following settings:

- For owner, choose your personal account or an organization to host the repository.

- We recommend creating a public repository, since private repositories will use Actions minutes.

If the exercise isn't ready in 20 seconds, please check the [Actions](../../actions) tab.

- Check to see if a job is running. Sometimes it simply takes a bit longer.

- If the page shows a failed job, please submit an issue. Nice, you found a bug! 🐛

</details>

---

&copy; 2026 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)
