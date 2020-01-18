var Weather = {
    
    addAuthorisation: function(url) {
        return url + "&APPID=" + Keys.weather;
    },

    getWeatherFor: function(lat, lon, cb) {
        // Current weather endpoint https://openweathermap.org/current
        let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric";
        return fetch(this.addAuthorisation(url)).then(res => {
            if(res.status > 400) return Promise.resolve(null);
            return res.json();
        }).then(cb);
    },

    codeToWeather: function(code) {
        if (code > 800) return "Overcast";
        if (code === 800) return "Clear";
        if (code === 741) return "Fog";
        if ([741, 721, 701].includes(code)) return "Fog";
        if (code > 700) return "Fog"; // these are a bit of a mix, so may want to treat differently eg sand whirls, tornados, squall
        if (code >= 600) return "Snow";
        if (code >= 200) return "Rain"; // no 400  or 100 codes, 300 + 500 codes are all rain, 200 is thunderstorm
        return "Clear"; // if in doubt return a default
    }
}