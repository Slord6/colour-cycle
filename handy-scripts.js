// http://www.effectgames.com/demos/canvascycle/

/*
* Download the given json data as <filename>.json
*/
let saveJson = function(data, filename){
    data = JSON.stringify(data);
    let badJson = data.replace(/'/g, "\"");
    data = badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');

    if(!data) {
        console.error('No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

/*
* Download an image, make it json, convert to object and pass to callback
*/
let grabImage = function(name, callback) {
    var url = window.location + 'image.php?file=' + name + "&callback=";
    fetch(url).then(resp => resp.blob()).then(blob => blob.text()).then(badJson => {
        badJson = badJson.replace(/'/g, "\"");
        badJson = badJson.replace(/CanvasCycle.processImage\(/, "");
        badJson = badJson.replace(/\);/, "");
        var imageJson = badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
        callback(JSON.parse(imageJson));
    });
}

let name = "V27";
grabImage(name, (img) => saveJson(img, name + ".LBM.json"))

// Should add some wait to this
scenes.forEach((scene) => {
    grabImage(scene.name, (json) => {
        saveJson(json, scene.name + ".LBM.json");
    });
});