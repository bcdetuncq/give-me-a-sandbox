import {IGitHubLabel, IGitHubPullRequest} from "./github.models";

export class GithubService {
    private readonly _baseGitHubUrl: string = `https://api.github.com/repos/asiainspection/qima-platform`;
    private _requestHeaders: HeadersInit = {};

    public constructor() {
        this._loadGitHubToken();
    }

    private _loadGitHubToken() {
        chrome.storage.sync.get('github_token', (items) => {
            this._requestHeaders = { Authorization: `Bearer ${items.github_token}` };
        });
    }

    public getLabels(): Promise<IGitHubLabel[]> {
        return fetch(`${this._baseGitHubUrl}/labels`, { headers: this._requestHeaders }).then(result => result.json());
    }

    public getPullRequests(): Promise<IGitHubPullRequest[]> {
        return fetch(`${this._baseGitHubUrl}/pulls`, { headers: this._requestHeaders }).then(result => result.json());
    }

    public addLabelToPullRequest(label: string, pullRequestId: string): Promise<Response> {
        return fetch(`${this._baseGitHubUrl}/issues/${pullRequestId}/labels`, {
            method: 'POST',
            headers: this._requestHeaders,
            body: JSON.stringify({ labels: [label] })
        });
    }
}
