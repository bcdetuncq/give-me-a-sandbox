export const AVAILABLE_COLOR: string = 'style="--label-r:166;--label-g:252;--label-b:189;--label-h:136;--label-s:93;--label-l:81; cursor: pointer"';
export const UNAVAILABLE_COLOR: string = 'style="--label-r:188;--label-g:33;--label-b:5;--label-h:9;--label-s:94;--label-l:37;"';
export const REFRESH_BUTTON_ID: string = 'qima-sandboxes-refresh-button';
export const MAIN_WRAPPER_ID: string = 'qima-github';
export const AVAILABLE_SANDBOX_CLASSNAME: string = 'qima-deploy-available';
export const ERROR_MESSAGE_HTML: string = '<span style="color: red">Please make sure your GitHub token is configured properly in the Extension option and valid.</span>';
export const SANDBOXES_WRAPPER_ID: string = 'qima-sandboxes';
export const SANDBOXES_WRAPPER_HTML: string = `
    <div class="discussion-sidebar-heading text-bold">
        Sandboxes availability
        <button class="float-right d-block text-center mr-2 btn-link muted-icon" id="${REFRESH_BUTTON_ID}">
            <span class="reviewers-status-icon tooltipped tooltipped-nw" aria-label="Refresh sandboxes status">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-sync">
                    <path fill-rule="evenodd" d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"></path>
                </svg>
            </span>
        </button>
    </div>
    <div class="d-flex flex-wrap" id="${SANDBOXES_WRAPPER_ID}"></div>`;
