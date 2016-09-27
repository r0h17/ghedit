define(["require","exports","vs/base/common/strings","vs/editor/common/modes/nullMode"],function(n,t,e,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function i(n,t){return u(n,a(t))}function o(n,t,e){return s(n,a(t),e)}function a(n){return n&&n.tokenizationSupport?n.tokenizationSupport:{getInitialState:function(){return new r.NullState(null,null)},tokenize:function(n,t,e,i){return void 0===e&&(e=0),r.nullTokenize(null,n,t,e,i)}}}function u(n,t){var e={tagName:"div",style:"white-space: pre-wrap",children:[]},r=function(n,t){e.children.push({tagName:"span",className:n,text:t})},i=function(){e.children.push({tagName:"br"})};return l(n,t,r,i),e}function s(n,t,r){void 0===r&&(r=""),r&&r.length>0&&(r=" "+r);var i="",o=function(n,t){i+='<span class="'+n+r+'">'+e.escape(t)+"</span>"},a=function(){i+="<br/>"};return i='<div style="white-space: pre-wrap;">',l(n,t,o,a),i+="</div>"}function l(n,t,e,r){for(var i=n.split(/\r\n|\r|\n/),o=t.getInitialState(),a=0;a<i.length;a++)o=c(i[a],t,e,o),a<i.length-1&&r()}function c(n,t,e,r){for(var i,o=t.tokenize(n,r),a=o.endState,u=o.tokens,s=0,l=0;l<u.length;l++){var c=u[l];l<u.length-1?(i=n.substring(s,u[l+1].startIndex),s=u[l+1].startIndex):i=n.substr(s);var p="token",f=c.type.replace(/[^a-z0-9\-]/gi," ");f.length>0&&(p+=" "+f),e(p,i)}return a}t.tokenizeToHtmlContent=i,t.tokenizeToString=o});