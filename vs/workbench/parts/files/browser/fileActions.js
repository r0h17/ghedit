/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},__decorate=this&&this.__decorate||function(e,t,r,i){var n,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(o<3?n(a):o>3?n(t,r,a):n(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a},__param=this&&this.__param||function(e,t){return function(r,i){t(r,i,e)}};define(["require","exports","vs/base/common/winjs.base","vs/nls","vs/base/common/platform","vs/base/common/async","vs/base/common/mime","vs/base/common/paths","vs/base/common/uri","vs/base/common/errors","vs/base/common/strings","vs/base/common/events","vs/base/common/labels","vs/base/common/severity","vs/base/common/diagnostics","vs/workbench/browser/parts/editor/textEditor","vs/base/common/actions","vs/base/browser/ui/inputbox/inputBox","vs/base/common/lifecycle","vs/workbench/common/events","vs/workbench/parts/files/common/files","vs/platform/files/common/files","vs/workbench/common/editor/diffEditorInput","vs/workbench/common/editor","vs/workbench/parts/files/common/editors/fileEditorInput","vs/workbench/parts/files/common/explorerViewModel","vs/workbench/parts/files/common/editors/textFileEditorModel","vs/workbench/services/untitled/common/untitledEditorService","vs/workbench/services/editor/common/editorService","vs/workbench/browser/viewlet","vs/workbench/services/group/common/groupService","vs/workbench/services/quickopen/common/quickOpenService","vs/workbench/services/viewlet/common/viewletService","vs/platform/storage/common/storage","vs/platform/editor/common/editor","vs/platform/event/common/event","vs/platform/instantiation/common/instantiation","vs/platform/message/common/message","vs/platform/workspace/common/workspace","vs/base/common/keyCodes","vs/css!./media/fileactions"],function(e,t,r,i,n,o,a,s,c,l,u,p,v,h,m,d,f,_,S,I,E,g,F,y,w,b,x,A,D,T,k,L,C,W,R,M,P,z,B,N){"use strict";function O(e){switch(e){case Q.ID:return new N.Keybinding(N.KeyMod.CtrlCmd|N.KeyCode.KEY_N);case G.ID:return new N.Keybinding(n.isMacintosh?N.KeyCode.Enter:N.KeyCode.F2);case Ee.ID:return new N.Keybinding(N.KeyMod.CtrlCmd|N.KeyCode.KEY_S);case oe.ID:case ne.ID:return new N.Keybinding(n.isMacintosh?N.KeyMod.CtrlCmd|N.KeyCode.Backspace:N.KeyCode.Delete);case le.ID:return new N.Keybinding(N.KeyMod.CtrlCmd|N.KeyCode.KEY_C);case ue.ID:return new N.Keybinding(N.KeyMod.CtrlCmd|N.KeyCode.KEY_V);case ve.ID:return n.isMacintosh?new N.Keybinding(N.KeyMod.WinCtrl|N.KeyCode.Enter):new N.Keybinding(N.KeyMod.CtrlCmd|N.KeyCode.Enter)}return null}function V(e,t,r){if(void 0===r&&(r=!1),t=K(t),!t||0===t.length||/^\s+$/.test(t))return i.localize("emptyFileNameError","A file or folder name must be provided.");if(!r&&e.children&&e.children.some(function(e){return n.isLinux?e.name===t:e.name.toLowerCase()===t.toLowerCase()}))return i.localize("fileNameExistsError","A file or folder **{0}** already exists at this location. Please choose a different name.",t);if(!s.isValidBasename(t))return i.localize("invalidFileNameError","The name **{0}** is not valid as a file or folder name. Please choose a different name.",t);if(n.isWindows){var o=t.length+e.resource.fsPath.length+1;if(o>255)return i.localize("filePathTooLongError","The name **{0}** results in a path that is too long. Please choose a shorter name.",t)}return null}function K(e){return e?(e=u.trim(u.trim(e," "),"\t"),e=u.rtrim(e,".")):e}var U=function(e){function t(t,r,i,n,o,a,s,c){e.call(this,t,r),this._contextService=i,this._editorService=n,this._fileService=o,this._messageService=a,this._textFileService=s,this._eventService=c,this.enabled=!1}return __extends(t,e),Object.defineProperty(t.prototype,"contextService",{get:function(){return this._contextService},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"messageService",{get:function(){return this._messageService},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"editorService",{get:function(){return this._editorService},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fileService",{get:function(){return this._fileService},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"eventService",{get:function(){return this._eventService},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textFileService",{get:function(){return this._textFileService},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"element",{get:function(){return this._element},set:function(e){this._element=e},enumerable:!0,configurable:!0}),t.prototype._isEnabled=function(){return!0},t.prototype._updateEnablement=function(){this.enabled=!!(this._contextService&&this._fileService&&this._editorService&&this._isEnabled())},t.prototype.onError=function(e){this._messageService.show(z.Severity.Error,e)},t.prototype.onWarning=function(e){this._messageService.show(z.Severity.Warning,e)},t.prototype.onErrorWithRetry=function(e,t,r){var n=[z.CancelAction,new f.Action(this.id,i.localize("retry","Retry"),null,(!0),function(){return t()})];r&&n.push(r);var o={actions:n,message:l.toErrorMessage(e,!1)};this._messageService.show(z.Severity.Error,o)},t.prototype.handleDirty=function(){if(this.textFileService.isDirty(this._element.resource)){var e=this.textFileService.confirmSave([this._element.resource]);return e===y.ConfirmResult.SAVE?this.textFileService.save(this._element.resource).then(function(){return!1}):e===y.ConfirmResult.DONT_SAVE?this.textFileService.revert(this._element.resource).then(function(){return!1}):r.TPromise.as(!0)}return r.TPromise.as(!1)},t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService)],t)}(f.Action);t.BaseFileAction=U;var G=function(e){function t(r,n,o,a,s,c,l,u,p){e.call(this,t.ID,i.localize("rename","Rename"),o,a,s,c,l,u),this.tree=r,this.element=n,this.renameAction=p.createInstance(H,n),this._updateEnablement()}return __extends(t,e),t.prototype.validateFileName=function(e,t){return this.renameAction.validateFileName(this.element.parent,t)},t.prototype.run=function(e){var t=this;if(!e)return r.TPromise.wrapError("No context provided to BaseEnableFileRenameAction.");var i=e.viewletState;if(!i)return r.TPromise.wrapError("Invalid viewlet state provided to BaseEnableFileRenameAction.");var n=e.stat;return n?(i.setEditable(n,{action:this.renameAction,validator:function(e){var r=t.validateFileName(t.element.parent,e);return r?{content:r,formatContent:!0,type:_.MessageType.ERROR}:null}}),void this.tree.refresh(n,!1).then(function(){t.tree.setHighlight(n);var e=t.tree.addListener2(p.EventType.HIGHLIGHT,function(r){r.highlight||(i.clearEditable(n),t.tree.refresh(n).done(null,l.onUnexpectedError),e.dispose())})}).done(null,l.onUnexpectedError)):r.TPromise.wrapError("Invalid stat provided to BaseEnableFileRenameAction.")},t.ID="workbench.files.action.triggerRename",t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService),__param(8,P.IInstantiationService)],t)}(U);t.TriggerRenameFileAction=G;var j=function(e){function t(t,r,i,n,o,a,s,c,l){e.call(this,t,r,n,o,a,s,c,l),this.element=i}return __extends(t,e),t.prototype.run=function(e){var t=this;if(!e)return r.TPromise.wrapError("No context provided to BaseRenameFileAction.");var i=e.value;if(!i)return r.TPromise.wrapError("No new name provided to BaseRenameFileAction.");i=K(i);var n=K(this.element.name);if(i===n||this.validateFileName(this.element.parent,i))return r.TPromise.as(null);var o=this.runAction(i).then(function(e){e&&t.onSuccess(e)},function(e){t.onError(e)});return o},t.prototype.validateFileName=function(e,t){var r=this.element.name,i=t;return n.isLinux||(r=r.toLowerCase(),i=i.toLowerCase()),K(r)===K(i)?null:V(e,t,!1)},t.prototype.onSuccess=function(e){var t=null;this.element instanceof b.NewStatPlaceholder||(t=this.element.clone()),this.eventService.emit("files.internal:fileChanged",new E.LocalFileChangeEvent(t,e))},t=__decorate([__param(3,B.IWorkspaceContextService),__param(4,D.IWorkbenchEditorService),__param(5,g.IFileService),__param(6,z.IMessageService),__param(7,E.ITextFileService),__param(8,M.IEventService)],t)}(U);t.BaseRenameAction=j;var H=function(e){function t(r,n,o,a,s,c,l){e.call(this,t.ID,i.localize("rename","Rename"),r,n,o,a,s,c,l),this._updateEnablement()}return __extends(t,e),t.prototype.runAction=function(e){var t=this;return this.handleDirty().then(function(n){return n?r.TPromise.as(null):t.textFileService.isDirty(t.element.resource)?(t.onWarning(i.localize("warningFileDirty","File '{0}' is currently being saved, please try again later.",v.getPathLabel(t.element.resource))),r.TPromise.as(null)):t.fileService.rename(t.element.resource,e).then(null,function(r){t.onErrorWithRetry(r,function(){return t.runAction(e)})})})},t.ID="workbench.files.action.renameFile",t=__decorate([__param(1,B.IWorkspaceContextService),__param(2,D.IWorkbenchEditorService),__param(3,g.IFileService),__param(4,z.IMessageService),__param(5,E.ITextFileService),__param(6,M.IEventService)],t)}(j);t.RenameFileAction=H;var Y=function(e){function t(t,r,i,n,o,a,s,c,l,u,p,v){e.call(this,t,r,s,c,l,u,p,v),a&&(this.presetFolder=a.isDirectory?a:a.parent),this.tree=i,this.isFile=n,this.renameAction=o}return __extends(t,e),t.prototype.run=function(e){var t=this;if(!e)return r.TPromise.wrapError("No context provided to BaseNewAction.");var i=e.viewletState;if(!i)return r.TPromise.wrapError("Invalid viewlet state provided to BaseNewAction.");var n=this.presetFolder;if(!n){var o=this.tree.getFocus();n=o?o.isDirectory?o:o.parent:this.tree.getInput()}return n?this.tree.reveal(n,.5).then(function(){return t.tree.expand(n).then(function(){var e=b.NewStatPlaceholder.addNewStatPlaceholder(n,!t.isFile);return t.renameAction.element=e,i.setEditable(e,{action:t.renameAction,validator:function(e){var r=t.renameAction.validateFileName(n,e);return r?{content:r,formatContent:!0,type:_.MessageType.ERROR}:null}}),t.tree.refresh(n).then(function(){return t.tree.expand(n).then(function(){return t.tree.reveal(e,.5).then(function(){t.tree.setHighlight(e);var r=t.tree.addListener2(p.EventType.HIGHLIGHT,function(i){i.highlight||(e.destroy(),t.tree.refresh(n).done(null,l.onUnexpectedError),r.dispose())})})})})})}):r.TPromise.wrapError("Invalid parent folder to create.")},t=__decorate([__param(6,B.IWorkspaceContextService),__param(7,D.IWorkbenchEditorService),__param(8,g.IFileService),__param(9,z.IMessageService),__param(10,E.ITextFileService),__param(11,M.IEventService)],t)}(U);t.BaseNewAction=Y;var q=function(e){function t(t,r,n,o,a,s,c,l,u){e.call(this,"workbench.action.files.newFile",i.localize("newFile","New File"),t,!0,u.createInstance(te,r),null,n,o,a,s,c,l),this["class"]="explorer-action new-file",this._updateEnablement()}return __extends(t,e),t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService),__param(8,P.IInstantiationService)],t)}(Y);t.NewFileAction=q;var $=function(e){function t(t,r,n,o,a,s,c,l,u){e.call(this,"workbench.action.files.newFolder",i.localize("newFolder","New Folder"),t,!1,u.createInstance(re,r),null,n,o,a,s,c,l),this["class"]="explorer-action new-folder",this._updateEnablement()}return __extends(t,e),t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService),__param(8,P.IInstantiationService)],t)}(Y);t.NewFolderAction=$;var X=function(e){function t(t,r,i,n,o){e.call(this,t,r),this.viewletService=i,this.instantiationService=n,this.messageService=o}return __extends(t,e),t.prototype.run=function(){var e=this;return this.viewletService.openViewlet(E.VIEWLET_ID,!0).then(function(t){return r.TPromise.timeout(100).then(function(){t.focus();var r=t,n=r.getExplorerView();if(!n)return e.messageService.show(z.Severity.Info,i.localize("openFolderFirst","Open a folder first to create files or folders within."));n.isExpanded()||n.expand();var o=e.toDispose=e.instantiationService.createInstance(e.getAction(),n.getViewer(),null);return r.getActionRunner().run(o)})})},t.prototype.dispose=function(){e.prototype.dispose.call(this),this.toDispose&&(this.toDispose.dispose(),this.toDispose=null)},t=__decorate([__param(2,C.IViewletService),__param(3,P.IInstantiationService),__param(4,z.IMessageService)],t)}(f.Action);t.BaseGlobalNewAction=X;var Q=function(e){function t(t,r,i,n,o,a){e.call(this,t,r),this.storageService=i,this.editorService=n,this.textFileService=o,this.untitledEditorService=a}return __extends(t,e),t.prototype.run=function(){var e=this.untitledEditorService.createOrGet();return this.editorService.openEditor(e,{pinned:!0})},t.ID="workbench.action.files.newUntitledFile",t.LABEL=i.localize("newUntitledFile","New Untitled File"),t=__decorate([__param(2,W.IStorageService),__param(3,D.IWorkbenchEditorService),__param(4,E.ITextFileService),__param(5,A.IUntitledEditorService)],t)}(f.Action);t.GlobalNewUntitledFileAction=Q;var J=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.getAction=function(){return q},t.ID="workbench.action.files.newFile",t.LABEL=i.localize("newFile","New File"),t}(X);t.GlobalNewFileAction=J;var Z=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.getAction=function(){return $},t.ID="workbench.action.files.newFolder",t.LABEL=i.localize("newFolder","New Folder"),t}(X);t.GlobalNewFolderAction=Z;var ee=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.validateFileName=function(t,r){return this.element instanceof b.NewStatPlaceholder?V(t,r,!1):e.prototype.validateFileName.call(this,t,r)},t}(j);t.BaseCreateAction=ee;var te=function(e){function t(r,i,n,o,a,s,c){e.call(this,t.ID,t.LABEL,r,i,n,o,a,s,c),this._updateEnablement()}return __extends(t,e),t.prototype.runAction=function(e){var t=this;return this.fileService.createFile(c["default"].file(s.join(this.element.parent.resource.fsPath,e))).then(null,function(r){t.onErrorWithRetry(r,function(){return t.runAction(e)})})},t.ID="workbench.files.action.createFileFromExplorer",t.LABEL=i.localize("createNewFile","New File"),t=__decorate([__param(1,B.IWorkspaceContextService),__param(2,D.IWorkbenchEditorService),__param(3,g.IFileService),__param(4,z.IMessageService),__param(5,E.ITextFileService),__param(6,M.IEventService)],t)}(ee);t.CreateFileAction=te;var re=function(e){function t(r,i,n,o,a,s,c){e.call(this,t.ID,t.LABEL,null,i,n,o,a,s,c),this._updateEnablement()}return __extends(t,e),t.prototype.runAction=function(e){var t=this;return this.fileService.createFolder(c["default"].file(s.join(this.element.parent.resource.fsPath,e))).then(null,function(r){t.onErrorWithRetry(r,function(){return t.runAction(e)})})},t.ID="workbench.files.action.createFolderFromExplorer",t.LABEL=i.localize("createNewFolder","New Folder"),t=__decorate([__param(1,B.IWorkspaceContextService),__param(2,D.IWorkbenchEditorService),__param(3,g.IFileService),__param(4,z.IMessageService),__param(5,E.ITextFileService),__param(6,M.IEventService)],t)}(ee);t.CreateFolderAction=re;var ie=function(e){function t(t,r,i,n,o,a,c,l,u,p,v){e.call(this,t,r,a,c,l,u,p,v),this.tree=i,this.element=n,this.useTrash=o&&!s.isUNC(n.resource.fsPath),this._updateEnablement()}return __extends(t,e),t.prototype.run=function(){var e=this;if(this.tree&&this.tree.clearHighlight(),!this.skipConfirm){var t;if(t=this.useTrash?{message:this.element.isDirectory?i.localize("confirmMoveTrashMessageFolder","Are you sure you want to delete '{0}' and its contents?",this.element.name):i.localize("confirmMoveTrashMessageFile","Are you sure you want to delete '{0}'?",this.element.name),detail:n.isWindows?i.localize("undoBin","You can restore from the recycle bin."):i.localize("undoTrash","You can restore from the trash."),primaryButton:n.isWindows?i.localize("deleteButtonLabelRecycleBin","&&Move to Recycle Bin"):i.localize({key:"deleteButtonLabelTrash",comment:["&& denotes a mnemonic"]},"&&Move to Trash")}:{message:this.element.isDirectory?i.localize("confirmDeleteMessageFolder","Are you sure you want to permanently delete '{0}' and its contents?",this.element.name):i.localize("confirmDeleteMessageFile","Are you sure you want to permanently delete '{0}'?",this.element.name),detail:i.localize("irreversible","This action is irreversible!"),primaryButton:i.localize({key:"deleteButtonLabel",comment:["&& denotes a mnemonic"]},"&&Delete")},!this.messageService.confirm(t))return r.TPromise.as(null)}this.eventService.emit("files.internal:fileChanged",new E.LocalFileChangeEvent(this.element.clone(),null));var o=this.fileService.del(this.element.resource,this.useTrash).then(function(){e.element.parent&&e.tree.setFocus(e.element.parent)},function(t){var r;e.useTrash&&(r=new f.Action("permanentDelete",i.localize("permDelete","Delete Permanently"),null,(!0),function(){return e.useTrash=!1,e.skipConfirm=!0,e.run()})),e.onErrorWithRetry(t,function(){return e.run()},r);var n=new E.LocalFileChangeEvent(new b.FileStat(e.contextService.getWorkspace().resource,(!0),(!0)),new b.FileStat(e.contextService.getWorkspace().resource,(!0),(!0)));e.eventService.emit("files.internal:fileChanged",n),e.tree.DOMFocus()});return o},t=__decorate([__param(5,B.IWorkspaceContextService),__param(6,D.IWorkbenchEditorService),__param(7,g.IFileService),__param(8,z.IMessageService),__param(9,E.ITextFileService),__param(10,M.IEventService)],t)}(U);t.BaseDeleteFileAction=ie;var ne=function(e){function t(r,n,o,a,s,c,l,u){e.call(this,t.ID,i.localize("delete","Delete"),r,n,!0,o,a,s,c,l,u)}return __extends(t,e),t.ID="workbench.files.action.moveFileToTrash",t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService)],t)}(ie);t.MoveFileToTrashAction=ne;var oe=function(e){function t(r,n,o,a,s,c,l,u){e.call(this,t.ID,i.localize("delete","Delete"),r,n,!1,o,a,s,c,l,u)}return __extends(t,e),t.ID="workbench.files.action.deleteFile",t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService)],t)}(ie);t.DeleteFileAction=oe;var ae=function(e){function t(r,n,o,a,s,c,l,u,p){e.call(this,t.ID,i.localize("importFiles","Import Files"),a,s,c,l,u,p),this.tree=r,this.element=n,o&&(this["class"]=o),this._updateEnablement()}return __extends(t,e),t.prototype.getViewer=function(){return this.tree},t.prototype.run=function(e){var t=this,a=r.TPromise.as(null).then(function(){var r=e.input;if(r.files&&r.files.length>0){var a;a=t.element?t.element:t.tree.getFocus()||t.tree.getInput(),a.isDirectory||(a=a.parent);for(var s=[],l=0;l<r.files.length;l++){var u=r.files[l];s.push(u)}return t.fileService.resolveFile(a.resource).then(function(r){var l={};r.children.forEach(function(e){l[n.isLinux?e.name:e.name.toLowerCase()]=e});var u=!0;if(s.some(function(e){return!!l[n.isLinux?e.name:e.name.toLowerCase()]})){var p={message:i.localize("confirmOverwrite","A file or folder with the same name already exists in the destination folder. Do you want to replace it?"),detail:i.localize("irreversible","This action is irreversible!"),primaryButton:i.localize({key:"replaceButtonLabel",comment:["&& denotes a mnemonic"]},"&&Replace")};u=t.messageService.confirm(p)}if(u){var v=[];return s.forEach(function(r){v.push(function(){var i=c["default"].file(r.path);return t.fileService.importFile(i,a.resource).then(function(i){if(i.stat){var o=l[n.isLinux?r.name:r.name.toLowerCase()];o&&o.resource.fsPath!==i.stat.resource.fsPath&&t.eventService.emit("files.internal:fileChanged",new E.LocalFileChangeEvent(o,null)),t.eventService.emit("files.internal:fileChanged",new se(i.stat,i.isNew,e.event))}},function(e){t.messageService.show(z.Severity.Error,e)})})}),o.sequence(v)}})}});return a.then(function(){t.tree.clearHighlight()},function(e){t.onError(e),t.tree.clearHighlight()})},t.ID="workbench.files.action.importFile",t=__decorate([__param(3,B.IWorkspaceContextService),__param(4,D.IWorkbenchEditorService),__param(5,g.IFileService),__param(6,z.IMessageService),__param(7,E.ITextFileService),__param(8,M.IEventService)],t)}(U);t.ImportFileAction=ae;var se=function(e){function t(t,r,i){e.call(this,null,t,i),this.isNew=r}return __extends(t,e),t.prototype.gotAdded=function(){return this.isNew},t.prototype.gotMoved=function(){return!1},t.prototype.gotUpdated=function(){return!this.isNew},t.prototype.gotDeleted=function(){return!1},t}(E.LocalFileChangeEvent);t.FileImportedEvent=se;var ce,le=function(e){function t(r,n,o,a,s,c,l,u){e.call(this,t.ID,i.localize("copyFile","Copy"),o,a,s,c,l,u),this.tree=r,this.element=n,this._updateEnablement()}return __extends(t,e),t.prototype.run=function(){return ce=this.element,this.tree&&this.tree.clearHighlight(),this.tree.DOMFocus(),r.TPromise.as(null)},t.ID="workbench.files.action.copyFile",t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService)],t)}(U);t.CopyFileAction=le;var ue=function(e){function t(r,n,o,a,s,c,l,u,p){e.call(this,t.ID,i.localize("pasteFile","Paste"),o,a,s,c,l,u),this.instantiationService=p,this.tree=r,this.element=n,this._updateEnablement()}return __extends(t,e),t.prototype._isEnabled=function(){if(!ce)return!1;var e=this.tree.getInput(),t=e.find(ce.resource);return t?this.element.resource.toString()===ce.resource.toString()||!s.isEqualOrParent(this.element.resource.fsPath,ce.resource.fsPath):(ce=null,!1)},t.prototype.run=function(){var e,t=this;e=this.element.resource.toString()===ce.resource.toString()?this.element.parent:this.element.isDirectory?this.element:this.element.parent;var r=this.instantiationService.createInstance(pe,this.tree,ce,e);return r.run().then(function(){t.tree.DOMFocus()})},t.ID="workbench.files.action.pasteFile",t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,D.IWorkbenchEditorService),__param(4,g.IFileService),__param(5,z.IMessageService),__param(6,E.ITextFileService),__param(7,M.IEventService),__param(8,P.IInstantiationService)],t)}(U);t.PasteFileAction=ue;var pe=function(e){function t(t,r,n,o,a,s,c,l,u){e.call(this,"workbench.files.action.duplicateFile",i.localize("duplicateFile","Duplicate"),o,a,s,c,l,u),this.tree=t,this.element=r,this.target=n&&n.isDirectory?n:r.parent,this._updateEnablement()}return __extends(t,e),t.prototype.run=function(){var e=this;this.tree&&this.tree.clearHighlight();var t=this.fileService.copyFile(this.element.resource,this.findTarget()).then(function(t){e.eventService.emit("files.internal:fileChanged",new E.LocalFileChangeEvent(null,t))},function(t){e.onError(t)});return t},t.prototype.onError=function(e){this.messageService.show(z.Severity.Error,e)},t.prototype.findTarget=function(){for(var e=this.tree.getInput(),t=this.element.name,r=c["default"].file(s.join(this.target.resource.fsPath,t));;){if(!e.find(r))break;t=this.toCopyName(t,this.element.isDirectory),r=c["default"].file(s.join(this.target.resource.fsPath,t))}return r},t.prototype.toCopyName=function(e,t){if(!t&&e.match(/(\d+)(\..*)$/))return e.replace(/(\d+)(\..*)$/,function(e,t,r){return parseInt(t)+1+r});var r=e.lastIndexOf(".");return!t&&r>=0?u.format("{0}.1{1}",e.substr(0,r),e.substr(r)):t&&e.match(/(\d+)$/)?e.replace(/(\d+)$/,function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return String(parseInt(t[0])+1)}):u.format("{0}.1",e)},t=__decorate([__param(3,B.IWorkspaceContextService),__param(4,D.IWorkbenchEditorService),__param(5,g.IFileService),__param(6,z.IMessageService),__param(7,E.ITextFileService),__param(8,M.IEventService)],t)}(U);t.DuplicateFileAction=pe;var ve=function(e){function t(r,i,n,o){e.call(this,t.ID,t.LABEL),this.editorService=o,this.tree=r,this.preserveFocus=n,this.resource=i,this.updateEnablement()}return __extends(t,e),t.prototype.updateEnablement=function(){var e=this.editorService.getActiveEditor();this.enabled=!e||e.position!==R.Position.RIGHT},t.prototype.run=function(){return this.tree.clearHighlight(),this.editorService.openEditor({resource:this.resource,options:{preserveFocus:this.preserveFocus}},!0)},t.ID="workbench.files.action.openToSide",t.LABEL=i.localize("openToSide","Open to the Side"),t=__decorate([__param(3,D.IWorkbenchEditorService)],t)}(f.Action);t.OpenToSideAction=ve;var he,me=function(e){function t(t,r){e.call(this,"workbench.files.action.selectForCompare",i.localize("compareSource","Select for Compare")),this.tree=r,this.resource=t,this.enabled=!0}return __extends(t,e),t.prototype.run=function(){return he=this.resource,this.tree&&(this.tree.clearHighlight(),this.tree.DOMFocus()),r.TPromise.as(null)},t}(f.Action);t.SelectResourceForCompareAction=me;var de=function(e){function t(t,r,i,n,o,a,s,c){e.call(this,t,r),this.quickOpenService=i,this.instantiationService=n,this.editorService=o,this.editorGroupService=a,this.messageService=s,this.eventService=c}return __extends(t,e),t.prototype.run=function(){var e=this,t=y.asFileEditorInput(this.editorService.getActiveEditorInput());if(t){he=t.getResource();var n=this.editorGroupService.onEditorOpening(function(t){n.dispose();var r=y.asFileEditorInput(t.editorInput);if(r){var o=e.instantiationService.createInstance(fe,r.getResource(),null);o._isEnabled()?(t.prevent(),o.run().done(function(){return o.dispose()})):e.messageService.show(z.Severity.Info,i.localize("unableToFileToCompare","The selected file can not be compared with '{0}'.",s.basename(he.fsPath)))}});this.quickOpenService.show().then(function(){n.dispose()})}else this.messageService.show(z.Severity.Info,i.localize("openFileToCompare","Open a file first to compare it with another file."));return r.TPromise.as(!0)},t.ID="workbench.files.action.compareFileWith",t.LABEL=i.localize("globalCompareFile","Compare Active File With..."),t=__decorate([__param(2,L.IQuickOpenService),__param(3,P.IInstantiationService),__param(4,D.IWorkbenchEditorService),__param(5,k.IEditorGroupService),__param(6,z.IMessageService),__param(7,M.IEventService)],t)}(f.Action);t.GlobalCompareResourcesAction=de;var fe=function(e){function t(r,i,n,o,a){e.call(this,"workbench.files.action.compareFiles",t.computeLabel()),this.contextService=n,this.instantiationService=o,this.editorService=a,this.tree=i,this.resource=r}return __extends(t,e),t.computeLabel=function(){return he?i.localize("compareWith","Compare with '{0}'",s.basename(he.fsPath)):i.localize("compareFiles","Compare Files")},t.prototype.getLabel=function(){return t.computeLabel()},t.prototype._isEnabled=function(){if(!he)return!1;if(this.tree){var e=this.tree.getInput();if(e instanceof b.FileStat){var t=e.find(he);if(!t)return he=null,!1}}if(this.resource.toString()===he.toString())return!1;var r=a.guessMimeTypes(this.resource.fsPath).join(", "),i=a.guessMimeTypes(he.fsPath).join(", ");if(r===i)return!0;var n=a.isBinaryMime(r),o=a.isBinaryMime(i);return n===o},t.prototype.run=function(){this.tree&&this.tree.clearHighlight();var e=this.instantiationService.createInstance(w.FileEditorInput,he,void 0,void 0),t=this.instantiationService.createInstance(w.FileEditorInput,this.resource,void 0,void 0);return this.editorService.openEditor(new F.DiffEditorInput(F.toDiffLabel(he,this.resource,this.contextService),null,e,t))},t=__decorate([__param(2,B.IWorkspaceContextService),__param(3,P.IInstantiationService),__param(4,D.IWorkbenchEditorService)],t)}(f.Action);t.CompareResourcesAction=fe;var _e=function(e){function t(t,r){e.call(this,"workbench.files.action.refreshExplorer",i.localize("refresh","Refresh"),r,!0,function(e){return t.refresh()})}return __extends(t,e),t}(f.Action);t.RefreshViewExplorerAction=_e;var Se=function(e){function t(t,r,i){e.call(this,t,r),this.messageService=i}return __extends(t,e),t.prototype.run=function(e){var t=this;return this.doRun(e).then(function(){return!0},function(e){t.messageService.show(z.Severity.Error,l.toErrorMessage(e,!1))})},t}(f.Action);t.BaseActionWithErrorReporting=Se;var Ie=function(e){function t(t,r,i,n,o,a,s){e.call(this,t,r,s),this.editorService=i,this.textFileService=n,this.untitledEditorService=o,this.instantiationService=a,this.enabled=!0}return __extends(t,e),t.prototype.setResource=function(e){this.resource=e},t.prototype.doRun=function(e){var t,i=this;if(t=this.resource?this.resource:y.getUntitledOrFileResource(this.editorService.getActiveEditorInput(),!0)){if(this.isSaveAs()||"untitled"===t.scheme){var n;if("untitled"===t.scheme){var o=this.untitledEditorService.get(t).getMime();a.isUnspecific(o)||(n=[o,a.MIME_TEXT].join(", "))}var s;if("untitled"===t.scheme)s=this.untitledEditorService.get(t).getEncoding();else if("file"===t.scheme){var l=x.CACHE.get(t);s=l&&l.getEncoding()}var u,p=this.editorService.getActiveEditor();if(p instanceof d.BaseTextEditor){var v=y.getUntitledOrFileResource(p.input,!0);v&&v.toString()===t.toString()&&(u=p.getSelection())}var h=void 0;return h=!this.isSaveAs()&&"untitled"===t.scheme&&this.untitledEditorService.hasAssociatedFilePath(t)?this.textFileService.save(t).then(function(e){return e?c["default"].file(t.fsPath):null}):this.textFileService.saveAs(t),h.then(function(e){if(e&&e.toString()!==t.toString()){var r={resource:e,mime:n,encoding:s,options:{pinned:!0,selection:u}};return i.editorService.replaceEditors([{toReplace:{resource:t},replaceWith:r}]).then(function(){return!0})}})}return this.textFileService.save(t)}return r.TPromise.as(!1)},t=__decorate([__param(2,D.IWorkbenchEditorService),__param(3,E.ITextFileService),__param(4,A.IUntitledEditorService),__param(5,P.IInstantiationService),__param(6,z.IMessageService)],t)}(Se);t.BaseSaveFileAction=Ie;var Ee=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.isSaveAs=function(){return!1},t.ID="workbench.action.files.save",t.LABEL=i.localize("save","Save"),t}(Ie);t.SaveFileAction=Ee;var ge=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.isSaveAs=function(){return!0},t.ID="workbench.action.files.saveAs",t.LABEL=i.localize("saveAs","Save As..."),t}(Ie);t.SaveFileAsAction=ge;var Fe=function(e){function t(t,r,i,n,o,a,s,c,l){e.call(this,t,r,l),this.editorService=i,this.editorGroupService=n,this.textFileService=o,this.untitledEditorService=a,this.instantiationService=s,this.eventService=c,this.toDispose=[],this.lastIsDirty=this.textFileService.isDirty(),this.enabled=this.lastIsDirty,this.registerListeners()}return __extends(t,e),t.prototype.registerListeners=function(){var e=this;this.toDispose.push(this.eventService.addListener2(E.EventType.FILE_DIRTY,function(t){return e.updateEnablement(!0)})),this.toDispose.push(this.eventService.addListener2(E.EventType.FILE_SAVED,function(t){return e.updateEnablement(!1)})),this.toDispose.push(this.eventService.addListener2(E.EventType.FILE_REVERTED,function(t){return e.updateEnablement(!1)})),this.toDispose.push(this.eventService.addListener2(E.EventType.FILE_SAVE_ERROR,function(t){return e.updateEnablement(!0)})),this.includeUntitled()&&(this.toDispose.push(this.eventService.addListener2(I.EventType.UNTITLED_FILE_DIRTY,function(){return e.updateEnablement(!0)})),this.toDispose.push(this.eventService.addListener2(I.EventType.UNTITLED_FILE_SAVED,function(){return e.updateEnablement(!1)})))},t.prototype.updateEnablement=function(e){this.lastIsDirty!==e&&(this.enabled=this.textFileService.isDirty(),
this.lastIsDirty=this.enabled)},t.prototype.doRun=function(e){var t=this,r=this.editorGroupService.getStacksModel(),i=Object.create(null);return this.textFileService.getDirty().filter(function(e){return"untitled"===e.scheme}).map(function(e){return t.untitledEditorService.get(e)}).filter(function(e){return!!e}).forEach(function(e){i[e.getResource().toString()]={mime:e.getMime(),encoding:e.getEncoding(),indexInGroups:r.groups.map(function(t){return t.indexOf(e)}),activeInGroups:r.groups.map(function(t){return t.isActive(e)})}}),this.textFileService.saveAll(this.getSaveAllArguments(e)).then(function(e){var r=[];if(e.results.forEach(function(e){if(e.success&&"untitled"===e.source.scheme){var t=i[e.source.toString()];if(t){var n;a.isUnspecific(t.mime)||(n=[t.mime,a.MIME_TEXT].join(", ")),t.indexInGroups.forEach(function(i,o){i>=0&&r.push({input:{resource:e.target,mime:n,encoding:t.encoding,options:{pinned:!0,index:i,preserveFocus:!0,inactive:!t.activeInGroups[o]}},position:o})})}}}),r.length)return t.editorService.openEditors(r).then(function(){return!0})})},t.prototype.dispose=function(){this.toDispose=S.dispose(this.toDispose),e.prototype.dispose.call(this)},t=__decorate([__param(2,D.IWorkbenchEditorService),__param(3,k.IEditorGroupService),__param(4,E.ITextFileService),__param(5,A.IUntitledEditorService),__param(6,P.IInstantiationService),__param(7,M.IEventService),__param(8,z.IMessageService)],t)}(Se);t.BaseSaveAllAction=Fe;var ye=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),Object.defineProperty(t.prototype,"class",{get:function(){return"explorer-action save-all"},enumerable:!0,configurable:!0}),t.prototype.getSaveAllArguments=function(){return this.includeUntitled()},t.prototype.includeUntitled=function(){return!0},t.ID="workbench.action.files.saveAll",t.LABEL=i.localize("saveAll","Save All"),t}(Fe);t.SaveAllAction=ye;var we=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),Object.defineProperty(t.prototype,"class",{get:function(){return"explorer-action save-all"},enumerable:!0,configurable:!0}),t.prototype.getSaveAllArguments=function(e){if(!e)return this.includeUntitled();var t=e.group,r=[];return t.getEditors().forEach(function(e){(e instanceof w.FileEditorInput||e instanceof y.UntitledEditorInput)&&r.push(e.getResource())}),r},t.prototype.includeUntitled=function(){return!0},t.ID="workbench.files.action.saveAllInGroup",t.LABEL=i.localize("saveAllInGroup","Save All in Group"),t}(Fe);t.SaveAllInGroupAction=we;var be=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.getSaveAllArguments=function(){return this.includeUntitled()},t.prototype.includeUntitled=function(){return!1},t.ID="workbench.action.files.saveFiles",t.LABEL=i.localize("saveFiles","Save Dirty Files"),t}(Fe);t.SaveFilesAction=be;var xe=function(e){function t(t,r,i,n){e.call(this,t,r),this.editorService=i,this.textFileService=n,this.enabled=!0}return __extends(t,e),t.prototype.setResource=function(e){this.resource=e},t.prototype.run=function(){var e;if(this.resource)e=this.resource;else{var t=y.asFileEditorInput(this.editorService.getActiveEditorInput(),!0);t&&(e=t.getResource())}return e&&"untitled"!==e.scheme?this.textFileService.revert(e,!0):r.TPromise.as(!0)},t.ID="workbench.action.files.revert",t.LABEL=i.localize("revert","Revert File"),t=__decorate([__param(2,D.IWorkbenchEditorService),__param(3,E.ITextFileService)],t)}(f.Action);t.RevertFileAction=xe;var Ae=function(e){function t(t,r,i){e.call(this,t,r),this.viewletService=i}return __extends(t,e),t.prototype.run=function(){return this.viewletService.openViewlet(E.VIEWLET_ID,!0).then(function(e){var t=e.getOpenEditorsView();t&&(t.expand(),t.getViewer().DOMFocus())})},t.ID="workbench.files.action.focusOpenEditorsView",t.LABEL=i.localize("focusOpenEditors","Focus on Open Editors View"),t=__decorate([__param(2,C.IViewletService)],t)}(f.Action);t.FocusOpenEditorsView=Ae;var De=function(e){function t(t,r,i){e.call(this,t,r),this.viewletService=i}return __extends(t,e),t.prototype.run=function(){return this.viewletService.openViewlet(E.VIEWLET_ID,!0).then(function(e){var t=e.getExplorerView();t&&(t.expand(),t.getViewer().DOMFocus())})},t.ID="workbench.files.action.focusFilesExplorer",t.LABEL=i.localize("focusFilesExplorer","Focus on Files Explorer"),t=__decorate([__param(2,C.IViewletService)],t)}(f.Action);t.FocusFilesExplorer=De;var Te=function(e){function t(t,r,i,n,o,a){e.call(this,t,r),this.editorService=i,this.viewletService=n,this.contextService=o,this.messageService=a}return __extends(t,e),t.prototype.run=function(){var e=this,t=y.asFileEditorInput(this.editorService.getActiveEditorInput(),!0);return t?this.viewletService.openViewlet(E.VIEWLET_ID,!1).then(function(r){var i=e.contextService.isInsideWorkspace(t.getResource());if(i){var n=r.getExplorerView();n&&(n.expand(),n.select(t.getResource(),!0))}else{var o=r.getOpenEditorsView();o&&o.expand()}}):(this.messageService.show(h["default"].Info,i.localize("openFileToShow","Open a file first to show it in the explorer")),r.TPromise.as(!0))},t.ID="workbench.files.action.showActiveFileInExplorer",t.LABEL=i.localize("showInExplorer","Show Active File in Explorer"),t=__decorate([__param(2,D.IWorkbenchEditorService),__param(3,C.IViewletService),__param(4,B.IWorkspaceContextService),__param(5,z.IMessageService)],t)}(f.Action);t.ShowActiveFileInExplorer=Te;var ke=function(e){function t(t,r,i){e.call(this,t,r),this.viewletService=i}return __extends(t,e),t.prototype.run=function(){return this.viewletService.openViewlet(E.VIEWLET_ID,!0).then(function(e){var t=e.getExplorerView();if(t){var r=t.getViewer();if(r){var i=new T.CollapseAction(r,(!0),null);i.run().done(),i.dispose()}}})},t.ID="workbench.files.action.collapseFilesExplorerFolders",t.LABEL=i.localize("collapseExplorerFolders","Collapse Folders in Explorer"),t=__decorate([__param(2,C.IViewletService)],t)}(f.Action);t.CollapseExplorerView=ke;var Le=function(e){function t(t,r,i){e.call(this,t,r),this.viewletService=i}return __extends(t,e),t.prototype.run=function(){return this.viewletService.openViewlet(E.VIEWLET_ID,!0).then(function(e){var t=e.getExplorerView();t&&t.refresh()})},t.ID="workbench.files.action.refreshFilesExplorer",t.LABEL=i.localize("refreshExplorer","Refresh Explorer"),t=__decorate([__param(2,C.IViewletService)],t)}(f.Action);t.RefreshExplorerView=Le,t.keybindingForAction=O,t.validateFileName=V,t.getWellFormedFileName=K;var Ce;Ce||(Ce=m.register("FileActionsDiagnostics",function(){for(var e=[],t=0;t<arguments.length;t++)e[t-0]=arguments[t];console.log(e[1]+" - "+e[0]+" (time: "+e[2].getTime()+" ["+e[2].toUTCString()+"])")}))});