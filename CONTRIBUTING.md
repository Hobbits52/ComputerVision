# Contributing


### Fork, Clone, and Add Upstream Remote:

- Fork this [repository](https://github.com/Hobbits52/ComputerVision).
- Clone your fork down to your local machine:

  ```
  git remote add upstream https://github.com/YOUR-GIT-  USERNAME/ComputerVision.git
  ```

- Add the repository as an upstream remote:

  ```
  git remote add upstream   https://github.com/Hobbits52/ComputerVision.git
  ```

### Getting Started:

Cut a namespaced feature branch from master:

- bug/...
- feat/...
- test/...
- doc/...
- refactor/...

To cut a new branch:

  ```
  git checkout -b `your-branch-name`
  ```

### Making Commits:

Make changes and commits *on your branch*, and make sure that you only make changes that are *relevant to this branch*. (If you find yourself making unrelated changes, simply cut a new branch for those changes!)

Prefix each commit like so:

  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...

#### Commit Message Guidelines:

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a *brief summary* of what the
  commit changes. (70 Characters Max)
- To provide a deeper explanation, leave a blank line beneath your message.  Then 
  include a more detailed description on the following line.

#### Test Driven Development:

You wrote tests, right?  No pull requests will go through without passing tests!


### Rebase Upstream Changes Into Your Branch:

Finished making changes? Begin the process of merging your code into the 
organization's repository by rebasing any changes that may have been made
by other contributors since you started working first. 

Switch to your master branch and grab the latest updates from upstream:

```bash
git checkout master
git pull --rebase upstream master
```

Go back to your branch and rebase those changes to your branch:

```bash
git checkout `your-branch-name`
git rebase master
```

Provided there are no conflicts, this will roll all of your changes back
on top of any from the upstream. The result: A nice, clean, linear commit
history.

**If there are conflicting changes**, git will pause the rebase process and
prompt you to resolve them.

To get a better picture of what conflicts you need to fix, use:

```bash
git status
```
<!-- Update this section to remove any plaigarism.  Replace pictures with your own. -->
You should see something like this:
<img width="689" alt="rebase_conflict_ex" src="https://cloud.githubusercontent.com/assets/19274618/22439788/d9a80a0a-e6e5-11e6-822d-a2d1203f00e4.png">

In this example, it's saying there's a conflict in the package.json file. If you navigate to that file in your editor, you'll see something like this:
<img width="716" alt="rebase_conflict_ex2" src="https://cloud.githubusercontent.com/assets/19274618/22439795/df2d93e6-e6e5-11e6-8ecc-3cb5c22d0808.png">

In this particular example, Maurice had added the dependencies mysql and sequelize while I had added request. To resolve this issue, simply delete the text that git inserted (the red highlighted text), and format the package.json to include all 3 (mysql, sequelize, and request):
<img width="630" alt="rebase_conflict_ex3" src="https://cloud.githubusercontent.com/assets/19274618/22439797/e2289c62-e6e5-11e6-901e-f5a48c2d626d.png">

After each resolution, `git add` the file.  (You **do not** make commits 
during a rebase.)

When there are no remaining conflicts, continue rebasing with the command:

```bash
git rebase --continue
```

Wash, rinse, and repeat until there are no remaining conflicts and the rebase
process is complete.

<!-- If rebasing broke anything, fix it, then repeat the above process until
what's broken is fixed and all tests pass. -->

### Merge Your Branch with Your Master:

Go back to master and merge your branch with your master as follows:

```bash
git checkout master
git merge --ff-only `your-branch-name`
```

Before pushing to your repo, check to see if your master branch has a linear
commit history that is the same linear history of the upstream master, *plus*
the additional commits you have with:

```bash
git hist
```

Note: If you don't have the `git hist` alias, open your .gitconfig file and
add the following alias:
```bash
[alias]
  hist = log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
```

### Push Your Work to Your Fork's Origin/Master

Push to your fork's origin/master by using :

```bash
git push origin master
```

It is likely that you will run into difficulty here (i.e. 'Your local master has 
diverged from origin/master').  This can be easily avoided by adding a force flag
as so:

```bash
git push origin master -f
```

### Make a pull request:

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is, the faster your changes can
be incorporated into this repository!.

At least one other person **MUST** give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

If all changes are good to go, instead of doing the default merge, select the
drop down arrow next to the button and select the "Rebase and merge" option:
<img width="630" alt="rebase_and_merge" src="https://cloud.githubusercontent.com/assets/19274618/22439832/fc13f054-e6e5-11e6-8a5b-deb179ce2fde.png">

Thanks for contributing!

<!-- End of update-requiring region. -->