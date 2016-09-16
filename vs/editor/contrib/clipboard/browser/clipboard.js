/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(o,e){function t(){this.constructor=o}for(var n in e)e.hasOwnProperty(n)&&(o[n]=e[n]);o.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)};define(["require","exports","vs/nls","vs/base/common/keyCodes","vs/base/common/lifecycle","vs/base/common/winjs.base","vs/base/browser/browser","vs/platform/keybinding/common/keybinding","vs/editor/common/config/config","vs/editor/common/editorAction","vs/editor/common/editorActionEnablement","vs/editor/common/editorCommon","vs/editor/common/editorCommonExtensions","vs/platform/actions/common/actions","vs/css!./clipboard"],function(o,e,t,n,i,r,a,c,d,s,m,p,u,l){"use strict";function C(o){var e=o.getModel();if(!e)return!1;var t=e.hasEditableRange();if(!t)return!0;var n=e.getEditableRange(),i=o.getPosition();return n.containsPosition(i)}function y(o,e,t){a.supportsExecCommand(o.execCommand)&&(u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(o.ctor,o.id,o.label,{handler:E.bind(null,o.id,o.execCommand),context:u.ContextKey.None,primary:o.primary,secondary:o.secondary,win:o.win,linux:o.linux,mac:o.mac,kbExpr:c.KbExpr.has(p.KEYBINDING_CONTEXT_EDITOR_TEXT_FOCUS)},e)),l.MenuRegistry.appendMenuItem(l.MenuId.EditorContext,{command:{id:o.id,title:o.label},group:"9_cutcopypaste",order:t,when:o.kbExpr}))}function E(o,e,t,n){var i=d.findFocusedEditor(o,t,!1);return i&&i.isFocused()?void i.trigger("keyboard",o,n):void document.execCommand(e)}var b=function(o){function e(e,t,n){var i=this;o.call(this,e,t,n),this.toUnhook=[],this.toUnhook.push(this.editor.onDidChangeCursorSelection(function(o){i.resetEnablementState()}))}return __extends(e,o),e.prototype.dispose=function(){this.toUnhook=i.dispose(this.toUnhook),o.prototype.dispose.call(this)},e.prototype.getEnablementState=function(){return!!a.enableEmptySelectionClipboard||!this.editor.getSelection().isEmpty()},e}(s.EditorAction),h=function(o){function e(e,t){o.call(this,e,t,m.Behaviour.Writeable|m.Behaviour.WidgetFocus|m.Behaviour.UpdateOnCursorPositionChange)}return __extends(e,o),e.prototype.getEnablementState=function(){return o.prototype.getEnablementState.call(this)&&C(this.editor)},e.prototype.run=function(){return this.editor.focus(),document.execCommand("cut"),r.TPromise.as(!0)},e}(b),K=function(o){function e(e,t){o.call(this,e,t,m.Behaviour.WidgetFocus)}return __extends(e,o),e.prototype.run=function(){return this.editor.focus(),document.execCommand("copy"),r.TPromise.as(!0)},e}(b),_=function(o){function e(e,t){o.call(this,e,t,m.Behaviour.Writeable|m.Behaviour.WidgetFocus|m.Behaviour.UpdateOnCursorPositionChange)}return __extends(e,o),e.prototype.getEnablementState=function(){return C(this.editor)},e.prototype.run=function(){return this.editor.focus(),document.execCommand("paste"),null},e}(s.EditorAction);y({ctor:h,id:"editor.action.clipboardCutAction",label:t.localize("actions.clipboard.cutLabel","Cut"),execCommand:"cut",primary:n.KeyMod.CtrlCmd|n.KeyCode.KEY_X,win:{primary:n.KeyMod.CtrlCmd|n.KeyCode.KEY_X,secondary:[n.KeyMod.Shift|n.KeyCode.Delete]},kbExpr:c.KbExpr.and(c.KbExpr.has(p.KEYBINDING_CONTEXT_EDITOR_FOCUS),c.KbExpr.not(p.KEYBINDING_CONTEXT_EDITOR_READONLY))},"Cut",1),y({ctor:K,id:"editor.action.clipboardCopyAction",label:t.localize("actions.clipboard.copyLabel","Copy"),execCommand:"copy",primary:n.KeyMod.CtrlCmd|n.KeyCode.KEY_C,win:{primary:n.KeyMod.CtrlCmd|n.KeyCode.KEY_C,secondary:[n.KeyMod.CtrlCmd|n.KeyCode.Insert]},kbExpr:c.KbExpr.has(p.KEYBINDING_CONTEXT_EDITOR_FOCUS)},"Copy",2),y({ctor:_,id:"editor.action.clipboardPasteAction",label:t.localize("actions.clipboard.pasteLabel","Paste"),execCommand:"paste",primary:n.KeyMod.CtrlCmd|n.KeyCode.KEY_V,win:{primary:n.KeyMod.CtrlCmd|n.KeyCode.KEY_V,secondary:[n.KeyMod.Shift|n.KeyCode.Insert]},kbExpr:c.KbExpr.and(c.KbExpr.has(p.KEYBINDING_CONTEXT_EDITOR_FOCUS),c.KbExpr.not(p.KEYBINDING_CONTEXT_EDITOR_READONLY))},"Paste",3)});