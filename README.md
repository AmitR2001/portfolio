# Personal Portfolio (Static GitHub Pages Site)

This is a static personal portfolio website built with HTML, CSS, and JavaScript so it can be hosted directly on GitHub Pages.

## Folder Structure

```text
portfolio/
|
|-- index.html
|-- style.css
|-- script.js
|
|-- assets/
|   |-- images/
|   |   |-- profile.jpg
|   |   |-- background.jpg
|   |
|   |-- icons/
|       |-- favicon.svg
|
|-- sections/
|   |-- about.html
|   |-- projects.html
|   |-- experience.html
|   |-- contact.html
|
|-- README.md
```

## How To Replace Placeholder Images

The website expects these image paths:

- `assets/images/profile.jpg`
- `assets/images/background.jpg`

Steps:

1. Add your profile photo as `assets/images/profile.jpg`.
2. Add a clean background image as `assets/images/background.jpg`.
3. Keep image sizes optimized for speed:
   - profile image: roughly 400x400 or 600x600
   - background image: around 1600px wide
4. Prefer compressed JPG/WebP sources before exporting to JPG for quick page load.

## GitHub API Integration (Projects Section)

Projects are loaded dynamically in `script.js` using the GitHub REST API:

```js
https://api.github.com/users/<username>/repos?per_page=100&sort=updated
```

### Configure for your account

1. Open `script.js`.
2. Update:

```js
const GITHUB_USERNAME = "AmitR2001";
```

3. Optional: edit `prioritizedRepos` to control which repositories appear first.
4. Optional: edit `projectDetails` to refine project title, short description, and use case text.

### Notes

- This portfolio uses public repositories only.
- If the API rate limit is reached, the page shows a friendly fallback message.

## GitHub Pages Deployment (Free Hosting)

This repository is configured to deploy with GitHub Actions.

1. Commit and push changes to the `main` branch.
2. In GitHub: `Settings` -> `Pages`.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Wait for the `Deploy to GitHub Pages` workflow to finish.
5. Access your live site at:
   - `https://<username>.github.io/<repo>/`

## Local Preview

You can open `index.html` directly in a browser, or run a simple local server for cleaner API testing.

Example with VS Code Live Server extension or any static server.

## Performance and Maintenance Notes

- No heavy framework is used.
- Keep images compressed to maintain fast loading.
- Update resume content in `index.html` and the `sections` pages as needed.
- Keep `script.js` project metadata aligned with your latest repositories.
