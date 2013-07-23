(function(_, Backbone) {

	// Fallbacks
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};

	// API root (v1.1)
	var api = "https://api.twitter.com/1.1/";

	// Namespace definition
	Backbone.API.Twitter = {
		Models : {},
		Collections : {},
		Views : {}
	};

	// conditioning the existance of the Backbone APP()
	var Model = ( typeof APP != "undefined" && !_.isUndefined( APP.Model) ) ? APP.Model : Backbone.Model;
	var View = ( typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
	var Collection = ( typeof APP != "undefined" && !_.isUndefined( APP.Collection) ) ? APP.Collection : Backbone.Collection;

	// Models
	Backbone.API.Twitter.Models.User = Model.extend({

	});

	Backbone.API.Twitter.Models.Tweet = Model.extend({
		defaults: {

		}
	});


	Backbone.API.Twitter.Collections.Search = Collection.extend({
		model: Backbone.API.Twitter.Models.Tweet,
		url: function(){ return "http://search.twitter.com/search.json?q="+ encodeURIComponent(this.query) +"&rpp="+ this.num },
		initialize: function(models, options){
			// settings
			this.query=options.query || "";
			this.num=options.num || 10;

			this.fetch();
		},
		parse: function( data ){
			//console.log( data );
			return data.results;
		},
		sync: function(method, model, options){
			//options.timeout = 10000;
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		  }

	});


	Backbone.API.Twitter.Collections.User = Collection.extend({
		model: Backbone.API.Twitter.Models.Tweet,
		url: function(){ return api +"statuses/user_timeline.json?screen_name=" + this.user + "&count="+this.num },
		initialize: function(options){
			this.user=options.user;
			this.num=options.num;

			this.fetch();
		},
		parse: function( data ){
			return data;
		},
		sync: function(method, model, options){
			//options.timeout = 10000;
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		  }

	});

	Backbone.API.Twitter.Views.Stream = View.extend({

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

	// alias APP.API
	if( typeof APP != "undefined" && (_.isUndefined( APP.API) || _.isUndefined( APP.API.Twitter) ) ){
		APP.API = APP.API || {};
		APP.API.Twitter = Backbone.API.Twitter;
	}

	// Shortcut
	if(typeof window.Twitter == "undefined"){
		window.Twitter = Backbone.API.Twitter;
	}


})(this._, this.Backbone);
