/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source visit the plugins github repository
*/

var ye=Object.create;var M=Object.defineProperty;var ke=Object.getOwnPropertyDescriptor;var Ae=Object.getOwnPropertyNames,re=Object.getOwnPropertySymbols,Ee=Object.getPrototypeOf,ne=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable;var oe=(n,e,t)=>e in n?M(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,I=(n,e)=>{for(var t in e||(e={}))ne.call(e,t)&&oe(n,t,e[t]);if(re)for(var t of re(e))xe.call(e,t)&&oe(n,t,e[t]);return n};var ie=n=>M(n,"__esModule",{value:!0});var K=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),Oe=(n,e)=>{for(var t in e)M(n,t,{get:e[t],enumerable:!0})},le=(n,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Ae(e))!ne.call(n,o)&&(t||o!=="default")&&M(n,o,{get:()=>e[o],enumerable:!(r=ke(e,o))||r.enumerable});return n},S=(n,e)=>le(ie(M(n!=null?ye(Ee(n)):{},"default",!e&&n&&n.__esModule?{get:()=>n.default,enumerable:!0}:{value:n,enumerable:!0})),n),Ie=(n=>(e,t)=>n&&n.get(e)||(t=le(ie({}),e,1),n&&n.set(e,t),t))(typeof WeakMap!="undefined"?new WeakMap:0);var w=(n,e,t)=>new Promise((r,o)=>{var s=a=>{try{l(t.next(a))}catch(c){o(c)}},i=a=>{try{l(t.throw(a))}catch(c){o(c)}},l=a=>a.done?r(a.value):Promise.resolve(a.value).then(s,i);l((t=t.apply(n,e)).next())});var Y=K(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});function se(n,e){if(e)return n;throw new Error("Unhandled discriminated union member: "+JSON.stringify(n))}_.assertNever=se;_.default=se});var fe=K((de,B)=>{(function(n,e){"use strict";typeof define=="function"&&define.amd?define(e):typeof B=="object"&&B.exports?B.exports=e():n.log=e()})(de,function(){"use strict";var n=function(){},e="undefined",t=typeof window!==e&&typeof window.navigator!==e&&/Trident\/|MSIE /.test(window.navigator.userAgent),r=["trace","debug","info","warn","error"];function o(f,u){var m=f[u];if(typeof m.bind=="function")return m.bind(f);try{return Function.prototype.bind.call(m,f)}catch{return function(){return Function.prototype.apply.apply(m,[f,arguments])}}}function s(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function i(f){return f==="debug"&&(f="log"),typeof console===e?!1:f==="trace"&&t?s:console[f]!==void 0?o(console,f):console.log!==void 0?o(console,"log"):n}function l(f,u){for(var m=0;m<r.length;m++){var h=r[m];this[h]=m<f?n:this.methodFactory(h,f,u)}this.log=this.debug}function a(f,u,m){return function(){typeof console!==e&&(l.call(this,u,m),this[f].apply(this,arguments))}}function c(f,u,m){return i(f)||a.apply(this,arguments)}function F(f,u,m){var h=this,ee;u=u??"WARN";var P="loglevel";typeof f=="string"?P+=":"+f:typeof f=="symbol"&&(P=void 0);function Ce(g){var x=(r[g]||"silent").toUpperCase();if(!(typeof window===e||!P)){try{window.localStorage[P]=x;return}catch{}try{window.document.cookie=encodeURIComponent(P)+"="+x+";"}catch{}}}function te(){var g;if(!(typeof window===e||!P)){try{g=window.localStorage[P]}catch{}if(typeof g===e)try{var x=window.document.cookie,V=x.indexOf(encodeURIComponent(P)+"=");V!==-1&&(g=/^([^;]+)/.exec(x.slice(V))[1])}catch{}return h.levels[g]===void 0&&(g=void 0),g}}function Pe(){if(!(typeof window===e||!P)){try{window.localStorage.removeItem(P);return}catch{}try{window.document.cookie=encodeURIComponent(P)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch{}}}h.name=f,h.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},h.methodFactory=m||c,h.getLevel=function(){return ee},h.setLevel=function(g,x){if(typeof g=="string"&&h.levels[g.toUpperCase()]!==void 0&&(g=h.levels[g.toUpperCase()]),typeof g=="number"&&g>=0&&g<=h.levels.SILENT){if(ee=g,x!==!1&&Ce(g),l.call(h,g,f),typeof console===e&&g<h.levels.SILENT)return"No console available for logging"}else throw"log.setLevel() called with invalid level: "+g},h.setDefaultLevel=function(g){u=g,te()||h.setLevel(g,!1)},h.resetLevel=function(){h.setLevel(u,!1),Pe()},h.enableAll=function(g){h.setLevel(h.levels.TRACE,g)},h.disableAll=function(g){h.setLevel(h.levels.SILENT,g)};var J=te();J==null&&(J=u),h.setLevel(J,!1)}var d=new F,N={};d.getLogger=function(u){if(typeof u!="symbol"&&typeof u!="string"||u==="")throw new TypeError("You must supply a name when creating a logger.");var m=N[u];return m||(m=N[u]=new F(u,d.getLevel(),d.methodFactory)),m};var b=typeof window!==e?window.log:void 0;return d.noConflict=function(){return typeof window!==e&&window.log===d&&(window.log=b),d},d.getLoggers=function(){return N},d.default=d,d})});var W=K((Ge,Fe)=>{"use strict";function k(n){if(typeof n!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(n))}function pe(n,e){for(var t="",r=0,o=-1,s=0,i,l=0;l<=n.length;++l){if(l<n.length)i=n.charCodeAt(l);else{if(i===47)break;i=47}if(i===47){if(!(o===l-1||s===1))if(o!==l-1&&s===2){if(t.length<2||r!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){var a=t.lastIndexOf("/");if(a!==t.length-1){a===-1?(t="",r=0):(t=t.slice(0,a),r=t.length-1-t.lastIndexOf("/")),o=l,s=0;continue}}else if(t.length===2||t.length===1){t="",r=0,o=l,s=0;continue}}e&&(t.length>0?t+="/..":t="..",r=2)}else t.length>0?t+="/"+n.slice(o+1,l):t=n.slice(o+1,l),r=l-o-1;o=l,s=0}else i===46&&s!==-1?++s:s=-1}return t}function Me(n,e){var t=e.dir||e.root,r=e.base||(e.name||"")+(e.ext||"");return t?t===e.root?t+r:t+n+r:r}var D={resolve:function(){for(var e="",t=!1,r,o=arguments.length-1;o>=-1&&!t;o--){var s;o>=0?s=arguments[o]:(r===void 0&&(r=process.cwd()),s=r),k(s),s.length!==0&&(e=s+"/"+e,t=s.charCodeAt(0)===47)}return e=pe(e,!t),t?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(k(e),e.length===0)return".";var t=e.charCodeAt(0)===47,r=e.charCodeAt(e.length-1)===47;return e=pe(e,!t),e.length===0&&!t&&(e="."),e.length>0&&r&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return k(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,t=0;t<arguments.length;++t){var r=arguments[t];k(r),r.length>0&&(e===void 0?e=r:e+="/"+r)}return e===void 0?".":D.normalize(e)},relative:function(e,t){if(k(e),k(t),e===t||(e=D.resolve(e),t=D.resolve(t),e===t))return"";for(var r=1;r<e.length&&e.charCodeAt(r)===47;++r);for(var o=e.length,s=o-r,i=1;i<t.length&&t.charCodeAt(i)===47;++i);for(var l=t.length,a=l-i,c=s<a?s:a,F=-1,d=0;d<=c;++d){if(d===c){if(a>c){if(t.charCodeAt(i+d)===47)return t.slice(i+d+1);if(d===0)return t.slice(i+d)}else s>c&&(e.charCodeAt(r+d)===47?F=d:d===0&&(F=0));break}var N=e.charCodeAt(r+d),b=t.charCodeAt(i+d);if(N!==b)break;N===47&&(F=d)}var f="";for(d=r+F+1;d<=o;++d)(d===o||e.charCodeAt(d)===47)&&(f.length===0?f+="..":f+="/..");return f.length>0?f+t.slice(i+F):(i+=F,t.charCodeAt(i)===47&&++i,t.slice(i))},_makeLong:function(e){return e},dirname:function(e){if(k(e),e.length===0)return".";for(var t=e.charCodeAt(0),r=t===47,o=-1,s=!0,i=e.length-1;i>=1;--i)if(t=e.charCodeAt(i),t===47){if(!s){o=i;break}}else s=!1;return o===-1?r?"/":".":r&&o===1?"//":e.slice(0,o)},basename:function(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');k(e);var r=0,o=-1,s=!0,i;if(t!==void 0&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var l=t.length-1,a=-1;for(i=e.length-1;i>=0;--i){var c=e.charCodeAt(i);if(c===47){if(!s){r=i+1;break}}else a===-1&&(s=!1,a=i+1),l>=0&&(c===t.charCodeAt(l)?--l===-1&&(o=i):(l=-1,o=a))}return r===o?o=a:o===-1&&(o=e.length),e.slice(r,o)}else{for(i=e.length-1;i>=0;--i)if(e.charCodeAt(i)===47){if(!s){r=i+1;break}}else o===-1&&(s=!1,o=i+1);return o===-1?"":e.slice(r,o)}},extname:function(e){k(e);for(var t=-1,r=0,o=-1,s=!0,i=0,l=e.length-1;l>=0;--l){var a=e.charCodeAt(l);if(a===47){if(!s){r=l+1;break}continue}o===-1&&(s=!1,o=l+1),a===46?t===-1?t=l:i!==1&&(i=1):t!==-1&&(i=-1)}return t===-1||o===-1||i===0||i===1&&t===o-1&&t===r+1?"":e.slice(t,o)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return Me("/",e)},parse:function(e){k(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return t;var r=e.charCodeAt(0),o=r===47,s;o?(t.root="/",s=1):s=0;for(var i=-1,l=0,a=-1,c=!0,F=e.length-1,d=0;F>=s;--F){if(r=e.charCodeAt(F),r===47){if(!c){l=F+1;break}continue}a===-1&&(c=!1,a=F+1),r===46?i===-1?i=F:d!==1&&(d=1):i!==-1&&(d=-1)}return i===-1||a===-1||d===0||d===1&&i===a-1&&i===l+1?a!==-1&&(l===0&&o?t.base=t.name=e.slice(1,a):t.base=t.name=e.slice(l,a)):(l===0&&o?(t.name=e.slice(1,i),t.base=e.slice(1,a)):(t.name=e.slice(l,i),t.base=e.slice(l,a)),t.ext=e.slice(i,a)),l>0?t.dir=e.slice(0,l-1):o&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};D.posix=D;Fe.exports=D});var Ve={};Oe(Ve,{default:()=>Z});var Te=S(Y(),1);function ae(n,e){let t=Object.keys(e).map(r=>Se(n,r,e[r]));return t.length===1?t[0]:function(){t.forEach(r=>r())}}function Se(n,e,t){let r=n[e],o=n.hasOwnProperty(e),s=t(r);return r&&Object.setPrototypeOf(s,r),Object.setPrototypeOf(i,s),n[e]=i,l;function i(...a){return s===r&&n[e]===i&&l(),s.apply(this,a)}function l(){n[e]===i&&(o?n[e]=r:delete n[e]),s!==r&&(s=r,Object.setPrototypeOf(i,r||Function))}}var be=require("obsidian");var ue=S(fe(),1),De=ue.default.getLogger("folder-note-core"),v=De;var A=require("obsidian");var E=(r=>(r[r.Index=0]="Index",r[r.Inside=1]="Inside",r[r.Outside=2]="Outside",r))(E||{}),ce=n=>({get renderCoreSettings(){return n.settingTab.renderCoreSettings},get renderLogLevel(){return n.settingTab.setLogLevel},importSettings:e=>{if(e.folderNotePref!==void 0){switch(e.folderNotePref){case 0:e.folderNotePref=0;break;case 1:e.folderNotePref=1;break;case 2:e.folderNotePref=2;break;default:break}let t=Object.fromEntries(Object.entries(e).filter(([r,o])=>o!==void 0));n.settings=I(I({},n.settings),t),n.saveSettings()}},get getNewFolderNote(){return n.getNewFolderNote},get getFolderFromNote(){return n.resolver.getFolderFromNote},get getFolderPath(){return n.resolver.getFolderPath},get getFolderNote(){return n.resolver.getFolderNote},get getFolderNotePath(){return n.resolver.getFolderNotePath},get DeleteLinkedFolder(){return n.resolver.DeleteLinkedFolder},get LinkToParentFolder(){return n.resolver.LinkToParentFolder},get DeleteNoteAndLinkedFolder(){return n.resolver.DeleteNoteAndLinkedFolder},get createFolderForNote(){return n.resolver.createFolderForNote},get DeleteFolderNote(){return n.resolver.DeleteFolderNote},get CreateFolderNote(){return n.resolver.CreateFolderNote},get OpenFolderNote(){return n.resolver.OpenFolderNote}});var ge=n=>{let{createFolderForNote:e,createFolderForNoteCheck:t,LinkToParentFolder:r,DeleteLinkedFolder:o,DeleteNoteAndLinkedFolder:s}=n.resolver;n.addCommand({id:"make-doc-folder-note",name:"Make current document folder note",checkCallback:i=>{let l=n.app.workspace.getActiveViewOfType(A.MarkdownView);if(i)return!!l&&t(l.file);l&&e(l.file)},hotkeys:[]}),n.addCommand({id:"link-to-parent-folder",name:"Link to Parent Folder",checkCallback:i=>{let l=n.app.workspace.getActiveViewOfType(A.MarkdownView);return!!l&&r(l.file,i)},hotkeys:[]}),n.addCommand({id:"delete-linked-folder",name:"Delete linked folder",checkCallback:i=>{let l=n.app.workspace.getActiveViewOfType(A.MarkdownView);return!!l&&o(l.file,i)},hotkeys:[]}),n.addCommand({id:"delete-with-linked-folder",name:"Delete note and linked folder",checkCallback:i=>{let l=n.app.workspace.getActiveViewOfType(A.MarkdownView);return!!l&&s(l.file,i)},hotkeys:[]}),n.registerEvent(n.app.workspace.on("file-menu",(i,l,a)=>w(void 0,null,function*(){l instanceof A.TFile&&l.extension==="md"&&(r(l,!0)&&i.addItem(c=>c.setIcon("link").setTitle("Link to Parent Folder").onClick(()=>r(l))),(yield e(l,!0))&&i.addItem(c=>c.setIcon("create-new").setTitle("Make Doc Folder Note").onClick(()=>{e(l),n.app.workspace.openLinkText(l.path,"",!1)})),a!=="link-context-menu"&&s(l,!0)&&i.addItem(c=>c.setIcon("trash").setTitle("Delete Note and Linked Folder").onClick(()=>s(l))))})))},he=n=>{let{OpenFolderNote:e,DeleteFolderNote:t,CreateFolderNote:r,DeleteNoteAndLinkedFolder:o}=n.resolver;n.registerEvent(n.app.workspace.on("file-menu",(s,i,l)=>{i instanceof A.TFolder&&(e(i,!0)&&s.addItem(a=>a.setIcon("enter").setTitle("Open Folder Note").onClick(()=>e(i))),t(i,!0)&&s.addItem(a=>a.setIcon("trash").setTitle("Delete Folder Note").onClick(()=>t(i))),n.settings.folderNotePref===2&&n.settings.deleteOutsideNoteWithFolder===!1&&o(i,!0)&&s.addItem(a=>a.setIcon("trash").setTitle("Delete Folder and Folder Note").onClick(()=>o(i))),r(i,!0)&&s.addItem(a=>a.setIcon("create-new").setTitle("Create Folder Note").onClick(()=>r(i))))}))};var $=S(Y(),1),y=require("obsidian"),L=S(W(),1);var H=require("obsidian"),U=S(W(),1);var C=n=>typeof n=="string"?n.endsWith(".md"):n.extension==="md",me=(n,e)=>{let t=R(n.path);return t&&(0,U.join)(t,e)},R=n=>{if(n==="/")return null;let e=(0,U.dirname)(n);return e==="."?"/":e},z=(n,e,t)=>{if(n instanceof H.TFile)e(n);else if(n instanceof H.TFolder)t(n);else throw v.error("unexpected TAbstractFile type",n),new Error("unexpected TAbstractFile type")};var j=class{constructor(e){this.getFolderFromNote=(e,t)=>{if(!C(e))return null;let r=this.getFolderPath(e,!1,t);if(!r)return null;let o=this.vault.getAbstractFileByPath(r);return o&&o instanceof y.TFolder?o:null};this.getFolderPath=(e,t=!1,r)=>{var l,a;if(r===void 0&&(r=this.settings.folderNotePref),!C(e))return v.info("getFolderPath(%o): given file not markdown",e),null;let o,s;if(e instanceof y.TFile?(s=e.basename,o=(l=R(e.path))!=null?l:""):(s=(0,L.basename)(e).slice(0,-3),o=(a=R(e))!=null?a:""),!o)return v.info("getFolderPath(%o): no folder note for root dir",e),null;let i=()=>o==="/"?s:(0,L.join)(o,s);switch(r){case 0:return t?i():s===this.settings.indexName?o:(v.info("getFolderPath(%o): note name invaild",e),null);case 1:return t?i():s===(0,L.basename)(o)?o:(v.info("getFolderPath(%o): note name invaild",e),null);case 2:{let c=i();return t||s===(0,L.basename)(c)?c:(v.info("getFolderPath(%o): note name invaild",e),null)}default:(0,$.default)(r)}};this.getFolderNote=(e,t)=>this.findFolderNote(this.getFolderNotePath(e,t));this.findFolderNote=e=>{if(!e)return null;let t=this.vault.getAbstractFileByPath(e.path);return t&&t instanceof y.TFile?t:null};this.getFolderNotePath=(e,t)=>{t===void 0&&(t=this.settings.folderNotePref);let r=typeof e=="string"?e:e.path,o=R(r);if(!o)return null;let{indexName:s}=this.settings,i,l;switch(t){case 0:l=s,i=r;break;case 1:l=(0,L.basename)(r),i=r;break;case 2:l=(0,L.basename)(r),i=o;break;default:(0,$.default)(t)}return{dir:i,name:l+".md",path:i==="/"?l+".md":(0,L.join)(i,l+".md")}};this.DeleteLinkedFolder=(e,t=!1)=>{if(!C(e))return!1;let r=this.getFolderFromNote(e);return r&&!t&&this.vault.delete(r,!0),!!r};this.LinkToParentFolder=(e,t=!1)=>{if(!C(e))return!1;if(e.parent){let r=this.getFolderNotePath(e.parent),o=r&&!this.getFolderNote(e.parent);if(o&&!t){let{path:s}=r;this.plugin.app.fileManager.renameFile(e,s)}return!!o}else return!1};this.DeleteNoteAndLinkedFolder=(e,t=!1)=>{let r,o;if(e instanceof y.TFile){if(!C(e))return!1;r=e,o=this.getFolderFromNote(e)}else r=this.getFolderNote(e),o=e;return r&&o&&!t&&new ve(this.plugin,r,o).open(),!!(r&&o)};this.createFolderForNoteCheck=e=>{let t=this._createFolderForNote(e);if(!t)return!1;let{folderExist:r,newFolderPath:o}=t;return!!(!r&&o)};this._createFolderForNote=e=>{if(!C(e))return null;let t=this.getFolderPath(e,!1);if(t&&this.vault.getAbstractFileByPath(t))return v.info("createFolderForNote(%o): already folder note",e,e.path),null;let r=this.getFolderPath(e,!0),o=r&&this.vault.getAbstractFileByPath(r);return{newFolderPath:r,folderExist:o}};this.createFolderForNote=(e,t=!1)=>w(this,null,function*(){let r=this._createFolderForNote(e);if(!r)return!1;let{newFolderPath:o,folderExist:s}=r;if(s)return v.info("createFolderForNote(%o): target folder to create already exists",e,e.path),t||new y.Notice("Target folder to create already exists"),!1;if(!o)v.info("createFolderForNote(%o): no vaild linked folder path for %s",e,e.path),t||new y.Notice("No vaild linked folder path for: "+e.path);else if(!t){yield this.vault.createFolder(o);let i;switch(this.settings.folderNotePref){case 0:i=(0,L.join)(o,this.settings.indexName+".md");break;case 1:i=(0,L.join)(o,e.name);break;case 2:i=null;break;default:(0,$.default)(this.settings.folderNotePref)}i&&(yield this.plugin.app.fileManager.renameFile(e,i))}return!!(!s&&o)});this.OpenFolderNote=(e,t=!1,r)=>{let o=this.getFolderNote(e);return o&&!t&&this.plugin.app.workspace.openLinkText(o.path,"",r==null?void 0:r.newLeaf,r==null?void 0:r.openViewState),!!o};this.DeleteFolderNote=(e,t=!1)=>{let r=this.getFolderNote(e);return r&&!t&&this.vault.delete(r),!!r};this.CreateFolderNote=(e,t=!1)=>{let r,o;return(r=!this.getFolderNote(e)&&(o=this.getFolderNotePath(e)))&&!t&&this.vault.create(o.path,this.plugin.getNewFolderNote(e)),!!r};this.plugin=e}get settings(){return this.plugin.settings}get vault(){return this.plugin.app.vault}},ve=class extends y.Modal{constructor(e,t,r){super(e.app);this.plugin=e,this.target=t,this.targetFolder=r}get settings(){return this.plugin.settings}deleteFolder(){let{contentEl:e}=this;e.createEl("p",{text:"Warning: the entire folder and its content will be removed",cls:"mod-warning"});let t=this.targetFolder.children.map(o=>o.name);e.createEl("p",{text:t.length>5?t.slice(0,5).join(", ")+"...":t.join(", ")}),e.createEl("p",{text:"Continue?",cls:"mod-warning"});let r=e.createDiv({cls:"modal-button-container"});r.createEl("button",{text:"Yes",cls:"mod-warning"},o=>o.onClickEvent(()=>{this.app.vault.delete(this.targetFolder,!0),this.app.vault.delete(this.target),this.close()})),r.createEl("button",{text:"No"},o=>o.onClickEvent(()=>{this.close()}))}onOpen(){this.containerEl.addClass("warn"),this.deleteFolder()}onClose(){let{contentEl:e}=this;e.empty()}};var T=require("obsidian"),O=S(W(),1);var G=class{constructor(e){this.on=(...e)=>this.plugin.app.vault.on(...e);this.delete=(...e)=>this.plugin.app.vault.delete(...e);this.rename=(...e)=>this.plugin.app.fileManager.renameFile(...e);this.registerEvent=()=>{this.plugin.registerEvent(this.on("create",this.onChange)),this.plugin.registerEvent(this.on("rename",this.onChange)),this.plugin.registerEvent(this.on("delete",this.onDelete))};this.onChange=(e,t)=>{var a,c,F;let{getFolderNote:r,getFolderFromNote:o,getFolderNotePath:s}=this.finder;function i(d){return d instanceof T.TFolder?t?r(t):null:d instanceof T.TFile&&t&&C(t)?o(t):null}function l(d){return d instanceof T.TFolder?r(d):d instanceof T.TFile?o(d):null}if(t&&e instanceof T.TFile&&C(t)!==C(e)){let d=i(e);if(d)this.plugin.trigger("folder-note:delete",e,d);else{let N=o(e);N&&this.plugin.trigger("folder-note:create",e,N)}}else{let d=!1,N;z(e,u=>{N=l(u),N&&(d=!0,this.plugin.trigger("folder-note:create",u,N))},u=>{N=l(u),N&&(d=!0,this.plugin.trigger("folder-note:create",N,u))});let b=i(e);if(!b)return;let f=e instanceof T.TFolder?(c=(a=s(e))==null?void 0:a.path)!=null?c:"":e instanceof T.TFile&&(F=me(b,e.basename))!=null?F:"";if(this.shouldRename(e,t))if(!d&&f){this.rename(b,f),z(e,u=>this.plugin.trigger("folder-note:rename",[u,t],[b,f]),u=>this.plugin.trigger("folder-note:rename",[b,f],[u,t]));return}else{let u=b instanceof T.TFile?"folder note":"linked folder",m=`Failed to sync name of ${u}: `,h=d?`${u} ${(0,O.basename)(f)} already exists`:"check console for more details";new T.Notice(m+h)}z(e,u=>this.plugin.trigger("folder-note:delete",u,b),u=>this.plugin.trigger("folder-note:delete",b,u))}};this.onDelete=e=>{let{getFolderNote:t,getFolderFromNote:r}=this.finder;if(e instanceof T.TFolder){let o=t(e);if(!(this.settings.folderNotePref===2&&o))return;this.settings.deleteOutsideNoteWithFolder?this.delete(o):this.plugin.trigger("folder-note:delete",o,e)}else if(e instanceof T.TFile&&C(e)){let o=r(e);o&&this.plugin.trigger("folder-note:delete",e,o)}};this.plugin=e}get settings(){return this.plugin.settings}get finder(){return this.plugin.resolver}shouldRename(e,t){if(!this.settings.autoRename||!t)return!1;let r=this.settings.folderNotePref!==0&&(0,O.dirname)(e.path)===(0,O.dirname)(t),o=e instanceof T.TFolder&&this.settings.folderNotePref===2&&(0,O.dirname)(e.path)!==(0,O.dirname)(t);return r||o}};var p=require("obsidian");var Ne={folderNotePref:1,deleteOutsideNoteWithFolder:!1,indexName:"_about_",autoRename:!0,folderNoteTemplate:"# {{FOLDER_NAME}}",logLevel:4},q={[0]:"Inside Folder, Index File",[1]:"Inside Folder, With Same Name",[2]:"Outside Folder, With Same Name"},X=class extends p.PluginSettingTab{constructor(e){super(e.app,e);this.plugin=e;this.renderCoreSettings=e=>{this.setStrategy(e),this.plugin.settings.folderNotePref===0?this.setIndexName(e):this.plugin.settings.folderNotePref===2&&this.setDeleteWithFolder(e),this.setTemplate(e),this.plugin.settings.folderNotePref!==0&&this.setAutoRename(e)};this.setLogLevel=e=>{new p.Setting(e).setName("Log Level of folder-note-core").setDesc("Change this options if debug is required").addDropdown(t=>t.then(r=>Object.entries(v.levels).forEach(([o,s])=>r.addOption(s.toString(),o))).setValue(v.getLevel().toString()).onChange(r=>w(this,null,function*(){let o=+r;v.setLevel(o),this.plugin.settings.logLevel=o,yield this.plugin.saveSettings()})))};this.setDeleteWithFolder=e=>{new p.Setting(e).setName("Delete Outside Note with Folder").setDesc(createFragment(t=>{t.appendText("Delete folder note outside when folder is deleted"),t.createDiv({text:"Warning: The note will be deleted when the folder is moved outside of vault",cls:"mod-warning"})})).addToggle(t=>t.setValue(this.plugin.settings.deleteOutsideNoteWithFolder).onChange(r=>w(this,null,function*(){this.plugin.settings.deleteOutsideNoteWithFolder=r,yield this.plugin.saveSettings()})))};this.setStrategy=e=>{new p.Setting(e).setName("Note File Storage Strategy").setDesc(createFragment(t=>{t.appendText("Select how you would like the folder note to be stored"),t.createEl("br"),t.createEl("a",{href:"https://github.com/aidenlx/alx-folder-note/wiki/folder-note-pref",text:"Check here"}),t.appendText(" for more detail for pros and cons for different strategies")})).addDropdown(t=>{t.addOptions(q).setValue(this.plugin.settings.folderNotePref.toString()).onChange(r=>w(this,null,function*(){this.plugin.settings.folderNotePref=+r,this.plugin.trigger("folder-note:cfg-changed"),yield this.plugin.saveSettings()}))}),new p.Setting(e).setName("Switch Strategy").setDesc(createFragment(t=>{t.appendText("Batch convert existing folder notes to use new storage strategy"),t.createDiv({text:"Warning: This function is experimental and dangerous, make sure to fully backup the vault before the conversion",cls:"mod-warning"})})).addButton(t=>t.setTooltip("Open Dialog").setIcon("popup-open").setCta().onClick(()=>new we(this.plugin).open()))};this.setIndexName=e=>{new p.Setting(e).setName("Name for Index File").setDesc("Set the note name to be recognized as index file for folders").addText(t=>{let r=o=>w(this,null,function*(){this.plugin.settings.indexName=o,this.plugin.trigger("folder-note:cfg-changed"),yield this.plugin.saveSettings()});t.setValue(this.plugin.settings.indexName).onChange((0,p.debounce)(r,500,!0))})};this.setTemplate=e=>{new p.Setting(e).setName("Folder Note Template").setDesc(createFragment(t=>{t.appendText("The template used to generate new folder note."),t.appendChild(document.createElement("br")),t.appendText("Supported placeholders:"),t.appendChild(document.createElement("br")),t.appendText("{{FOLDER_NAME}} {{FOLDER_PATH}}")})).addTextArea(t=>{let r=o=>w(this,null,function*(){this.plugin.settings.folderNoteTemplate=o,yield this.plugin.saveSettings()});t.setValue(this.plugin.settings.folderNoteTemplate).onChange((0,p.debounce)(r,500,!0)),t.inputEl.rows=8,t.inputEl.cols=30})};this.setAutoRename=e=>{new p.Setting(e).setName("Auto Sync").setDesc("Keep name and location of folder note and folder in sync").addToggle(t=>{t.setValue(this.plugin.settings.autoRename),t.onChange(r=>w(this,null,function*(){this.plugin.settings.autoRename=r,yield this.plugin.saveSettings()}))})}}display(){let{containerEl:e}=this;e.empty(),this.renderCoreSettings(e)}},we=class extends p.Modal{constructor(e){super(e.app);this.plugin=e;this.Convert=(e=!1)=>w(this,null,function*(){let{From:t,To:r}=this;if(this.clear(),t===null||r===null)new p.Notice("Please select the strategies to convert from/to first");else if(t===r)new p.Notice("Convert between same strategy, skipping...");else{let{getFolderNote:o,getFolderNotePath:s}=this.plugin.resolver,i=this.app.vault.getAllLoadedFiles().filter(a=>a instanceof p.TFolder&&!a.isRoot()).map(a=>{let c=o(a,t),F=c?s(a,r):null;return c&&F?[c,F]:null}),l=!1;for(let a of i){if(!a)continue;let[c,F]=a;(yield this.app.vault.exists(F.path))?(l||(l=!0),this.log(`Unable to move file ${c.path}: file exist in ${F.path}`)):e||this.app.fileManager.renameFile(c,F.path)}l||(e?this.log("Check complete, no conflict found"):this.log("Batch convert complete"))}});this.fromOptsEl=new p.DropdownComponent(this.titleEl.createDiv({text:"From:  "})).addOptions(q),this.toOptsEl=new p.DropdownComponent(this.titleEl.createDiv({text:"To:  "})).addOptions(q),this.outputEl=new p.TextAreaComponent(this.contentEl).setValue("Hello world").setDisabled(!0).then(t=>{t.inputEl.style.width="100%",t.inputEl.rows=10}),this.buttonContainerEl=this.modalEl.createDiv({cls:"modal-button-container"}),this.addButton(t=>t.setButtonText("Check Conflicts").onClick(()=>this.Convert(!0))),this.addButton(t=>t.setButtonText("Convert").setWarning().onClick(()=>this.Convert())),this.addButton(t=>t.setButtonText("Cancel").onClick(this.close.bind(this)))}addButton(e){let t=new p.ButtonComponent(this.buttonContainerEl);return e(t),t}log(e){this.outputEl.setValue(this.outputEl.getValue()+`
`+e)}clear(){this.outputEl.setValue("")}get From(){let e=this.fromOptsEl.getValue();return e&&E[+e]?+e:null}get To(){let e=this.toOptsEl.getValue();return e&&E[+e]?+e:null}onOpen(){this.clear();let e=this.plugin.settings.folderNotePref.toString();this.fromOptsEl.setValue(e),this.toOptsEl.setValue(e)}};var Re="alx-folder-note",Q="FolderNoteAPIv0",Z=class extends be.Plugin{constructor(e,t){super(e,t);this.settings=Ne;this.vaultHandler=new G(this);this.resolver=new j(this);this.settingTab=new X(this);this.getNewFolderNote=e=>this.settings.folderNoteTemplate.replace(/{{FOLDER_NAME}}/g,e.name).replace(/{{FOLDER_PATH}}/g,e.path);v.setDefaultLevel("ERROR");let r=this;this.api=ce(r),(window[Q]=this.api)&&this.register(()=>delete window[Q]),this.trigger("folder-note:api-ready",this.api),this.register(ae(e.fileManager,{getNewFileParent(o){return function(s){if(e.vault.getConfig("newFileLocation")==="current"){let i=r.settings.folderNotePref;switch(i){case 0:case 1:break;case 2:{let l=r.resolver.getFolderFromNote(s);if(l)return l;break}default:(0,Te.default)(i)}}return o.call(e.fileManager,s)}}}))}onload(){return w(this,null,function*(){v.info("loading folder-note-core"),yield this.loadSettings(),this.app.plugins.enabledPlugins.has(Re)||this.addSettingTab(this.settingTab),ge(this),he(this),this.vaultHandler.registerEvent()})}trigger(...e){let[t,...r]=e;this.app.vault.trigger(t,...r)}loadSettings(){return w(this,null,function*(){this.settings=I(I({},this.settings),yield this.loadData()),v.setLevel(this.settings.logLevel)})}saveSettings(){return w(this,null,function*(){yield this.saveData(this.settings)})}};module.exports=Ie(Ve);
