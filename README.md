# colour-cycle

 Modification of Effect Games' [Color Cycling](http://www.effectgames.com/effect/article-Old_School_Color_Cycling_with_HTML5.html) for use as a rotating picture frame

This differs in that the GUI is hidden, and the images are maximised, with slow cycling through images every 10 hours. There's been very little optimisation done, and so there's lots of unused spare code - this could be stripped back significantly. Also, this repo does not include the C++ engine code.

The only other notable difference from the original is the removal of php usage. I refactored `loadImage` to use the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) api, rather than calling a php backend. This does mean that the `.LBM.json` files now are formatted slightly differently in that keys cannot be 'naked' and must be `"keys"`. The test image, `/images/TESTRAMP.LBM.json` is an example of this. To use the test image, just update the `scenes.js` file to only have the TESTRAMP image.

Finally, I've disabled the sound with an early `return` as I don't have any suitable mp3s, and it doesn't really suit a digital-picture-frame type setup.

# Example

For a flavour of what color cycled images look like, there's a live version of the [original](http://www.effectgames.com/demos/canvascycle/). However, those images are not covered under the distributed licence, so are not included in this repository.

# Licence

See LICENSE.md for the fully licence text.

As per the original distribution from the above website, [GNU LGPLv3](https://choosealicense.com/licenses/lgpl-3.0/).

## Known issues

The canvas does not display on (at least some) iOS devices. I'm fairly convinced 