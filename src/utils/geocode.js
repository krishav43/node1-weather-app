const request = require('request')

const geocode = (address, geocallback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3Jpc2hhdjE3MDM5NiIsImEiOiJja3VlNGE5eXAxZ2k5Mm9sbWRiMTBsYXc2In0.MuLV_1087S2nk--dBPFG7w&limit=1'
    request({ url,json: true }, (error, {body : response}) => {
        if(error){
            geocallback('Unable to connect to geolocation service!',undefined)
        }
        else if(response.error || !response.features[0]){
            geocallback('Unable to find location. Try another search',undefined)
        }
        else{
            const latitude = response.features[0].center[1];
            const logititude = response.features[0].center[0];
            geocallback(undefined,{
                logititude: logititude,
                latitude: latitude,
                placeName: response.features[0].place_name
            })
        }
    })
}

module.exports = geocode