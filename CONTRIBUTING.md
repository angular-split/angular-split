# Contributing to angular-split

We would love for you to contribute to angular-split and help make it even better
than it is today! As a contributor, here are the guidelines we would like you
to follow:

- [Contributing to angular-split](#contributing-to-angular-split)
  - [ Setting up your Environment](#-setting-up-your-environment)
  - [ Code of Conduct](#-code-of-conduct)
  - [ Got a Question or Problem?](#-got-a-question-or-problem)
  - [ Found an Issue?](#-found-an-issue)
  - [ Want a Feature?](#-want-a-feature)
  - [ Submission Guidelines](#-submission-guidelines)
    - [ Submitting an Issue](#-submitting-an-issue)
    - [ Submitting a Pull Request (PR)](#-submitting-a-pull-request-pr)
      - [After your pull request is merged](#after-your-pull-request-is-merged)
  - [ Coding Rules](#-coding-rules)
  - [ Commit Message Guidelines](#-commit-message-guidelines)
    - [Commit Message Format](#commit-message-format)
    - [Revert](#revert)
    - [Type](#type)
    - [Scope](#scope)
  - [TODO](#todo)
    - [Subject](#subject)
    - [Body](#body)
    - [Footer](#footer)

## <a name="setup"></a> Setting up your Environment

To set up your environment to work on angular-split, follow these steps:

1. **Fork the repository** on GitHub to your own account.
2. **Clone the repository** to your local machine
3. **Install the dependencies**: `npm install`

   > Note: If you are using a version of Node.js that is not supported by angular-split, you might need to use `nvm` (Node Version Manager) to switch to a compatible version. The recommended version is Node.js 22.x LTS or later.

4. **build and run the project by**: `npm run start --watch`

For windows users, we expect you to use the WSL, as we set up the project to work with github actions. Make sure to check out the project and run the commands in the WSL terminal.
It might work outside the WSL when you delete the `package-lock.json` file, but we cannot guarantee that it will work. (also, make sure you don't commit that `package-lock.json`, as it will break the build for other users).

## <a name="coc"></a> Code of Conduct

angular-split follows the same Code of Conduct as Angular. You can read it [here](https://github.com/angular/code-of-conduct/blob/master/CODE_OF_CONDUCT.md).

## <a name="question"></a> Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [Stack Overflow](https://stackoverflow.com/questions/tagged/angular-split) where the questions should be tagged with tag `angular-split`.

Stack Overflow is a much better place to ask questions since:

- there are thousands of people willing to help on Stack Overflow
- questions and answers stay available for public viewing so your question / answer might help someone else
- Stack Overflow's voting system assures that the best answers are prominently visible.

To save your and our time, we will systematically close all issues that are requests for general support and redirect people to Stack Overflow.

## <a name="issue"></a> Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository][github]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Want a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our [GitHub
Repository][github]. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a minimal reproduction scenario. Having a reproducible scenario gives us wealth of important information without going back & forth to you with additional questions like:

- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]
- and most importantly - a use-case that fails

A minimal reproduce scenario using allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal repository. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

Unfortunately we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/angular-split/angular-split/issues/new).

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

- Search [GitHub](https://github.com/angular-split/angular-split/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
- Make your changes in a new git branch:

  ```shell
  git checkout -b my-fix-branch main
  ```

- Create your patch, **including appropriate test cases**.
- Follow our [Coding Rules](#rules).
- Run the full test suite, as described in the [developer documentation][dev-doc],
  and ensure that all tests pass (if applicable).
- Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit). Adherence to these conventions
  is necessary because release notes are automatically generated from these messages.

  ```shell
  git commit -a
  ```

  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

- Push your branch to GitHub:

  ```shell
  git push origin my-fix-branch
  ```

- In GitHub, send a pull request to `angular-split:main`.
- If we suggest changes then:

  - Make the required updates.
  - Re-run the test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase main -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the main branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your main with the latest upstream version:

  ```shell
  git pull --ff upstream main
  ```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests or e2e-tests).
- All public API methods **must be documented**.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the angular-split change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the module affected as perceived by the person reading changelog generated from the commit messages.

The following is the list of supported scopes (there might be more added in the fututre):

## TODO

There are currently a few exceptions to the "use package name" rule:

- **packaging**: used for changes that change the npm package layout in all of our packages, e.g. public path changes, package.json changes done to all packages, d.ts file/format changes, changes to bundles, etc.
- **changelog**: used for updating the release notes in CHANGELOG.md
- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all packages (e.g. `style: add missing semicolons`)

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

[coc]: https://github.com/angular/code-of-conduct/blob/master/CODE_OF_CONDUCT.md
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[dev-doc]: https://github.com/angular/angular-cli#development-hints-for-working-on-angular-cli
[github]: https://github.com/angular-split/angular-split
[stackoverflow]: http://stackoverflow.com/questions/tagged/angular-split
