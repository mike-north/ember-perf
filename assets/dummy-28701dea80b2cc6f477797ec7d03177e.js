"use strict";define("dummy/app",["exports","ember","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,n,i,a){var l=t.default.Application,o=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,o=l.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:n.default}),(0,i.default)(o,a.default.modulePrefix),e.default=o}),define("dummy/components/items-list-item",["exports","ember"],function(e,t){var n=t.default.Component;e.default=n.extend({tagName:"li"})}),define("dummy/controllers/company/building",["exports","ember"],function(e,t){var n=t.default.inject,i=t.default.Controller;e.default=i.extend({emberPerf:n.service(),editing:!1,actions:{edit:function(){this.get("emberPerf").measureRender(),this.set("editing",!0)}}})}),define("dummy/helpers/app-version",["exports","ember","dummy/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n,i){function a(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return t.hideSha?l.match(i.versionRegExp)[0]:t.hideVersion?l.match(i.shaRegExp)[0]:l}e.appVersion=a;var l=n.default.APP.version;e.default=t.default.Helper.helper(a)}),define("dummy/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("dummy/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("dummy/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","dummy/config/environment"],function(e,t,n){var i=n.default.APP,a=i.name,l=i.version;e.default={name:"App Version",initialize:(0,t.default)(a,l)}}),define("dummy/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("dummy/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,n){e.default={name:"ember-data",initialize:t.default}}),define("dummy/initializers/ember-perf",["exports","ember","ember-perf/services/ember-perf","ember-perf/ext/router","ember-perf/ext/route","dummy/config/environment","ember-perf/instance-initializers/ember-perf"],function(e,t,n,i,a,l,o){function m(e,t){var i=e.injectionFactories;t.register("config:ember-perf",e,{instantiate:!1}),t.register("service:ember-perf",n.default),t.inject("service:ember-perf","defaults","config:ember-perf"),i.forEach(function(e){t.inject(e,"perfService","service:ember-perf")})}function s(){var e=arguments[1]||arguments[0],t=e.__container__;m(l.default.emberPerf,e),d.reopen(a.default),u.reopen(i.default),e.instanceInitializer||o.default.initialize(t)}e.initialize=s;var u=t.default.Router,d=t.default.Route;t.default.Application.instanceInitializer&&t.default.Application.instanceInitializer(o.default),e.default={name:"ember-perf-setup",initialize:s}}),define("dummy/initializers/export-application-global",["exports","ember","dummy/config/environment"],function(e,t,n){function i(){var e=arguments[1]||arguments[0];if(n.default.exportApplicationGlobal!==!1){var i;if("undefined"!=typeof window)i=window;else if("undefined"!=typeof global)i=global;else{if("undefined"==typeof self)return;i=self}var a,l=n.default.exportApplicationGlobal;a="string"==typeof l?l:t.default.String.classify(n.default.modulePrefix),i[a]||(i[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete i[a]}}))}}e.initialize=i,e.default={name:"export-application-global",initialize:i}}),define("dummy/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("dummy/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("dummy/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:function(){}}}),define("dummy/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("dummy/models/building",["exports","ember-data"],function(e,t){var n=t.default.belongsTo,i=t.default.hasMany,a=t.default.attr,l=t.default.Model;e.default=l.extend({name:a("string"),company:n("company"),floors:i("floor")})}),define("dummy/models/company",["exports","ember-data"],function(e,t){var n=t.default.hasMany,i=t.default.attr,a=t.default.Model;e.default=a.extend({name:i("string"),buildings:n("building")})}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("dummy/router",["exports","ember","dummy/config/environment"],function(e,t,n){var i=t.default.Router,a=i.extend({location:n.default.locationType});a.map(function(){this.route("companies",function(){this.route("info")}),this.route("company",{path:"company/:id"},function(){this.route("buildings",{path:"buildings"}),this.route("building",{path:"building/:building_id"},function(){this.route("floors"),this.route("floor",{path:"floor/:id"})})})}),e.default=a}),define("dummy/routes/base",["exports","ember"],function(e,t){var n=t.default.Route;e.default=n.extend({})}),define("dummy/routes/companies",["exports","ember","dummy/utils/random-wait","dummy/utils/sample-data","dummy/routes/base"],function(e,t,n,i,a){var l=t.default.A,o=t.default.testing;e.default=a.default.extend({model:function(){return(0,n.default)(o?4:3e3,o?2:300).then(function(){return l(i.COMPANIES)})}})}),define("dummy/routes/companies/info",["exports","dummy/routes/base"],function(e,t){e.default=t.default.extend({})}),define("dummy/routes/company",["exports","ember","dummy/routes/base","dummy/utils/random-wait","dummy/utils/sample-data"],function(e,t,n,i,a){var l=t.default.A,o=t.default.testing,m=t.default.set;e.default=n.default.extend({model:function(e){return(0,i.default)(o?4:3e3,o?2:300).then(function(){var t=new l(a.COMPANIES).findBy("id",parseInt(e.id,10));return m(t,"buildingIds",new l(t.buildings.map(function(e){return{id:e,name:"Building ("+e+")"}}))),t})}})}),define("dummy/routes/company/building",["exports","ember","dummy/utils/random-wait","dummy/utils/sample-data"],function(e,t,n,i){var a=t.default.Route,l=t.default.get,o=t.default.testing;e.default=a.extend({model:function(e){return l(this.modelFor("company"),"buildings").indexOf(parseInt(e.building_id,10))<0?null:(0,n.default)(o?4:2400,o?2:300).then(function(){return i.BUILDINGS.filter(function(t){return""+t.id===e.building_id})[0]})},setupController:function(e){this._super.apply(this,arguments),e.set("editing",!1)}})}),define("dummy/routes/company/buildings",["exports","ember","dummy/utils/random-wait","dummy/utils/sample-data"],function(e,t,n,i){var a=t.default.Route,l=t.default.testing,o=t.default.get,m=t.default.A;e.default=a.extend({model:function(){var e=o(this.modelFor("company"),"buildings");return(0,n.default)(l?4:2400,l?2:300).then(function(){return m(i.BUILDINGS.filter(function(t){return e.indexOf(t.id)>=0}))})}})}),define("dummy/routes/company/index",["exports","ember"],function(e,t){var n=t.default.Route;e.default=n.extend({redirect:function(){this.transitionTo("company.buildings")}})}),define("dummy/routes/index",["exports","dummy/routes/base"],function(e,t){e.default=t.default.extend({redirect:function(){this.transitionTo("companies")}})}),define("dummy/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/services/ember-perf",["exports","ember-perf/services/ember-perf"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"AZ+5K2co",block:'{"statements":[["open-element","h2",[]],["static-attr","id","title"],["flush-element"],["text","Ember.js Performance Instrumentation"],["close-element"],["text","\\n\\n"],["append",["unknown",["outlet"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/application.hbs"}})}),define("dummy/templates/companies",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"doKLdCGM",block:'{"statements":[["open-element","ul",[]],["static-attr","class","companies-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["model"]]],null,0],["close-element"],["text","\\n\\n"],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["items-list-item"],null,[["class","content","itemRoute"],["company",["get",["company"]],"company"]]],false],["text","\\n"]],"locals":["company"]}],"hasPartials":false}',meta:{moduleName:"dummy/templates/companies.hbs"}})}),define("dummy/templates/companies/info",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"wkZJ6DSp",block:'{"statements":[["open-element","h4",[]],["flush-element"],["text","Info"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/companies/info.hbs"}})}),define("dummy/templates/company",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"Imy+Kj6w",block:'{"statements":[["open-element","p",[]],["flush-element"],["text","\\n"],["block",["link-to"],["companies.info"],null,1],["close-element"],["text","\\n"],["open-element","h2",[]],["flush-element"],["append",["unknown",["content","name"]],false],["close-element"],["text","\\n"],["open-element","p",[]],["flush-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","buildings-list horiz-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["content","buildingIds"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["items-list-item"],null,[["content","class","itemRoute"],[["get",["buildingId"]],"building-id","company.building"]]],false],["text","\\n"]],"locals":["buildingId"]},{"statements":[["text","    < Back to Companies\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"dummy/templates/company.hbs"}})}),define("dummy/templates/company/building",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"GtGnjsSA",block:'{"statements":[["block",["if"],[["get",["content"]]],null,4,2],["text","\\n"],["block",["if"],[["get",["editing"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","button",[]],["static-attr","class","btn-edit"],["modifier",["action"],[["get",[null]],"edit"]],["flush-element"],["text","Show more"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["input"],null,[["value"],[["get",["content","name"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","h1",[]],["flush-element"],["text","Building not found"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","< Back to company"]],"locals":[]},{"statements":[["text","  "],["block",["link-to"],["company",["get",["content","companyId"]]],[["class"],["back-to-company"]],3],["text","\\n  "],["open-element","h4",[]],["flush-element"],["text","Building: "],["append",["unknown",["content","name"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"dummy/templates/company/building.hbs"}})}),define("dummy/templates/company/buildings",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"XIO+Edx0",block:'{"statements":[["open-element","h3",[]],["flush-element"],["text","Buildings"],["close-element"],["text","\\n"],["open-element","ul",[]],["static-attr","class","buildings-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["content"]]],null,0],["close-element"],["text","\\n\\n\\n"],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["items-list-item"],null,[["content","class","itemRoute"],[["get",["building"]],"building","company.building"]]],false],["text","\\n"]],"locals":["building"]}],"hasPartials":false}',meta:{moduleName:"dummy/templates/company/buildings.hbs"}})}),define("dummy/templates/company/loading",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"2ft8ggcv",block:'{"statements":[["open-element","h4",[]],["flush-element"],["text","Company data is loading..."],["close-element"],["text","\\n"],["append",["unknown",["my-thing"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/company/loading.hbs"}})}),define("dummy/templates/components/items-list-item",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"xq0MzcvX",block:'{"statements":[["block",["link-to"],[["get",["itemRoute"]],["get",["content","id"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["content","name"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"dummy/templates/components/items-list-item.hbs"}})}),define("dummy/templates/components/my-thing",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"Yk9JljKJ",block:'{"statements":[["text","This is a useless component\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/components/my-thing.hbs"}})}),define("dummy/templates/loading",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"Cv8ReSds",block:'{"statements":[["open-element","h3",[]],["flush-element"],["text","loading..."],["close-element"],["text","\\n"],["append",["unknown",["my-thing"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/loading.hbs"}})}),define("dummy/utils/performance",["exports","ember-perf/utils/performance-now"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/utils/random-wait",["exports","ember"],function(e,t){var n=t.default.RSVP,i=n.Promise;e.default=function(){var e=arguments.length<=0||void 0===arguments[0]?2e3:arguments[0],t=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return new i(function(n){var i=t+Math.random()*(e-t);setTimeout(n,i)})}}),define("dummy/utils/sample-data",["exports"],function(e){function t(e){var t={name:e,id:i.building++,companyId:this.company.id};a.push(t),this.company.buildings.push(t.id)}function n(e,n){var a={name:e,buildings:[],id:i.company++};l.push(a);var o={company:a};o.building=t.bind(o),n.apply(o)}var i={company:1,building:1},a=[];e.BUILDINGS=a;var l=[];e.COMPANIES=l,n("Yahoo",function(){this.building("Yahoo - Building A"),this.building("Yahoo - Building B"),this.building("Yahoo - Building C"),this.building("Yahoo - Building D")}),n("Flurry",function(){this.building("Flurry HQ")}),n("Tumblr",function(){this.building("Tumblr HQ")})}),define("dummy/config/environment",["ember"],function(e){try{var t=document.querySelector('meta[name="dummy/config/environment"]').getAttribute("content"),n=JSON.parse(unescape(t)),i={default:n};return Object.defineProperty(i,"__esModule",{value:!0}),i}catch(e){throw new Error('Could not read config from meta tag with name "dummy/config/environment".')}}),runningTests||require("dummy/app").default.create({LOG_TRANSITIONS:!0,LOG_TRANSITIONS_INTERNAL:!0,name:"ember-perf",version:"0.1.6+a51d8dcc"});