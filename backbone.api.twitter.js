(function(_, Backbone) {
  
	// Fallbacks
	APP = window.APP || (APP = { Models: {}, Collections: {}, Views: {} });
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};
	
	// main request method
	Backbone.API.Twitter = Backbone.Collection.extend({
		
	});
	
	Backbone.API.Twitter.User = Backbone.Model.extend({
		
	});
	
	APP.Twitter = {};
	APP.Models.Twitter = {};
	APP.Collections.Twitter = {};
	APP.Views.Twitter = {};

	APP.Models.Twitter.Tweet = Backbone.Model.extend({
		defaults: {
			
		}
		
	});
	
	
	APP.Twitter.Search = Backbone.Collection.extend({
		model: APP.Models.Twitter.Tweet,
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
	
	
	APP.Collections.Twitter.User = Backbone.Collection.extend({
		model: APP.Models.Twitter.Tweet,
		url: function(){ return "http://twitter.com/status/user_timeline/" + this.user + ".json?count="+this.num },
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
	
	APP.Views.Twitter.Stream = Backbone.View.extend({
		
		initialize: function(options){
			
			_.bindAll(this, 'render');
			
			this.model.bind("change", this.render);
			this.model.bind("reset", this.render);
			
			this.template = Handlebars.compile( $(this.el).find("#twitter-hash").html() );
		},
		render: function(){
			
			var html = this.template({ items: this.model.toJSON() });
			$(this.el).html( html );
		}
		
	});
	
/*
Usage: 
$(document).ready( function() { 

	var data = new APP.Collections.Twitter.User({user:"tracend", num: 15});
	var view = new APP.Views.Twitter.Stream({el: "#twitterfeed", model: data});
	
	var data1 = new APP.Collections.Twitter.Hash({query:"%23AlphasOnSyfy", num: 15});
	var view1 = new APP.Views.Twitter.Stream({el: "#twitterhash", model: data1});
	
});
*/

})(this._, this.Backbone);
