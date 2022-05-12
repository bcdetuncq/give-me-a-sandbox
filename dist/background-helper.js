(()=>{"use strict";var e={375:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SANDBOXES_WRAPPER_HTML=t.SANDBOXES_WRAPPER_ID=t.AVAILABLE_SANDBOX_CLASSNAME=t.MAIN_WRAPPER_ID=t.REFRESH_BUTTON_ID=t.UNAVAILABLE_COLOR=t.AVAILABLE_COLOR=void 0,t.AVAILABLE_COLOR='style="--label-r:166;--label-g:252;--label-b:189;--label-h:136;--label-s:93;--label-l:81; cursor: pointer"',t.UNAVAILABLE_COLOR='style="--label-r:188;--label-g:33;--label-b:5;--label-h:9;--label-s:94;--label-l:37;"',t.REFRESH_BUTTON_ID="qima-sandboxes-refresh-button",t.MAIN_WRAPPER_ID="qima-github",t.AVAILABLE_SANDBOX_CLASSNAME="qima-deploy-available",t.SANDBOXES_WRAPPER_ID="qima-sandboxes",t.SANDBOXES_WRAPPER_HTML=`\n    <div class="discussion-sidebar-heading text-bold">\n        Sandboxes availability\n        <button class="float-right d-block text-center mr-2 btn-link muted-icon" id="${t.REFRESH_BUTTON_ID}">\n            <span class="reviewers-status-icon tooltipped tooltipped-nw" aria-label="Refresh sandboxes status">\n                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-sync">\n                    <path fill-rule="evenodd" d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"></path>\n                </svg>\n            </span>\n        </button>\n    </div>\n    <div class="d-flex flex-wrap" id="${t.SANDBOXES_WRAPPER_ID}"></div>`},769:function(e,t,s){var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(n,a){function l(e){try{o(i.next(e))}catch(e){a(e)}}function r(e){try{o(i.throw(e))}catch(e){a(e)}}function o(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(l,r)}o((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const n=s(456),a=s(375);new class{constructor(){this._gitHubService=new n.GithubService,this._currentPullRequestId="",this._initMutationObserver(),this._loadHelper()}_injectSandboxesWrapper(){var e;if(!document.getElementById(a.MAIN_WRAPPER_ID)){const t=document.getElementsByClassName("discussion-sidebar-item")[2],s=document.createElement("div");s.id=a.MAIN_WRAPPER_ID,s.className="discussion-sidebar-item",s.innerHTML=a.SANDBOXES_WRAPPER_HTML,null===(e=t.parentNode)||void 0===e||e.insertBefore(s,t.nextSibling)}}_injectSandboxesStatus(){return i(this,void 0,void 0,(function*(){const e="deploy-to-",t=(yield this._gitHubService.getLabels()).filter((t=>-1!==t.name.indexOf(e))),s=(yield this._gitHubService.getPullRequests()).filter((t=>t.labels.some((t=>-1!==t.name.indexOf(e))))),i=t.map((t=>{let i=s.find((e=>e.labels.some((e=>-1!==e.name.indexOf(t.name)))));return`<a id="${t.name}" class="IssueLabel hx_IssueLabel width-fit mb-1 mr-1 ${i?"":a.AVAILABLE_SANDBOX_CLASSNAME}" ${i?a.UNAVAILABLE_COLOR:a.AVAILABLE_COLOR}>${t.name.split(e)[1]}</a>`})).join("");document.getElementById(a.SANDBOXES_WRAPPER_ID).innerHTML=i,this._initListeners()}))}_loadHelper(){try{this._injectSandboxesWrapper(),this._injectSandboxesStatus()}catch(e){console.error(e)}}_initListeners(){var e;null===(e=document.getElementById(a.REFRESH_BUTTON_ID))||void 0===e||e.addEventListener("click",(()=>this._injectSandboxesStatus())),Array.from(document.getElementsByClassName(a.AVAILABLE_SANDBOX_CLASSNAME)).forEach((e=>{e.addEventListener("click",(()=>this._gitHubService.addLabelToPullRequest(e.id,this._currentPullRequestId)))}))}_initMutationObserver(){new MutationObserver((()=>{var e;if(-1!==location.href.indexOf("https://github.com/asiainspection/qima-platform/pull/")){const t=null!==(e=document.URL.split("/").pop())&&void 0!==e?e:"";this._currentPullRequestId!==t&&(this._currentPullRequestId=t,setTimeout((()=>this._loadHelper()),2e3))}else this._currentPullRequestId=""})).observe(document,{subtree:!0,childList:!0})}}},456:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GithubService=void 0,t.GithubService=class{constructor(){this._baseGitHubUrl="https://api.github.com/repos/asiainspection/qima-platform",this._requestHeaders={},this._loadGitHubToken()}_loadGitHubToken(){chrome.storage.sync.get("github_token",(e=>{this._requestHeaders={Authorization:`Bearer ${e.github_token}`}}))}getLabels(){return fetch(`${this._baseGitHubUrl}/labels`,{headers:this._requestHeaders}).then((e=>e.json()))}getPullRequests(){return fetch(`${this._baseGitHubUrl}/pulls`,{headers:this._requestHeaders}).then((e=>e.json()))}addLabelToPullRequest(e,t){return fetch(`${this._baseGitHubUrl}/issues/${t}/labels`,{method:"POST",headers:this._requestHeaders,body:JSON.stringify({labels:[e]})})}}}},t={};!function s(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,s),a.exports}(769)})();