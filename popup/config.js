window.addEventListener ("load", addListener, false);

function addListener() {
    document.getElementById('github-token-button').addEventListener('click', () => {
        const gitHubTokenValue = document.getElementById('github-token-input').value;
        console.log(gitHubTokenValue);
        chrome.storage.sync.set({ github_token: gitHubTokenValue });
    });
}

