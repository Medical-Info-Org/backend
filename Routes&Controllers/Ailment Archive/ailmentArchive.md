# DOCUMENTATION FOR Disease Library (AILMENT ARCHIVE) API 

## Routes
1. GET '/diseases/allDiseases?page=${}&limit=6'
 **This route returns all diseases(with just the DIseasename and Description Property) but paginates them by returning 6 at a time
 **Also returns the page, limit and totalDiseases avialable
 **The frontend should initialize by making a request to /allDiseases?page=1&limit=6 to get the first set of diseases.
 **When the 'see more' button is clicked, the frontend should increment the page parameter and make another request, for example, /allDiseases?page=2&limit=6, to get the next set of diseases.
 **This process continues, incrementing the page number with each 'see more' button click, to load additional diseases.
Example-
Request is sent to /diseases/allDiseases?page=1&limit=2
```json
{
  "page": 1,
  "limit": 6,
  "totalDiseases": 41,
  "diseases": [
    {
      "Disease": "Hypoglycemia",
      "Description": " Hypoglycemia is a condition in which your blood sugar (glucose) level is lower than normal. Glucose is your body's main energy source. Hypoglycemia is often related to diabetes treatment. But other drugs and a variety of conditions - many rare - can cause low blood sugar in people who don't have diabetes."
    },
    {
      "Disease": "Peptic ulcer diseae",
      "Description": "Peptic ulcer disease (PUD) is a break in the inner lining of the stomach, the first part of the small intestine, or sometimes the lower esophagus. An ulcer in the stomach is called a gastric ulcer, while one in the first part of the intestines is a duodenal ulcer."
    }
  ]
}
```

2. GET  '/diseases/disease?name=${}'
**This route returns a single disease using a query of the Diseases name
Example-
Request is sent to /diseases/disease?name=Hypoglycemia
```json
 {
  "Disease": "Hypoglycemia",
  "Symptoms": [
    " vomiting",
    "excessive_hunger",
    "slurred_speech",
    "anxiety",
    "palpitations",
    "blurred_and_distorted_vision",
    "headache",
    "nausea",
    "drying_and_tingling_lips",
    "irritability",
    "sweating",
    "fatigue"
  ],
  "Description": " Hypoglycemia is a condition in which your blood sugar (glucose) level is lower than normal. Glucose is your body's main energy source. Hypoglycemia is often related to diabetes treatment. But other drugs and a variety of conditions - many rare - can cause low blood sugar in people who don't have diabetes.",
  "Precautions": [
    "lie down on side",
    "check in pulse",
    "drink sugary drinks",
    "consult doctor"
  ]
}
```

### Private routes 
3. POST '/diseases/addDisease'
**Adds a new Disease
**The new disease is sent as a form in the format:
```json
{
    "Disease": "",
    "Symptoms": "",
    "Description": "",
    "Precautions": ""
}
```
4. PUT '/diseases/updateDisease'
**Updates an existing Disease
**The update is sent as a form in the format:
```json
{
    "Disease": "",
    "Symptoms": "",
    "Description": "",
    "Precautions": ""
}
```
5. DELETE '/diseases?name=${}
**Deletes a single disease based on the name query