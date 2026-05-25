# Upload To GitHub

```bash
git init
git add .
git commit -m "feat: bootstrap agentic saas os"
gh repo create my-agentic-saas-os --public --source . --remote origin --push
```

If GitHub CLI is not logged in:

```bash
gh auth login
```

Or create a public repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_NAME/YOUR_REPO.git
git push -u origin main
```
