import requests

url = "https://trueway-geocoding.p.rapidapi.com/Geocode"

querystring = {"address":"505 Howard St, San Francisco","language":"en"}

headers = {
	"X-RapidAPI-Key": "01836c3714msh582bac2093a6a03p19e6abjsn2b918034e4c0",
	"X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)
data = response.json()

lat = data['results'][0]['location']['lat']
lng = data['results'][0]['location']['lng']

print(f"Lat: {lat}")
print(f"Long: {lng}")