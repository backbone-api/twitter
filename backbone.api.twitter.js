(function(_, Backbone) {

	// API root (v1.1)
	var api = "https://api.twitter.com/1.1";

	// conditioning the existance of the Backbone APP()
	var Model = ( typeof APP != "undefined" && !_.isUndefined( APP.Model) ) ? APP.Model : Backbone.Model;
	var View = ( typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
	var Collection = ( typeof APP != "undefined" && !_.isUndefined( APP.Collection) ) ? APP.Collection : Backbone.Collection;

	// Base model - mainly used for setup options
	var Twitter = new Backbone.Model({
		api: api,
		token: 0,
		debug: false
	});

	// Namespace definition
	Twitter.Models = {};
	Twitter.Collections = {};
	Twitter.Views = {};


	// JSONP requests for all direct API requests
	Twitter.Model = Model.extend({

		initialize: function(model, options){

			options = options || {};
			_.extend(this.options, options);

			return Model.prototype.initialize.apply( this. arguments );
		},

		sync : function( method, model, options ) {

			options.dataType = 'jsonp';

			return Backbone.sync( method, model, options );

		}
	});

	Twitter.Collection = Collection.extend({

		initialize: function(models, options){

			options = options || {};
			_.extend(this.options, options);

			return Collection.prototype.initialize.apply( this. arguments );
		},

		sync : function( method, model, options ) {

			options.dataType = 'jsonp';

			return Backbone.sync( method, model, options );

		}
	});


	/* Models */

	Twitter.Models.User = Twitter.Model.extend({

	});

	Twitter.Models.Tweet = Twitter.Model.extend({
		defaults: {

		}
	});


	/* Collections */

	Twitter.Collections.Search = Twitter.Collection.extend({
		model: Backbone.API.Twitter.Models.Tweet,

		url: function(){ return "http://search.twitter.com/search.json?q="+ encodeURIComponent(this.options.query) +"&rpp="+ this.options.num },

		options: {
			query : "",
			num : 10
		},

		parse: function( data ){
			if( Twitter.get("debug") ) console.log("Twitter.Collections.Search: ", data );
			return data.results;
		}

	});

	Twitter.Collections.User = Twitter.Collection.extend({
		model: Backbone.API.Twitter.Models.Tweet,

		url: function(){ return api +"/statuses/user_timeline.json?screen_name=" + this.options.user + "&count="+this.options.num },

		options: {
			user : null,
			num : 10
		},

		parse: function( data ){
			if( Twitter.get("debug") ) console.log("Twitter.Collections.User: ", data );
			return data;
		}

	});

	/* Views */
	Twitter.Views.Stream = View.extend({

		initialize: function(options){

			_.bindAll(this, 'render');

			this.model.bind("change", this.render);
			this.model.bind("reset", this.render);

			this.template = Handlebars.compile( this.options.template );
		},

		render: function(){

			var html = this.template({ items: this.model.toJSON() });
			$(this.el).html( html );
		}

	});


	// Store in selected namespace(s)
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};
	Backbone.API.Twitter = Twitter;
	// - alias APP.API
	if( typeof APP != "undefined" && (_.isUndefined( APP.API) || _.isUndefined( APP.API.Twitter) ) ){
		APP.API = APP.API || {};
		APP.API.Twitter = Twitter;
	}
	// - Shortcut
	if(typeof window.Twitter == "undefined"){
		window.Twitter = Twitter;
	}


})(this._, this.Backbone);
