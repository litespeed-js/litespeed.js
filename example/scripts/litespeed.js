
window.ls=window.ls||{};window.ls.container=function(){let stock={};let listeners={};let set=function(name,object,singleton,watch=true){if(typeof name!=='string'){throw new Error('var name must be of type string');}
if(typeof singleton!=='boolean'){throw new Error('var singleton "'+singleton+'" of service "'+name+'" must be of type boolean');}
stock[name]={name:name,object:object,singleton:singleton,instance:null,watch:watch,};let binds=listeners[name]||{};for(let key in binds){if(binds.hasOwnProperty(key)){document.dispatchEvent(new CustomEvent(key));}}
return this;};let get=function(name){let service=(undefined!==stock[name])?stock[name]:null;if(null==service){return null;}
if(service.instance){return service.instance;}
let instance=(typeof service.object==='function')?this.resolve(service.object):service.object;let skip=false;if(service.watch&&name!=='window'&&name!=='document'&&name!=='element'&&typeof instance==='object'&&instance!==null){let handler={name:service.name,watch:function(){},get:function(target,key){if(key==="__name"){return this.name;}
if(key==="__watch"){return this.watch;}
if(key==="__proxy"){return true;}
if(typeof target[key]==='object'&&target[key]!==null&&!target[key].__proxy){let handler=Object.assign({},this);handler.name=handler.name+'.'+key;return new Proxy(target[key],handler)}
else{return target[key];}},set:function(target,key,value,receiver){if(key==="__name"){return this.name=value;}
if(key==="__watch"){return this.watch=value;}
target[key]=value;let path=receiver.__name+'.'+key;document.dispatchEvent(new CustomEvent(path+'.changed'));if(skip){return true;}
skip=true;container.set('$prop',key,true);container.set('$value',value,true);container.resolve(this.watch);container.set('$key',null,true);container.set('$value',null,true);skip=false;return true;},};instance=new Proxy(instance,handler);}
if(service.singleton){service.instance=instance;}
return instance;};let resolve=function(target){if(!target){return()=>{};}
let self=this;const REGEX_COMMENTS=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;const REGEX_FUNCTION_PARAMS=/(?:\s*(?:function\s*[^(]*)?\s*)((?:[^'"]|(?:(?:(['"])(?:(?:.*?[^\\]\2)|\2))))*?)\s*(?=(?:=>)|{)/m;const REGEX_PARAMETERS_VALUES=/\s*([\w\\$]+)\s*(?:=\s*((?:(?:(['"])(?:\3|(?:.*?[^\\]\3)))((\s*\+\s*)(?:(?:(['"])(?:\6|(?:.*?[^\\]\6)))|(?:[\w$]*)))*)|.*?))?\s*(?:,|$)/gm;function getParams(func){let functionAsString=func.toString();let params=[];let match;functionAsString=functionAsString.replace(REGEX_COMMENTS,'');functionAsString=functionAsString.match(REGEX_FUNCTION_PARAMS)[1];if(functionAsString.charAt(0)==='('){functionAsString=functionAsString.slice(1,-1);}
while(match=REGEX_PARAMETERS_VALUES.exec(functionAsString)){params.push(match[1]);}
return params;}
let args=getParams(target);return target.apply(target,args.map(function(value){return self.get(value.trim());}));};let path=function(path,value,as,prefix){as=(as)?as:container.get('$as');prefix=(prefix)?prefix:container.get('$prefix');path=path.replace(as+'.',prefix+'.').split('.');let name=path.shift();let object=this.get(name);let result=null;while(path.length>1){if(!object){return null;}
object=object[path.shift()];}
if(value){object[path.shift()]=value;return true;}
if(!object){return null;}
let shift=path.shift();if(!shift){result=object;}
else{return object[shift];}
return result;};let bind=function(element,path,callback,as,prefix){as=(as)?as:container.get('$as');prefix=(prefix)?prefix:container.get('$prefix');let event=path.replace(as+'.',prefix+'.')+'.changed';let service=event.split('.').slice(0,1).pop();listeners[service]=listeners[service]||{};listeners[service][event]=true;let printer=()=>{if(!document.body.contains(element)){element=null;document.removeEventListener(event,printer,false);return false;}
callback();};document.addEventListener(event,printer);};let container={set:set,get:get,resolve:resolve,path:path,bind:bind,stock:stock,listeners:listeners,};set('container',container,true,false,false);return container;}();window.ls.container.set('http',function(document){let globalParams=[],globalHeaders=[];let addParam=function(url,param,value){param=encodeURIComponent(param);let a=document.createElement('a');param+=(value?"="+encodeURIComponent(value):"");a.href=url;a.search+=(a.search?"&":"")+param;return a.href;};let request=function(method,url,headers,payload,progress){let i;if(-1===['GET','POST','PUT','DELETE','TRACE','HEAD','OPTIONS','CONNECT','PATCH'].indexOf(method)){throw new Error('var method must contain a valid HTTP method name');}
if(typeof url!=='string'){throw new Error('var url must be of type string');}
if(typeof headers!=='object'){throw new Error('var headers must be of type object');}
if(typeof url!=='string'){throw new Error('var url must be of type string');}
for(i=0;i<globalParams.length;i++){url=addParam(url,globalParams[i].key,globalParams[i].value);}
return new Promise(function(resolve,reject){let xmlhttp=new XMLHttpRequest();xmlhttp.open(method,url,true);xmlhttp.setRequestHeader('Ajax','1');for(i=0;i<globalHeaders.length;i++){xmlhttp.setRequestHeader(globalHeaders[i].key,globalHeaders[i].value);}
for(let key in headers){if(headers.hasOwnProperty(key)){xmlhttp.setRequestHeader(key,headers[key]);}}
xmlhttp.onload=function(){if(4===xmlhttp.readyState&&200===xmlhttp.status){resolve(xmlhttp.response);}
else{document.dispatchEvent(new CustomEvent('http-'+method.toLowerCase()+'-'+xmlhttp.status));reject(new Error(xmlhttp.statusText));}};if(progress){xmlhttp.addEventListener('progress',progress);xmlhttp.upload.addEventListener('progress',progress,false);}
xmlhttp.onerror=function(){reject(new Error("Network Error"));};xmlhttp.send(payload);})};return{'get':function(url){return request('GET',url,{},'')},'post':function(url,headers,payload){return request('POST',url,headers,payload)},'put':function(url,headers,payload){return request('PUT',url,headers,payload)},'patch':function(url,headers,payload){return request('PATCH',url,headers,payload)},'delete':function(url){return request('DELETE',url,{},'')},'addGlobalParam':function(key,value){globalParams.push({key:key,value:value});},'addGlobalHeader':function(key,value){globalHeaders.push({key:key,value:value});}}},true,false);window.ls.container.set('cookie',function(document){function get(name){let value="; "+document.cookie,parts=value.split("; "+name+"=");if(parts.length===2){return parts.pop().split(";").shift();}
return null;}
function set(name,value,days){let date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));let expires=(0<days)?'expires='+date.toUTCString():'expires=0';document.cookie=name+"="+value+";"+expires+";path=/";return this;}
return{'get':get,'set':set}},true,false);window.ls.container.set('view',function(http,container){let stock={};let execute=function(view,node,container){container.set('element',node,true,false,false);container.resolve(view.controller);if(true!==view.repeat){node.removeAttribute(view.selector);}};let parse=function(node,skip){if(node.attributes&&skip!==true){let attrs=[];let attrsLen=node.attributes.length;for(let x=0;x<attrsLen;x++){attrs.push(node.attributes[x].nodeName);}
if(1!==node.nodeType){return;}
if(attrs&&attrsLen){for(let x=0;x<attrsLen;x++){if(node.$lsSkip===true){break;}
let pointer=(!/Edge/.test(navigator.userAgent))?x:(attrsLen-1)-x;let length=attrsLen;let attr=attrs[pointer];if(!stock[attr]){continue;}
let comp=stock[attr];if(typeof comp.template==="function"){comp.template=container.resolve(comp.template);}
if(!comp.template){(function(comp,node,container){execute(comp,node,container);})(comp,node,container);if(length!==attrsLen){x--;}
continue;}
node.classList.remove('load-end');node.classList.add('load-start');node.$lsSkip=true;http.get(comp.template).then(function(node,comp){return function(data){node.$lsSkip=false;node.innerHTML=data;node.classList.remove('load-start');node.classList.add('load-end');(function(comp,node,container){execute(comp,node,container);})(comp,node,container);parse(node,true);}}(node,comp),function(error){throw new Error('Failed to load comp template: '+error.message);});}}}
if(true===node.$lsSkip){return;}
let list=(node)?node.childNodes:[];if(node.$lsSkip===true){list=[];}
for(let i=0;i<list.length;i++){let child=list[i];parse(child);}};return{stock:stock,add:function(object){if(typeof object!=='object'){throw new Error('object must be of type object');}
let defaults={'selector':'','controller':function(){},'template':'','repeat':false,'protected':false};for(let prop in defaults){if(!defaults.hasOwnProperty(prop)){continue;}
if(prop in object){continue;}
object[prop]=defaults[prop];}
if(!object.selector){throw new Error('View component is missing a selector attribute');}
stock[object.selector]=object;return this;},render:function(element){parse(element);element.dispatchEvent(new window.Event('rendered',{bubbles:false}));}}},true,false);window.ls.container.set('router',function(window){let states=[];let current=null;let previous=null;let getPrevious=()=>previous;let getCurrent=()=>current;let setPrevious=(value)=>{previous=value;return this;};let setCurrent=(value)=>{current=value;return this;};let setParam=function(key,value){state.params[key]=value;return this;};let getParam=function(key,def){if(key in state.params){return state.params[key];}
return def;};let getParams=function(){return state.params;};let getURL=function(){return window.location.href;};let reset=function(){state.params=getJsonFromUrl(window.location.search);state.hash=window.location.hash;};let add=function(path,view){if(typeof path!=='string'){throw new Error('path must be of type string');}
if(typeof view!=='object'){throw new Error('view must be of type object');}
states[states.length++]={path:path,view:view};return this;};let match=function(location){let url=location.pathname+((location.hash)?location.hash:'');states.sort(function(a,b){return b.path.length-a.path.length;});states.sort(function(a,b){let n=b.path.split('/').length-a.path.split('/').length;if(n!==0){return n;}
return b.path.length-a.path.length;});for(let i=0;i<states.length;i++){let value=states[i];value.path=(value.path.substring(0,1)!=='/')?location.pathname+value.path:value.path;let match=new RegExp("^"+value.path.replace(/:[^\s/]+/g,'([\\w-]+)')+"$");let found=url.match(match);if(found){previous=current;current=value;return value;}}
return null};let change=function(URL,replace){if(!replace){window.history.pushState({},'',URL);}
else{window.history.replaceState({},'',URL);}
window.dispatchEvent(new PopStateEvent('popstate',{}));return this;};let reload=function(){return change(window.location.href);};let getJsonFromUrl=function(URL){let query;if(URL){let pos=location.href.indexOf('?');if(pos===-1)return[];query=location.href.substr(pos+1);}else{query=location.search.substr(1);}
let result={};query.split('&').forEach(function(part){if(!part){return;}
part=part.split('+').join(' ');let eq=part.indexOf('=');let key=eq>-1?part.substr(0,eq):part;let val=eq>-1?decodeURIComponent(part.substr(eq+1)):'';let from=key.indexOf('[');if(from===-1){result[decodeURIComponent(key)]=val;}
else{let to=key.indexOf(']');let index=decodeURIComponent(key.substring(from+1,to));key=decodeURIComponent(key.substring(0,from));if(!result[key]){result[key]=[];}
if(!index){result[key].push(val);}
else{result[key][index]=val;}}});return result;};let state={setParam:setParam,getParam:getParam,getParams:getParams,getURL:getURL,add:add,change:change,reload:reload,reset:reset,match:match,getCurrent:getCurrent,setCurrent:setCurrent,getPrevious:getPrevious,setPrevious:setPrevious,params:getJsonFromUrl(window.location.search),hash:window.location.hash};return state;},true,true);window.ls.container.set('expression',function(container,filter){let paths=[];return{regex:/(\{{.*?\}})/gi,parse:function(string,def,as,prefix,cast=false){def=def||'';paths=[];return string.replace(this.regex,match=>{let reference=match.substring(2,match.length-2).replace('[\'','.').replace('\']','').trim();reference=reference.split('|');let path=(reference[0]||'');let result=container.path(path,undefined,as,prefix);if(!paths.includes(path)){paths.push(path);}
if(null===result||undefined===result){result=def;}
else if(typeof result==='object'){result=JSON.stringify(result);}
else if(((typeof result==='object')||(typeof result==='string'))&&cast){result='\''+result+'\'';}
if(reference.length>=2){for(let i=1;i<reference.length;i++){result=filter.apply(reference[i],result);}}
return result;});},getPaths:()=>paths,}},true,false);window.ls.container.set('filter',function(container){let filters={};let add=function(name,callback){filters[name]=callback;return this;};let apply=function(name,value){container.set('$value',value,true,false);return container.resolve(filters[name]);};add('uppercase',($value)=>{return $value.toUpperCase();});add('lowercase',($value)=>{return $value.toLowerCase();});return{add:add,apply:apply}},true,false);window.ls.container.get('filter').add('escape',value=>{if(typeof value!=='string'){return value;}
return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/\'/g,'&#39;').replace(/\//g,'&#x2F;');});window.ls=window.ls||{};window.ls.container.set('window',window,true,false).set('document',window.document,true,false).set('element',window.document,true,false);window.ls.run=function(window){try{this.view.render(window.document);}
catch(error){let handler=window.ls.container.resolve(this.error);handler(error);}};window.ls.error=()=>{return error=>{console.error('ls-error',error.message,error.stack,error.toString());}};window.ls.router=window.ls.container.get('router');window.ls.view=window.ls.container.get('view');window.ls.filter=window.ls.container.get('filter');window.ls.container.get('view').add({selector:'data-ls-router',repeat:false,controller:function(element,window,document,view,router){let firstFromServer=(element.getAttribute('data-first-from-server')==='true');let scope={selector:'data-ls-scope',template:false,repeat:true,controller:function(){},};let init=function(route){window.scrollTo(0,0);if(window.document.body.scrollTo){window.document.body.scrollTo(0,0);}
router.reset();if(null===route){return;}
scope.template=(undefined!==route.view.template)?route.view.template:null;scope.controller=(undefined!==route.view.controller)?route.view.controller:function(){};document.dispatchEvent(new CustomEvent('state-change'));if(firstFromServer&&null===router.getPrevious()){scope.template='';}
else if(null!==router.getPrevious()){view.render(element);}
document.dispatchEvent(new CustomEvent('state-changed'));};let findParent=function(tagName,el){if((el.nodeName||el.tagName).toLowerCase()===tagName.toLowerCase()){return el;}
while(el=el.parentNode){if((el.nodeName||el.tagName).toLowerCase()===tagName.toLowerCase()){return el;}}
return null;};element.setAttribute('data-ls-scope','');view.add(scope);document.addEventListener('click',function(event){let target=findParent('a',event.target);if(!target){return false;}
if(!target.href){return false;}
if((event.metaKey)){return false;}
if((target.hasAttribute('target'))&&('_blank'===target.getAttribute('target'))){return false;}
if(target.hostname!==window.location.hostname){return false;}
let route=router.match(target);if(null===route){return false;}
event.preventDefault();if(window.location===target.href){return false;}
route.view.state=(undefined===route.view.state)?true:route.view.state;if(true===route.view.state){if(router.getPrevious()&&router.getPrevious().view&&(router.getPrevious().view.scope!==route.view.scope)){window.location.href=target.href;return false;}
window.history.pushState({},'Unknown',target.href);}
init(route);return true;});window.addEventListener('popstate',function(){init(router.match(window.location));});window.addEventListener('hashchange',function(){init(router.match(window.location));});init(router.match(window.location));}});window.ls.container.get('view').add({selector:'data-ls-attrs',controller:function(element,expression,container,$as,$prefix){let attrs=element.getAttribute('data-ls-attrs').trim().split(',');let paths=[];let check=()=>{for(let i=0;i<attrs.length;i++){let attr=attrs[i];let key=expression.parse(attr.substring(0,attr.indexOf('=')),null,$as,$prefix)||null;paths=paths.concat(expression.getPaths());let value=expression.parse(attr.substring(attr.indexOf('=')+1),null,$as,$prefix)||null;paths=paths.concat(expression.getPaths());if(!key){return null;}
element.setAttribute(key,value);}};check();for(let i=0;i<paths.length;i++){container.bind(element,paths[i],check);}}});window.ls.container.get('view').add({selector:'data-ls-bind',controller:function(element,expression,container,$prefix,$as){let echo=function(value,bind=true){if(element.tagName==='INPUT'||element.tagName==='SELECT'||element.tagName==='BUTTON'||element.tagName==='TEXTAREA'){let type=element.getAttribute('type');if('radio'===type){if(value.toString()===element.value){element.setAttribute('checked','checked');}
else{element.removeAttribute('checked');}}
if('checkbox'===type){if(typeof value==='boolean'||value==='true'||value==='false'){if(value===true||value==='true'){element.setAttribute('checked','checked');element.checked=true;}
else{element.removeAttribute('checked');element.checked=false;}
if(bind){element.addEventListener('change',()=>{for(let i=0;i<paths.length;i++){container.path(paths[i],element.checked,$as,$prefix);}});}}
else{try{value=JSON.parse(value);element.checked=(Array.isArray(value)&&(value.indexOf(element.value)>-1));}
catch{return null;}}}
if(element.value!==value){element.value=value;}
if(bind){element.addEventListener('input',sync);element.addEventListener('change',sync);}}
else{if(element.innerText!==value){element.innerHTML=value;}}};let sync=((as,prefix)=>{return()=>{for(let i=0;i<paths.length;i++){container.path(paths[i],element.value,as,prefix);}}})($as,$prefix);let syntax=element.getAttribute('data-ls-bind');let result=expression.parse(syntax,null,$as,$prefix);let paths=expression.getPaths();echo(result,true);element.addEventListener('looped',function(){echo(expression.parse(syntax,null,$as,$prefix),false);});for(let i=0;i<paths.length;i++){container.bind(element,paths[i],()=>{echo(expression.parse(syntax,null,$as,$prefix),false);});}}});window.ls.container.get('view').add({selector:'data-ls-if',controller:function(element,expression,container,view,$as,$prefix){let result='';let syntax=element.getAttribute('data-ls-if')||'';let debug=element.getAttribute('data-debug')||false;let paths=[];let check=()=>{if(debug){console.info('debug-ls-if',expression.parse(syntax.replace(/(\r\n|\n|\r)/gm,' '),'undefined',$as,$prefix,true));}
try{result=(eval(expression.parse(syntax.replace(/(\r\n|\n|\r)/gm,' '),'undefined',$as,$prefix,true)));}
catch(error){throw new Error('Failed to evaluate expression "'+syntax+' (resulted with: "'+result+'")": '+error);}
if(debug){console.info('debug-ls-if result:',result);}
paths=expression.getPaths();let prv=element.$lsSkip;element.$lsSkip=!result;if(!result){element.style.visibility='hidden';element.style.display='none';}
else{element.style.removeProperty('display');element.style.removeProperty('visibility');}
if(prv===true&&element.$lsSkip===false){view.render(element)}};check();for(let i=0;i<paths.length;i++){container.bind(element,paths[i],check);}}});window.ls.container.get('view').add({selector:'data-ls-loop',template:false,repeat:false,nested:false,controller:function(element,view,container,window){let expr=element.getAttribute('data-ls-loop');let as=element.getAttribute('data-ls-as');let echo=function(){let array=container.path(expr);array=(!array)?[]:array;while(element.hasChildNodes()){element.removeChild(element.lastChild);element.lastChild=null;}
if(array instanceof Array&&typeof array!=='object'){throw new Error('Reference value must be array or object. '+(typeof array)+' given');}
let children=[];element.$lsSkip=true;element.style.visibility=(0===array.length)?'hidden':'visible';for(let prop in array){if(!array.hasOwnProperty(prop)){continue;}
children[prop]=template.cloneNode(true);element.appendChild(children[prop]);(index=>{let context=expr+'.'+index;container.set(as,container.path(context),true);container.set('$index',index,true,false,false);container.set('$prefix',context,true,false,false);container.set('$as',as,true,false,false);view.render(children[prop]);})(prop);}
container.set('$index',null,true,false,false);container.set('$prefix','',true,false,false);container.set('$as','',true,false,false);element.dispatchEvent(new Event('looped'));};let template=(element.children.length===1)?element.children[0]:window.document.createElement('li');echo();container.bind(element,expr,echo);container.bind(element,expr+'.length',echo);}});window.ls.container.get('view').add({selector:'data-ls-template',template:false,repeat:true,controller:function(element,view,http,expression,document){let template=expression.parse(element.getAttribute('data-ls-template'));let type=element.getAttribute('data-type')||'url';element.innerHTML='';if('script'===type){let inlineTemplate=document.getElementById(template);if(inlineTemplate&&inlineTemplate.innerHTML){element.innerHTML=inlineTemplate.innerHTML;element.dispatchEvent(new CustomEvent('template-loaded',{bubbles:true,cancelable:false}));}
else{element.innerHTML='<span style="color: red">Missing template "'+template+'"</span>';}
return;}
http.get(template).then(function(element){return function(data){element.innerHTML=data;view.render(element);element.dispatchEvent(new CustomEvent('template-loaded',{bubbles:true,cancelable:false}));}}(element),function(){throw new Error('Failed loading template');});}});