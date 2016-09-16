/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","fs","vs/base/common/platform","vs/platform/product","vs/platform/package","vs/base/parts/ipc/node/ipc.net","vs/base/common/winjs.base","vs/platform/instantiation/common/serviceCollection","vs/platform/instantiation/common/descriptors","vs/platform/instantiation/common/instantiationService","vs/platform/environment/common/environment","vs/platform/environment/node/environmentService","vs/platform/event/common/event","vs/platform/event/common/eventService","vs/platform/extensionManagement/common/extensionManagementIpc","vs/platform/extensionManagement/common/extensionManagement","vs/platform/extensionManagement/node/extensionManagementService","vs/platform/configuration/common/configuration","vs/platform/configuration/node/nodeConfigurationService","vs/platform/telemetry/common/telemetry","vs/platform/telemetry/node/commonProperties","vs/platform/telemetry/common/telemetryIpc","vs/platform/telemetry/common/telemetryService","vs/platform/telemetry/node/appInsightsAppender"],function(e,n,t,o,r,i,s,a,c,m,p,v,l,f,u,d,g,S,y,h,E,w,C,x,I){"use strict";function D(e){e&&console.error(e.stack||e),process.exit(e?1:0)}function P(e){setInterval(function(){try{process.kill(e,0)}catch(n){process.exit()}},5e3)}function T(e){var n=new c.ServiceCollection;n.set(f.IEventService,new m.SyncDescriptor(u.EventService)),n.set(v.IEnvironmentService,new m.SyncDescriptor(l.EnvironmentService)),n.set(g.IExtensionManagementService,new m.SyncDescriptor(S.ExtensionManagementService)),n.set(y.IConfigurationService,new m.SyncDescriptor(h.NodeConfigurationService));var t=new p.InstantiationService(n);t.invokeFunction(function(n){var o=[];r["default"].aiConfig&&r["default"].aiConfig.key&&o.push(new I.AppInsightsAppender(M,null,r["default"].aiConfig.key)),r["default"].aiConfig&&r["default"].aiConfig.asimovKey&&o.push(new I.AppInsightsAppender(M,null,r["default"].aiConfig.asimovKey)),process.once("exit",function(){return o.forEach(function(e){return e.dispose()})});var s=E.combinedAppender.apply(void 0,o);e.registerChannel("telemetryAppender",new C.TelemetryAppenderChannel(s));var a=new c.ServiceCollection,p=n.get(v.IEnvironmentService),l=p.appRoot,f=p.extensionsPath,u=p.extensionDevelopmentPath,S=p.isBuilt;if(S&&!u&&r["default"].enableTelemetry){var y={appender:s,commonProperties:w.resolveCommonProperties(r["default"].commit,i["default"].version),piiPaths:[l,f]};a.set(E.ITelemetryService,new m.SyncDescriptor(x.TelemetryService,y))}else a.set(E.ITelemetryService,E.NullTelemetryService);var h=t.createChild(a);h.invokeFunction(function(n){var t=n.get(g.IExtensionManagementService),o=new d.ExtensionManagementChannel(t);e.registerChannel("extensions",o),setTimeout(function(){return t.removeDeprecatedExtensions()},5e3)})})}function k(e){function n(r){return s.serve(e).then(null,function(i){return!r||o.isWindows||"EADDRINUSE"!==i.code?a.TPromise.wrapError(i):s.connect(e).then(function(e){return e.dispose(),a.TPromise.wrapError(new Error("There is an instance already running."))},function(o){try{t.unlinkSync(e)}catch(r){return a.TPromise.wrapError(new Error("Error deleting the shared ipc hook."))}return n(!1)})})}return n(!0)}function A(){return new a.TPromise(function(e,n){process.once("message",e),process.once("error",n),process.send("hello")})}var M="monacoworkbench";a.TPromise.join([k(process.env.VSCODE_SHARED_IPC_HOOK),A()]).then(function(e){return T(e[0])}).then(function(){return P(process.env.VSCODE_PID)}).done(null,D)});