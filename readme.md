# GitHub Repository Tree Viewer

A simple web tool to visualize and copy GitHub repository folder structures in ASCII format. I created this tool because I forgot the website I previously used for this purpose and couldn't find it in my browser history. Built with some help from AI assistants.

## 🌟 Live Demo

You can try it out here: [GitHub Tree Viewer](https://iamabdo.github.io/githubTree)

## 🎯 What it does

This tool allows you to:
1. Input any public GitHub repository URL
2. View its folder structure in a clean ASCII tree format
3. Copy the structure to your clipboard with one click

Example output:
```
my-app/
├─ src/
│  ├─ components/
│  │  ├─ Header.js
│  │  └─ Footer.js
│  ├─ styles/
│  │  └─ main.css
│  └─ index.js
└─ package.json
```

## 🛠️ How it works

The application is built using pure web technologies:
- HTML for structure
- CSS for styling (with dark mode support)
- Vanilla JavaScript for functionality
- GitHub API for fetching repository data

When you enter a repository URL, the tool:
1. Extracts the owner and repository name
2. Fetches the repository structure using GitHub's API
3. Converts the data into a beautiful ASCII tree format
4. Displays the result with a copy button for easy sharing

## 💻 Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- GitHub REST API
- Font Awesome for icons

## 🤖 Credits

Created by iamabdo with assistance from AI (to make the process faster).
