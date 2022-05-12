export interface IGitHubLabel {
    color: string;
    default: boolean;
    description: string;
    id: number;
    name: string;
    node_id: string;
    url: string;
}

export interface IGitHubPullRequest {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: IGitHubUser,
    body: string;
    labels: IGitHubLabel[];
    milestone: any;
    active_lock_reason: string;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    merged_at: Date;
    merge_commit_sha: string;
    assignee: IGitHubUser;
    assignees: IGitHubUser[];
    requested_reviewers: IGitHubUser[];
    requested_teams: IGitHubTeam[];
    head: any;
    base: any;
    _links: any;
    author_association: string;
    auto_merge: any;
    draft: boolean;
}

export interface IGitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface IGitHubTeam {
    id: number;
    node_id: string;
    url: string;
    html_url: string;
    name: string;
    slug: string;
    description: string;
    privacy: string;
    permission: string;
    members_url: string;
    repositories_url: string;
    parent: string;
}
