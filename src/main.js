async function getStructure() {
  const urlInput = document.getElementById("repo-url").value;
  const structureDiv = document.getElementById("structure");
  const structureContainer = document.querySelector(".structure-container");

  try {
    // Extract owner and repo from URL
    const match = urlInput.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub URL");
    }

    const [, owner, repo] = match;
    const structure = await fetchRepoStructure(owner, repo);
    structureDiv.textContent = structure;
    structureContainer.style.display = "block";
  } catch (error) {
    structureDiv.textContent = `Error: ${error.message}`;
    structureContainer.style.display = "block";
  }
}

async function fetchRepoStructure(owner, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch repository data");
  }

  const data = await response.json();
  return createAsciiTree(data.tree);
}

function createAsciiTree(items) {
  const tree = {};

  // Build tree structure
  items.forEach((item) => {
    const parts = item.path.split("/");
    let current = tree;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = null;
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });

  // Convert to ASCII
  function buildAscii(obj, prefix = "", isLast = true) {
    const entries = Object.entries(obj || {});
    let result = "";

    entries.forEach(([key, value], index) => {
      const isLastItem = index === entries.length - 1;
      const connector = isLastItem ? "└─ " : "├─ ";
      const newPrefix = prefix + (isLast ? "   " : "│  ");

      result += prefix + connector + key + "\n";
      if (value !== null) {
        result += buildAscii(value, newPrefix, isLastItem);
      }
    });

    return result;
  }

  return buildAscii(tree);
}

function copyStructure() {
  const structureText = document.getElementById("structure").textContent;
  navigator.clipboard
    .writeText(structureText)
    .then(() => {
      const copyBtn = document.querySelector(".copy-btn i");
      copyBtn.className = "fas fa-check";
      setTimeout(() => {
        copyBtn.className = "fas fa-copy";
      }, 2000);
    })
    .catch((err) => alert("Failed to copy: " + err));
}
