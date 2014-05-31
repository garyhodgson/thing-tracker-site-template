# Intro

A template for a simple single page web application which presents information from a [Thing Tracker](http://thingtracker.net) Tracker file.

[Demonstration Site](https://garyhodgson.github.io/thing-tracker-site-template)

# Usage

* Clone or copy this project.
* Modify the contents of `tracker.json` adding meta-data about your Things.  Most attributes are self-explanatory, and most are optional so if something is not needed it can usually be deleted.
* It is recommended to add thumbnail images in the `thumbnails` folder so they are loaded locally to the website.  These can be referenced in the tracker directly, e.g.
```
	"thumbnailUrls":[
            "thumbnails/my_thumbnail.png"
    ]
```
* Be careful that `tracker.json` is valid - a wrong trailing comma can cause the site to fail to render.
* Optionally feel free to modify the look and feel of the site.  The site uses [AngularJS](https://angularjs.org/) and [AngularUI Bootstrap](http://angular-ui.github.io/bootstrap), and the main css file (`css\ttn-client.css`) is relatively straight-forward to modify.
* Once satisfied upload the site to your favourite hosting provider.