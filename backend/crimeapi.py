import requests



# crime data by zip code candidate 1 
url = "https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data"

querystring = {"zip":"66049"}

headers = {
	"X-RapidAPI-Key": "abb6831505msh0c50a361893b679p152f46jsn439e4eba5ca4",
	"X-RapidAPI-Host": "crime-data-by-zipcode-api.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())

# {'Overall': {'Zipcode': '66049', 'Overall Crime Grade': 'F', 'Violent Crime Grade': 'A-', 'Property Crime Grade': 'F', 'Other Crime Grade': 'A', 'Fact': 'A crime occurs every 2 hours 43 minutes (on average) in 66049.', 'Risk': '300%', 'Risk Detail': 'Your home is 300% more likely to be robbed with no home security system.'}, 'Crime BreakDown': [{'Violent Crime Rates': {'Assault': '1.242', 'Robbery': '1.068', 'Rape': '0.5084', 'Murder': '0.0317'}, '0': {'Total Violent Crime': '2.850', 'Total Violent Crime Score': '(A-)'}}, {'Property Crime Rates': {'Theft': '81.75', 'Vehicle Theft': '3.614', 'Burglary': '4.162', 'Arson': '0.0337'}, '0': {'Total Property Crime': '89.56', 'Total Property Crime Score': '(F)'}}, {'Other Crime Rates': {'Kidnapping': '0.0492', 'Drug Crimes': '0.6006', 'Vandalism': '2.554', 'Identity Theft': '0.9337', 'Animal Cruelty': '0.0023'}, '0': {'Total Other Rate': '4.139', 'Total Other Score': '(A)'}}], 'Crime Rates Nearby': [{'Nearby Zip': '66045, KS', 'Overall Crime Grade': 'C-', 'Violent Crime Grade': 'D-', 'Property Crime Grade': 'D+'}, {'Nearby Zip': '66047, KS', 'Overall Crime Grade': 'F', 'Violent Crime Grade': 'A', 'Property Crime Grade': 'F'}, {'Nearby Zip': '66044, KS', 'Overall Crime Grade': 'D-', 'Violent Crime Grade': 'D+', 'Property Crime Grade': 'F'}, {'Nearby Zip': '66046, KS', 'Overall Crime Grade': 'F', 'Violent Crime Grade': 'C+', 'Property Crime Grade': 'F'}, {'Nearby Zip': '66050, KS', 'Overall Crime Grade': 'A+', 'Violent Crime Grade': 'A+', 'Property Crime Grade': 'A+'}, {'Nearby Zip': '66073, KS', 'Overall Crime Grade': 'F', 'Violent Crime Grade': 'B+', 'Property Crime Grade': 'F'}, {'Nearby Zip': '66025, KS', 'Overall Crime Grade': 'F', 'Violent Crime Grade': 'A', 'Property Crime Grade': 'F'}, {'Nearby Zip': '66052, KS', 'Overall Crime Grade': 'F', 'Violent Crime Grade': 'A', 'Property Crime Grade': 'F'}, {'Nearby Zip': '66542, KS', 'Overall Crime Grade': 'A+', 'Violent Crime Grade': 'A', 'Property Crime Grade': 'A+'}, {'Nearby Zip': '66409, KS', 'Overall Crime Grade': 'A+', 'Violent Crime Grade': 'A-', 'Property Crime Grade': 'A+'}], 'Similar Population Crime Rates': [{'Similar Zip': '83616, ID', 'Overall Crime Grade': 'A+', 'Violent Crime Grade': 'A+', 'Property Crime Grade': 'A+'}, {'Similar Zip': '77536, TX', 'Overall Crime Grade': 'B', 'Violent Crime Grade': 'A', 'Property Crime Grade': 'A'}, {'Similar Zip': '78217, TX', 'Overall Crime Grade': 'C-', 'Violent Crime Grade': 'D', 'Property Crime Grade': 'D'}, {'Similar Zip': '78242, TX', 'Overall Crime Grade': 'D', 'Violent Crime Grade': 'F', 'Property Crime Grade': 'F'}, {'Similar Zip': '78570, TX', 'Overall Crime Grade': 'D', 'Violent Crime Grade': 'C', 'Property Crime Grade': 'C'}, {'Similar Zip': '78602, TX', 'Overall Crime Grade': 'B+', 'Violent Crime Grade': 'A-', 'Property Crime Grade': 'A-'}, {'Similar Zip': '79720, TX', 'Overall Crime Grade': 'C-', 'Violent Crime Grade': 'D-', 'Property Crime Grade': 'D-'}, {'Similar Zip': '80026, CO', 'Overall Crime Grade': 'C+', 'Violent Crime Grade': 'C-', 'Property Crime Grade': 'C-'}, {'Similar Zip': '80027, CO', 'Overall Crime Grade': 'A', 'Violent Crime Grade': 'A+', 'Property Crime Grade': 'A+'}, {'Similar Zip': '80138, CO', 'Overall Crime Grade': 'C', 'Violent Crime Grade': 'B', 'Property Crime Grade': 'B'}], 'success': True, 'status code': 200}


