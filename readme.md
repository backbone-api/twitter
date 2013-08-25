# Backbone API : Twitter

Backbone.js helper for Twitter requests


## Install

Using Bower:
```
bower install backbone.api.twitter
```

## Dependencies

After the increased security introduced by the Twitter API at v1.1 the plugin cannot operate with just client-side code. Instead it expects a token to already be available either from an authorized user or a [bearer token](https://dev.twitter.com/docs/api/1.1/post/oauth2/token)


## Usage:

The lib exposes methods under the ```Backbone.API.Twitter``` namespace and if available will also duplicate to ```APP.API.Twitter``` & the ```Twitter``` namepsace. In its simplest version (the Twitter namepsace) you can call models/collections/views like in any Backbone.js app:

```
	var data = new Twitter.Collections.User(null, {user:"tracend", num: 15});
	var view = new Twitter.Views.Stream({el: "#twitterfeed", model: data});
```


## Credits

## Credits

Created by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org)

### Trivia

* Originally started [as a gist](https://gist.github.com/ryndel/3886851) by Lyndel Thomas ( [@ryndel](http://github.com/ryndel) )

### License

Released under the [MIT license](http://makesites.org/licenses/MIT)
