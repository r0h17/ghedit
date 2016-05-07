/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/nls', 'vs/base/common/mime', 'vs/base/common/paths', 'vs/base/browser/builder', 'vs/base/browser/dom', 'vs/css!./resourceviewer'], function (require, exports, nls, mimes, paths, builder_1, DOM) {
    'use strict';
    // Known media mimes that we can handle
    var mapExtToMediaMimes = {
        '.bmp': 'image/bmp',
        '.gif': 'image/gif',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpg',
        '.jpe': 'image/jpg',
        '.png': 'image/png',
        '.tiff': 'image/tiff',
        '.tif': 'image/tiff',
        '.ico': 'image/x-icon',
        '.tga': 'image/x-tga',
        '.psd': 'image/vnd.adobe.photoshop',
        '.mid': 'audio/midi',
        '.midi': 'audio/midi',
        '.mp4a': 'audio/mp4',
        '.mpga': 'audio/mpeg',
        '.mp2': 'audio/mpeg',
        '.mp2a': 'audio/mpeg',
        '.mp3': 'audio/mpeg',
        '.m2a': 'audio/mpeg',
        '.m3a': 'audio/mpeg',
        '.oga': 'audio/ogg',
        '.ogg': 'audio/ogg',
        '.spx': 'audio/ogg',
        '.aac': 'audio/x-aac',
        '.wav': 'audio/x-wav',
        '.wma': 'audio/x-ms-wma',
        '.mp4': 'video/mp4',
        '.mp4v': 'video/mp4',
        '.mpg4': 'video/mp4',
        '.mpeg': 'video/mpeg',
        '.mpg': 'video/mpeg',
        '.mpe': 'video/mpeg',
        '.m1v': 'video/mpeg',
        '.m2v': 'video/mpeg',
        '.ogv': 'video/ogg',
        '.qt': 'video/quicktime',
        '.mov': 'video/quicktime',
        '.webm': 'video/webm',
        '.mkv': 'video/x-matroska',
        '.mk3d': 'video/x-matroska',
        '.mks': 'video/x-matroska',
        '.wmv': 'video/x-ms-wmv',
        '.flv': 'video/x-flv',
        '.avi': 'video/x-msvideo',
        '.movie': 'video/x-sgi-movie'
    };
    /**
     * Helper to actually render the given resource into the provided container. Will adjust scrollbar (if provided) automatically based on loading
     * progress of the binary resource.
     */
    var ResourceViewer = (function () {
        function ResourceViewer() {
        }
        ResourceViewer.show = function (name, resource, container, scrollable) {
            // Ensure CSS class
            builder_1.$(container).addClass('monaco-resource-viewer');
            // Lookup media mime if any
            var mime;
            var ext = paths.extname(resource.toString());
            if (ext) {
                mime = mapExtToMediaMimes[ext.toLowerCase()];
            }
            if (!mime) {
                mime = mimes.MIME_BINARY;
            }
            // Show Image inline
            if (mime.indexOf('image/') >= 0) {
                builder_1.$(container)
                    .empty()
                    .style({ paddingLeft: '20px' }) // restore CSS value in case the user saw a PDF before where we remove padding
                    .img({
                    src: resource.toString() + '?' + new Date().getTime() // We really want to avoid the browser from caching this resource, so we add a fake query param that is unique
                }).on(DOM.EventType.LOAD, function () {
                    if (scrollable) {
                        scrollable.onContentsDimensions();
                    }
                });
            }
            else if (false /* PDF is currently not supported in Electron it seems */ && mime.indexOf('pdf') >= 0) {
                builder_1.$(container)
                    .empty()
                    .style({ padding: 0, margin: 0 }) // We really do not want any paddings or margins when displaying PDFs
                    .element('object')
                    .attr({
                    data: resource.toString() + '?' + new Date().getTime(),
                    width: '100%',
                    height: '100%',
                    type: mime
                });
            }
            else if (mime.indexOf('audio/') >= 0) {
                builder_1.$(container)
                    .empty()
                    .style({ paddingLeft: '20px' }) // restore CSS value in case the user saw a PDF before where we remove padding
                    .element('audio')
                    .attr({
                    src: resource.toString() + '?' + new Date().getTime(),
                    text: nls.localize('missingAudioSupport', "Sorry but playback of audio files is not supported."),
                    controls: 'controls'
                }).on(DOM.EventType.LOAD, function () {
                    if (scrollable) {
                        scrollable.onContentsDimensions();
                    }
                });
            }
            else if (mime.indexOf('video/') >= 0) {
                builder_1.$(container)
                    .empty()
                    .style({ paddingLeft: '20px' }) // restore CSS value in case the user saw a PDF before where we remove padding
                    .element('video')
                    .attr({
                    src: resource.toString() + '?' + new Date().getTime(),
                    text: nls.localize('missingVideoSupport', "Sorry but playback of video files is not supported."),
                    controls: 'controls'
                }).on(DOM.EventType.LOAD, function () {
                    if (scrollable) {
                        scrollable.onContentsDimensions();
                    }
                });
            }
            else {
                builder_1.$(container)
                    .empty()
                    .style({ paddingLeft: '20px' }) // restore CSS value in case the user saw a PDF before where we remove padding
                    .span({
                    text: nls.localize('nativeBinaryError', "The file cannot be displayed in the editor because it is either binary, very large or uses an unsupported text encoding.")
                });
                if (scrollable) {
                    scrollable.onContentsDimensions();
                }
            }
        };
        return ResourceViewer;
    }());
    exports.ResourceViewer = ResourceViewer;
});
//# sourceMappingURL=resourceViewer.js.map