import { GithubService } from './github.service';
import { IGitHubLabel, IGitHubPullRequest } from './github.models';
import {
    AVAILABLE_COLOR,
    AVAILABLE_SANDBOX_CLASSNAME, ERROR_MESSAGE_HTML,
    MAIN_WRAPPER_ID, REFRESH_BUTTON_ID,
    SANDBOXES_WRAPPER_HTML, SANDBOXES_WRAPPER_ID, UNAVAILABLE_COLOR
} from './background-helper.models';

class BackgroundHelper {
    private readonly _gitHubService: GithubService = new GithubService();
    private _currentPullRequestId: string = '';

    public constructor() {
        this._initMutationObserver();
    }

    private _injectSandboxesWrapper(): void {
        if (!document.getElementById(MAIN_WRAPPER_ID)) {
            const labelsElement = document.getElementsByClassName('discussion-sidebar-item')[2];
            const sandboxesWrapperElement = document.createElement('div');
            sandboxesWrapperElement.id = MAIN_WRAPPER_ID;
            sandboxesWrapperElement.className = 'discussion-sidebar-item';
            sandboxesWrapperElement.innerHTML = SANDBOXES_WRAPPER_HTML;
            labelsElement.parentNode?.insertBefore(sandboxesWrapperElement, labelsElement.nextSibling);
        }
    }

    /**
     * @description
     * Will retrieve labels & PRs from GitHub, and inject the HTML with each sandbox name and the conditional style depending if the sandbox is available or not.
     * Once the HTML is injected, it will trigger the listener event
     */
    private async _injectSandboxesStatus(): Promise<void> {
        try {
            const deployToPrefix: string = 'deploy-to-';
            const labels: IGitHubLabel[] = await this._gitHubService.getLabels();

            if (labels) {
                const sandboxesLabels: IGitHubLabel[] = labels?.filter((label: IGitHubLabel): boolean => label.name.indexOf(deployToPrefix) !== -1);
                const pullRequests: IGitHubPullRequest[] = await this._gitHubService.getPullRequests();
                const pullRequestsWithSandboxes: IGitHubPullRequest[] = pullRequests?.filter((pr: any): boolean => pr.labels.some((label: any): boolean => label.name.indexOf(deployToPrefix) !== -1));
                const sandboxesLabelsHtml: string = sandboxesLabels.map((label: any): string => {
                    let pullRequestUsingLabel = pullRequestsWithSandboxes.find((pr: any): boolean => pr.labels.some((prLabel: any): boolean => prLabel.name.indexOf(label.name) !== -1));

                    return `<a id="${label.name}" class="IssueLabel hx_IssueLabel width-fit mb-1 mr-1 ${!pullRequestUsingLabel ? AVAILABLE_SANDBOX_CLASSNAME : ''}" ${pullRequestUsingLabel ? UNAVAILABLE_COLOR : AVAILABLE_COLOR}>${label.name.split(deployToPrefix)[1]}</a>`;
                }).join('');

                document.getElementById(SANDBOXES_WRAPPER_ID)!.innerHTML = sandboxesLabelsHtml;

                this._initListeners();
            } else {
                this._injectErrorMessage();
            }
        } catch (error: unknown) {
            this._injectErrorMessage();
        }
    }

    private _injectErrorMessage(): void {
        document.getElementById(SANDBOXES_WRAPPER_ID)!.innerHTML = ERROR_MESSAGE_HTML;
    }

    private _loadHelper(): void {
        this._injectSandboxesWrapper();
        void this._injectSandboxesStatus();
    }

    /**
     * @description
     * Initialize the click events listeners for the refresh button and available sandboxes
     **/
    private _initListeners(): void {
        document.getElementById(REFRESH_BUTTON_ID)?.addEventListener('click', () => this._injectSandboxesStatus());
        Array.from(document.getElementsByClassName(AVAILABLE_SANDBOX_CLASSNAME)).forEach((availableSandbox: Element) => {
            availableSandbox.addEventListener('click', () => this._gitHubService.addLabelToPullRequest(availableSandbox.id, this._currentPullRequestId));
        });
    }

    /**
     * @description
     * The background watcher to check the page navigations. If the user loads a PR details page, we load the helper
     */
    private _initMutationObserver(): void {
        new MutationObserver(() => {
            if (location.href.indexOf('https://github.com/asiainspection/qima-platform/pull/') !== -1) {
                const pullRequestId = document.URL.split('/').pop() ?? '';
                if (this._currentPullRequestId !== pullRequestId) {
                    this._currentPullRequestId = pullRequestId;

                    // Could not find a better way to know when GitHub has finished updating the views :(
                    // If it is triggered too quickly, we won't be able to inject the HTML into the page.
                    setTimeout((): void => {
                        this._loadHelper();
                    }, 2000);
                }
            } else {
                this._currentPullRequestId = '';
            }
        }).observe(document, {subtree: true, childList: true});
    }
}

new BackgroundHelper();
