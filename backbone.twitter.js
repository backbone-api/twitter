var APP = {
			Models: {},
			Collections: {},
			Views: {}
		};
		
	APP.Models.Tweet = Backbone.Model.extend({
		defaults: {
			
		}
		
	});
	
	APP.Models.Highlight = APP.Models.Tweet.extend({
		defaults: {
			
		}
		
	});
	
	APP.Collections.Highlights = APP.Collections.TwitterUser.extend({});
	
	
	APP.Collections.TwitterHash = Backbone.Collection.extend({
		model: APP.Models.Tweet,
		url: function(){ return "http://search.twitter.com/search.json?q="+this.query+"&rpp="+this.num },
		initialize: function(options){
			this.query=options.query;
			this.num=options.num;
			
			this.fetch();
		}, 
		parse: function( data ){
			
			return data.results;
		}, 
		sync: function(method, model, options){  
			//options.timeout = 10000;  
			options.dataType = "jsonp";  
			return Backbone.sync(method, model, options);  
		  } 
		
	});
	
	
	APP.Collections.TwitterUser = Backbone.Collection.extend({
		model: APP.Models.Tweet,
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
	
	APP.Views.Module = Backbone.View.extend({
		
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
	

$(document).ready( function() { 

	var data = new APP.Collections.TwitterUser({user:"tracend", num: 15});
	var view = new APP.Views.Module({el: "#twitterfeed", model: data});
	
	var data1 = new APP.Collections.TwitterHash({query:"%23AlphasOnSyfy", num: 15});
	var view1 = new APP.Views.Module({el: "#twitterhash", model: data1});
	
});
