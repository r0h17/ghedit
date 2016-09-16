define(["require","exports","vs/editor/common/editorCommon"],function(t,i,o){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var e=function(){function t(t){this._editor=t,this._decorations=[],this._findScopeDecorationId=null,this._lineHighlightDecorationId=null,this._highlightedDecorationId=null,this._startPosition=this._editor.getPosition()}return t.prototype.dispose=function(){this._editor.deltaDecorations(this._allDecorations(),[]),this._editor=null,this._decorations=[],this._findScopeDecorationId=null,this._lineHighlightDecorationId=null,this._highlightedDecorationId=null,this._startPosition=null},t.prototype.reset=function(){this._decorations=[],this._findScopeDecorationId=null,this._lineHighlightDecorationId=null,this._highlightedDecorationId=null},t.prototype.getCount=function(){return this._decorations.length},t.prototype.getFindScope=function(){return this._findScopeDecorationId?this._editor.getModel().getDecorationRange(this._findScopeDecorationId):null},t.prototype.getStartPosition=function(){return this._startPosition},t.prototype.setStartPosition=function(t){this._startPosition=t,this.setCurrentFindMatch(null)},t.prototype.getCurrentMatchesPosition=function(t){for(var i=0,o=this._decorations.length;i<o;i++){var e=this._editor.getModel().getDecorationRange(this._decorations[i]);if(t.equalsRange(e))return i+1}return 1},t.prototype.setCurrentFindMatch=function(i){var o=this,e=null,n=0;if(i)for(var r=0,a=this._decorations.length;r<a;r++){var c=this._editor.getModel().getDecorationRange(this._decorations[r]);if(i.equalsRange(c)){e=this._decorations[r],n=r+1;break}}return null===this._highlightedDecorationId&&null===e||this._editor.changeDecorations(function(i){if(null!==o._highlightedDecorationId&&(i.changeDecorationOptions(o._highlightedDecorationId,t.createFindMatchDecorationOptions(!1)),o._highlightedDecorationId=null),null!==e&&(o._highlightedDecorationId=e,i.changeDecorationOptions(o._highlightedDecorationId,t.createFindMatchDecorationOptions(!0))),null!==o._lineHighlightDecorationId&&(i.removeDecoration(o._lineHighlightDecorationId),o._lineHighlightDecorationId=null),null!==e){var n=o._editor.getModel().getDecorationRange(e);o._lineHighlightDecorationId=i.addDecoration(n,t.createLineHighlightDecoration())}}),n},t.prototype.set=function(i,o){var e=i.map(function(i){return{range:i,options:t.createFindMatchDecorationOptions(!1)}});o&&e.unshift({range:o,options:t.createFindScopeDecorationOptions()});var n=this._editor.deltaDecorations(this._allDecorations(),e);o?this._findScopeDecorationId=n.shift():this._findScopeDecorationId=null,this._decorations=n,this._lineHighlightDecorationId=null,this._highlightedDecorationId=null},t.prototype._allDecorations=function(){var t=[];return t=t.concat(this._decorations),this._findScopeDecorationId&&t.push(this._findScopeDecorationId),this._lineHighlightDecorationId&&t.push(this._lineHighlightDecorationId),t},t.createFindMatchDecorationOptions=function(t){return{stickiness:o.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,className:t?"currentFindMatch":"findMatch",overviewRuler:{color:"rgba(246, 185, 77, 0.7)",darkColor:"rgba(246, 185, 77, 0.7)",position:o.OverviewRulerLane.Center}}},t.createLineHighlightDecoration=function(){return{stickiness:o.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,className:"lineHighlight",isWholeLine:!0}},t.createFindScopeDecorationOptions=function(){return{className:"findScope",isWholeLine:!0}},t}();i.FindDecorations=e});