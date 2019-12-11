# What's this
An extension, that switches your default chrome tab page, with your own, featuring your:
* favourite links (editable through `config.js`)
* hour and a date
* weather and temperature (editable from `config.js`)
* google calendar summary for 3 days
* todo list (based on your firebase real time database)
* small, quick notes (based on your firebase real time database)

# what you need:
* your own `firebase` account with databases (free plan should be fine):
  * `todo`
  * `quicknotes`
* google developer `APIKEY` + `OAuth 2.0 client ID` for your app
* upload (after modifications) your extension to chromse store following [those rules](https://developer.chrome.com/extensions/tut_oauth#upload_to_dashboard)
* `key` parameter (from `more info` button in extension list) of your extension should be edited into `manifest.json`

# how to distribute through many computers
copy the contents of the `build` folder to some place in in your computer, launch `chrome://extensions/`, switch on `developer mode` and click `load unpacked` and point it to the build folder.
If all previous steps from `what you need` are done correctly, you are able to use this extension for your needs

# what's most important
the `config.js` file consists all the credential you need to have (or create on your own) for thi to work


# disclaimer
You propably wont be able to launch it, without some technical skills.


# disclaimer 2
This is an outcome of a ~10h hackaton with a friend(who is interested in going further into web dev) to show the possibilities of React, Firebase and Google Apis.
The extension is published as `as is` - do whatever you want with it, if you like how it's done, let me know :).

