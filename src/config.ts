window.addEventListener ("load", initConfigModal, false);

function initConfigModal(): void {
    initTokenInputValue();
    addListener();
}

function initTokenInputValue(): void {
    chrome.storage.sync.get('github_token', (items) => {
        (<HTMLInputElement>document.getElementById('github-token-input'))!.value = items.github_token;
    });
}

function addListener() {
    document.getElementById('github-token-button')?.addEventListener('click', () => {
        const gitHubTokenValue = (<HTMLInputElement>document.getElementById('github-token-input'))?.value;
        void chrome.storage.sync.set({ github_token: gitHubTokenValue });
    });
}

