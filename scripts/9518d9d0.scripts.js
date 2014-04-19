window.Modernizr=function(a,b,c){function d(a){o.cssText=a}function e(a,b){return typeof a===b}var f,g,h,i="2.7.2",j={},k=!0,l=b.documentElement,m="modernizr",n=b.createElement(m),o=n.style,p=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),q={},r=[],s=r.slice,t=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,n=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:m+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',m,'">',a,"</style>"].join(""),j.id=m,(k?j:n).innerHTML+=f,n.appendChild(j),k||(n.style.background="",n.style.overflow="hidden",i=l.style.overflow,l.style.overflow="hidden",l.appendChild(n)),g=c(j,a),k?j.parentNode.removeChild(j):(n.parentNode.removeChild(n),l.style.overflow=i),!!g},u={}.hasOwnProperty;h=e(u,"undefined")||e(u.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return u.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=s.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(s.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(s.call(arguments)))};return d}),q.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},q.webgl=function(){return!!a.WebGLRenderingContext},q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",p.join("touch-enabled),("),m,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c};for(var v in q)h(q,v)&&(g=v.toLowerCase(),j[g]=q[v](),r.push((j[g]?"":"no-")+g));return j.addTest=function(a,b){if("object"==typeof a)for(var d in a)h(a,d)&&j.addTest(d,a[d]);else{if(a=a.toLowerCase(),j[a]!==c)return j;b="function"==typeof b?b():b,"undefined"!=typeof k&&k&&(l.className+=" "+(b?"":"no-")+a),j[a]=b}return j},d(""),n=f=null,j._version=i,j._prefixes=p,j.testStyles=t,l.className=l.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(k?" js "+r.join(" "):""),j}(this,this.document),angular.module("depthyApp",["ngSanitize","ga"]),angular.module("depthyApp").controller("MainCtrl",["$scope","ga",function(a,b){var c=this;a.Modernizr=window.Modernizr,this.handleCompoundFile=function(d){var e=function(c){a.imageSource=!1,a.depthSource=!1,a.metadata={},a.compoundError=c,b("send","event","image","error",c)};if("image/jpeg"!==d.type)return void e("Only JPEGs are supported!");var f=new FileReader;f.onload=function(b){a.compoundError="";try{var d=c.parseCompoundImage(b.target.result);a.imageSource=d.imageUri,a.depthSource=d.depthUri,delete d.imageData,delete d.depthData,delete d.imageUri,delete d.depthUri,a.metaData=d}catch(b){e(b)}a.$apply()},f.readAsBinaryString(d);var g=new FileReader;g.onload=function(b){console.log(b),a.compoundSource=b.target.result,a.$apply()},g.readAsDataURL(d)},this.parseCompoundImage=function(a){var c=(a.match(/xmpNote:HasExtendedXMP="(.+?)"/i)||[])[1];c&&(a=a.replace(new RegExp("[\\s\\S]{4}http:\\/\\/ns\\.adobe\\.com\\/xmp\\/extension\\/[\\s\\S]"+c+"[\\s\\S]{8}","g"),""));var d=a.match(/<x:xmpmeta [\s\S]+?<\/x:xmpmeta>/g),e={};if(!d)throw"No XMP metadata found! Did you make this photo using Google Camera?";if(d=d.join("\n",d),e.imageMime=(d.match(/GImage:Mime="(.+?)"/i)||[])[1],e.imageData=(d.match(/GImage:Data="(.+?)"/i)||[])[1],e.depthMime=(d.match(/GDepth:Mime="(.+?)"/i)||[])[1],e.depthData=(d.match(/GDepth:Data="(.+?)"/i)||[])[1],e.imageMime&&e.imageData&&(e.imageUri="data:"+e.imageMime+";base64,"+e.imageData),e.depthMime&&e.depthData&&(e.depthUri="data:"+e.depthMime+";base64,"+e.depthData),!e.depthUri)throw"No depth map found! Did you make this photo using Lens Blur mode?";return e.focalDistance=(d.match(/GFocus:FocalDistance="(.+?)"/i)||[])[1],b("send","event","image","parsed"),e},a.$watch("compoundFiles",function(a){a&&a.length&&c.handleCompoundFile(a[0])})}]),angular.module("depthyApp").directive("fileselect",["$parse",function(a){return{restrict:"A",scope:!0,link:function(b,c,d){function e(c){b.$broadcast("fileselect",c),console.log(d.fileselect),d.fileselect&&a(d.fileselect).assign(b,c)}var f=document.createElement("input");f.type="file";var g=function(a){a.stopPropagation(),a.preventDefault()},h=function(a){a.stopPropagation(),a.preventDefault(),console.log(a);var c=a.originalEvent.dataTransfer;console.log(c);var d=c.files;console.log(d),e(d),b.$apply()};b.selectFile=function(a){f.click(),a&&a.preventDefault()},c.on("dragenter",g),c.on("dragover",g),c.on("drop",h),f.addEventListener("change",function(){e(this.files),b.$apply()},!1)}}}]),angular.module("depthyApp").directive("pixi",["$parse",function(a){return{template:"<canvas></canvas>",restrict:"A",link:function(b,c,d){function e(){h&&h(),requestAnimFrame(e),i.render(g)}var f=a(d.pixi),g=f(),h=b.$eval(d.pixiAnimate);g||(g=new PIXI.Stage(6750105),f.assign(b,g));var i=PIXI.autoDetectRenderer(400,300,c[0]);requestAnimFrame(e)}}}]),angular.module("depthyApp").controller("ViewerCtrl",["$scope",function(a){a.stage=null,a.$watch("stage",function(b){b&&a.$watch("imageSource",function(a){if(a){var c=PIXI.Texture.fromImage(a),d=new PIXI.Sprite(c);b.addChild(d)}})}),a.pixiAnimate=function(){}}]);