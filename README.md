# Mushroom Identification API
This API allows users to identify mushrooms by providing information about the mushroom and submitting a report. The API allows users to search for mushroom data by name, fetch reports, and update or delete reports.

## Table of Contents
- Installation
- API Endpoints
- Example Data
- Contributing
- License

## Installation
To get started with the Mushroom Identification API, follow these steps:

Clone the repository:
bash```
git clone https://github.com/yourusername/mushroom-identification-api```

Change to the project directory:
bash```
cd mushroom-identification-api```

Install the dependencies:
bash```
npm install```

Start the server:
bash```
npm start```

The API will now be running on http://localhost:3000.

## API Endpoints
Below is a more detailed description of the available API endpoints:

### Mushroom Endpoints
-GET /api/mushrooms: Fetch all mushrooms.
Response: An array of mushroom objects containing details such as common name, latin name, attributes, habitat, etc.
json
```
{
  "mushrooms": [
    {
      "commonName": "Common Mushroom",
      "latinName": "Agaricus bisporus",
      ...
    },
    ...
  ]
}
```
- GET /api/mushrooms/:name: Fetch a mushroom by its common name.
URL Parameter: name - The common name of the mushroom.
Response: An array of mushroom objects that match the specified common name.
json
```
{
  "mushrooms": [
    {
      "commonName": "Common Mushroom",
      "latinName": "Agaricus bisporus",
      ...
    }
  ]
}
```
### Report Endpoints
-GET /api/reports: Fetch all reports.
Response: An array of report objects containing details such as location, image URL, username, timestamp, species, etc.
json
```
{
  "reports": [
    {
      "location": { "lat": 54.597, "long": -5.9301 },
      "img_url": "https://example.com/mushroom1.jpg",
      ...
    },
    ...
  ]
}
```
- GET /api/reports/:report_id: Fetch a report by its ID.
URL Parameter: report_id - The ID of the report.
Response: A report object containing details such as location, image URL, username, timestamp, species, etc.
json
```
{
  "report": {
    "location": { "lat": 54.597, "long": -5.9301 },
    "img_url": "https://example.com/mushroom1.jpg",
    ...
  }
}
```
- POST /api/reports: Create a new report.
Request Body: A report object with required keys (location, img_url, username, time_stamp, and species).
Response: The created report object.
json
```
{
  "report": {
    "location": { "lat": 54.597, "long": -5.9301 },
    "img_url": "https://example.com/mushroom1.jpg",
    ...
  }
}
```
- PATCH /api/reports/:report_id: Update a report by its ID.
URL Parameter: report_id - The ID of the report.
Request Body: An object containing the suggestedSpecies key.
Response: The updated report object.
json
```
{
  "report": {
    "location": { "lat": 54.597, "long": -5.9301 },
    "img_url": "https://example.com/mushroom1.jpg",
    ...
  }
}
```
- DELETE /api/reports/:report_id: Delete a report by its ID.
URL Parameter: report_id - The ID of the report.
Response: The deleted report object.
json
```
{
  "report": {
    "location": { "lat": 54.597, "long": -5.9301 },
    "img_url": "https://example.com/mushroom1.jpg",
    ...
  }
}
```
These endpoints allow users to retrieve, create, update, and delete information related to mushrooms and reports. Please refer to the example data provided in the Example Data.

## Example Data
Here's an example of the data structure for a mushroom:

json```
{
  "commonName": "Common Mushroom",
  "latinName": "Agaricus bisporus",
  "order": "Agaricales",
  "genus": "Agaricus",
  "attributes": {
    "cap": "Large, fleshy cap that is convex when young and flattens with age. The cap is usually brown, but can be white or tan.",
    "stem": "Thick stem with a ring near the top. The stem is usually white, but can have brown scales near the base.",
    "gills": "The gills are closely spaced and white or pink. They turn dark brown as the mushroom matures.",
    "spores": "The spores are dark brown and elliptical in shape."
  },
  "habitat": "Grasslands and meadows.",
  "months": ["Jun", "Jul", "Aug", "Sep"],
  "colors": ["White", "Brown"],
  "toxic": false,
  "averageHeight": 80
}```

Here's an example of the data structure for a report:

json```

{
  "location": { "lat": 54.597, "long": -5.9301 },
  "img_url": "https://example.com/mushroom1.jpg",
  "username": "user1",
  "time_stamp": "2022-10-01T10:15:30Z",
  "notes": "Found this mushroom in the forest",
  "species": { "species": "Common Mushroom", "votes": 1 },
  "credibility": 0.9,
  "alternate_species": [
    { "species": "Common Mushroom", "votes": 1 },
    { "species": "Shaggy Ink Cap", "votes": 1 }
  ],
  "prevalence": 0.1
}```

## Contributing
Please feel free to submit issues or pull requests for any bugs or feature requests.

## License
This project is licensed under the MIT License.
