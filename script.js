
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}
window.onload = async () => {
    const coords = await getCoords()
    console.log(coords)

    // Adding map
    const myMap = L.map('map', {
        center: coords,
        zoom: 12,
    });

    // Adding Tiles and layer 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap)

    // Adding Marker
    const marker = L.marker(coords)
    marker.addTo(myMap).bindPopup("You are here !!! ").openPopup()

  addMarkers() 
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}}
	


// get foursquare businesses
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq34s6IwoR9Udymebq1MCHkTONDyfnfZIeAAntEXd9qEIM='
		}
	}
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}

// process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

// // async function places(business) {
// //     console.log('business: ', business)
// //     let ll = coords[0, 1]
// //     let limit = 5
// //     let response = await fetch(`https://api.foursquare.com/v3/places/nearby?ll=${lat}%2C&query=${business}&limit=${limit}`, options)
// //         .then(response => response.json())
// //         .then(res => console.log(res))
// //         .catch(err => console.error(err));

// //     return response
// // }
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)
})

