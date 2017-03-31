I am working on a dashcam-like application developed in Swift3 on iOS 10. In order to make the dashcam functional, users must stay inside the application <sub>authoritarian Apple...</sub>

Among my target audience, mostly teenagers, phones in the car are used for mapping and navigation. However I've just said that the camera doesn't work if my application isn't in focus. Thus, I need to implement navigation in my dashcam application... Sigh.

This is a solved problem, oh well I think I can implement a rudimentary "good enough" solution for this use-case. I will use [MapboxDirections](https://github.com/mapbox/MapboxDirections.swift) and [MapboxGeocoder](https://github.com/mapbox/MapboxGeocoder.swift) in to provide auto-completing search fields. Finally the directions [polyline](https://github.com/raphaelmor/Polyline) will be displayed using the [Mapbox iOS SDK](https://www.mapbox.com/ios-sdk/).

Things are going great! I can display rudimentary directions; alas, all that work is now useless. Mapbox released a new tool [MapboxNavigation](https://github.com/mapbox/MapboxNavigation.swift). This is amazing. It has everything I wanted to implement myself and a nice UI on top of it. Now to just get it installed...

> Checking out osrm-text-instructions.swift at "bdd962bf5593f951bbbbd26435f732a829dacda7"
> ...
> ...
> ... and its just hangs.

See [here](https://github.com/mapbox/MapboxNavigation.swift/issues/77#issuecomment-286566146) and [here](https://github.com/mapbox/MapboxNavigation.swift/issues/103) for more details.

Sigh. I rebuild *all* my dependencies, including aws-ios-sdk which takes hours, but I can't seem to get it to compile correctly. Finally it turns out that Carthage will build from the latest release instead of the latest development version of the software. Unfortunatly, the latest release did not support building with Carthage. As of yesterday (March 30th) MapboxNavigation v0.1.0 should be able to be installed with `github "mapbox/MapboxNavigation.swift"` in your Cartfile.
