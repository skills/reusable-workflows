<header>

<!--
  <<< Author notes: Course header >>>
  Read <https://skills.github.com/quickstart> for more information about how to build courses using this template.
  Include a 1280×640 image, course name in sentence case, and a concise description in emphasis.
  In your repository settings: enable template repository, add your 1280×640 social image, auto delete head branches.
  Next to "About", add description & tags; disable releases, packages, & environments.
  Add your open source license, GitHub uses MIT license.
-->

# Reusable workflows and matrix strategies

_Make a workflow reusable, call it in another workflow, and use a matrix strategy to run multiple versions._

</header>

<!--
  <<< Author notes: Course start >>>
  Include start button, a note about Actions minutes,
  and tell the learner why they should take the course.
-->

## Welcome

Reusable workflows offer a simple and powerful way to avoid copying and pasting workflows across your repositories, and adding a matrix strategy lets you use variables in a single job definition to automatically create multiple job runs.

- **Who is this for**: Developers, DevOps engineers, students, managers, teams, GitHub users.
- **What you'll learn**: How to create and use reusable workflows, create a matrix strategy, trigger workflows, and find workflow logs.
- **What you'll build**: An Actions workflow with a matrix strategy that calls a reusable workflow to output multiple versions of node.
- **Prerequisites**: In this course you will work with pull requests and YAML workflow files. We recommend you take the [Introduction to GitHub](https://github.com/skills/introduction-to-github) course first or be familiar with GitHub basics, and the [Hello GitHub Actions](https://github.com/skills/hello-github-actions) course for an introduction to GitHub Actions and workflow files.
- **How long**: This course can be finished in less than one hour.
- **Attribution**: This Skills course was inspired by a [demo video](https://www.youtube.com/watch?v=MBpyouQtY_M) created by Mickey Gousset ([@mickeygousset](https://github.com/mickeygousset)).

In this course, you will:

1. Make a reusable workflow
2. Add a job
3. Add a matrix strategy
4. Merge your pull request
5. Trigger the workflow

### How to start this course

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

<footer>

<!--
  <<< Author notes: Footer >>>
  Add a link to get support, GitHub status page, code of conduct, license link.
-->

---

Get help: [Post in our discussion board](https://github.com/orgs/skills/discussions/categories/reusable-workflows) &bull; [Review the GitHub status page](https://www.githubstatus.com/)

&copy; 2023 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

</footer>
