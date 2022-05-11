const baseGitHubUrl = `https://api.github.com/repos/asiainspection/qima-platform`;
const availableColor = 'style="--label-r:166;--label-g:252;--label-b:189;--label-h:136;--label-s:93;--label-l:81; cursor: pointer"';
const unavailableColor = 'style="--label-r:188;--label-g:33;--label-b:5;--label-h:9;--label-s:94;--label-l:37;"';
const qimaSandboxesRefreshButtonId = 'qima-sandboxes-refresh-button';
const qimaSandboxesWrapperId = 'qima-sandboxes';
const qimaMainWrapperId = 'qima-github';
const qimaSandboxAvailableClassName = 'qima-deploy-available';
const refreshStatusButton = `
    <button class="float-right d-block text-center mr-2 btn-link muted-icon" id="${qimaSandboxesRefreshButtonId}">
        <span class="reviewers-status-icon tooltipped tooltipped-nw" aria-label="Refresh sandboxes status">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-sync">
                <path fill-rule="evenodd" d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"></path>
            </svg>
        </span>
    </button>`;
const sandboxesWrapper = `<div class="discussion-sidebar-heading text-bold">Sandboxes availability ${refreshStatusButton}</div><div class="d-flex flex-wrap" id="${qimaSandboxesWrapperId}"></div>`;
let lastUrl;
let requestHeaders;

const injectSandboxesStatus = async function() {
    const labels = await fetch(`${baseGitHubUrl}/labels`, { headers: requestHeaders }).then(result => result.json());
    console.log(labels);
    const sandboxesLabels = labels.filter(label => label.name.indexOf('deploy-to-') !== -1);
    const pullRequests = await fetch(`${baseGitHubUrl}/pulls`, { headers: requestHeaders }).then(result => result.json());
    const pullRequestsWithSandboxes = pullRequests.filter(pr => pr.labels.some(label => label.name.indexOf('deploy-to-') !== -1));

    document.getElementById(qimaSandboxesWrapperId).innerHTML = sandboxesLabels.map(label => {
        let pullRequestUsingLabel = pullRequestsWithSandboxes.find(pr => pr.labels.some(prLabel => prLabel.name.indexOf(label.name) !== -1));

        return `<a id="${label.name}" class="IssueLabel hx_IssueLabel width-fit mb-1 mr-1 ${!pullRequestUsingLabel ? qimaSandboxAvailableClassName : ''}" ${pullRequestUsingLabel ? unavailableColor : availableColor}>${label.name.split('deploy-to-')[1]}</a>`;
    }).join('');

    addListeners();
}

const addListeners = function() {
    document.getElementById(qimaSandboxesRefreshButtonId).addEventListener('click', () => injectSandboxesStatus());
    Array.from(document.getElementsByClassName(qimaSandboxAvailableClassName)).forEach((element) => {
        element.addEventListener('click', () => addLabelToPullRequest(element.id, document.URL.split('/').pop()));
    });
}

const addLabelToPullRequest = async function(label, pullRequestId) {
    await fetch(`${baseGitHubUrl}/issues/${pullRequestId}/labels`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({ labels : [label] })
    });
}

const injectSandboxesWrapper = function() {
    if (!document.getElementById(qimaMainWrapperId)) {
        const labelsElement = document.getElementsByClassName('discussion-sidebar-item')[2];
        const sandboxesWrapperElement = document.createElement('div');
        sandboxesWrapperElement.id = qimaMainWrapperId;
        sandboxesWrapperElement.className = 'discussion-sidebar-item';
        sandboxesWrapperElement.innerHTML = sandboxesWrapper;
        labelsElement.parentNode.insertBefore(sandboxesWrapperElement, labelsElement.nextSibling);
    }
}

const loadQimaSandboxesHelper = async function() {
    try {
        injectSandboxesWrapper();

        await chrome.storage.sync.get("github_token", (items) => {
            requestHeaders = { Authorization: `Bearer ${items.github_token}` };
        });

        await injectSandboxesStatus();
    } catch (error) {
        console.log(error);
    }
};

loadQimaSandboxesHelper();

new MutationObserver(() => {
    if (location.href.indexOf('https://github.com/asiainspection/qima-platform/pull/') !== -1) {
        if (lastUrl !== location.href) {
            lastUrl = location.href;
            setTimeout(() => loadQimaSandboxesHelper(), 2000);
        }
    } else {
        lastUrl = null;
    }
}).observe(document, {subtree: true, childList: true});
