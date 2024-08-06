# DOCUMENTATION FOR dailyTips API 

## Routes
1. '/dailyTips/tips' 
 This route RETURNS an object of 6 items.
 This is for use in the daily tips section of the hompage. 
 Each item includes a Title, Image Url and ID.
 Example-
   ```json
    "dataPackage1": {
    "url": "https://health.gov/sites/default/files/2022-07/gs.jpg",
    "id": "531",
    "title": "Get Screened"
     }
```
2. '/dailyTips/tip/:id' 
 This route RETURNS an object with the information for a single tip.
 This is for use in an expanded daily tip page.
 The object includes an Image Url, Alternative Image, LastUpdated(which is compulsory in the TOS of the myhealthfinder API), and Mainbody (which is an array of the main info to be displayed on the webpage).
 Example-
   ```json
    "imageAlt": "A young boy with dark hair and brown skin smiles at the camera and holds his backpack.",
    "imageUrl": "https://health.gov/sites/default/files/2023-03/Child-HPV-Vaccine_950604178.jpg",
    "lastUpdated": "1/20/1970 9:25:18 PM",
    "mainBody": [
        {
        "Title": "The Basics: Overview",
        "Description": "",
        "Content": "<p><span>All pre-teens need 2 doses of the HPV vaccine (shot) when they are age 11 or 12.</span></p><h4><span>What is HPV?</span></h4><p><span>HPV (human papillomavirus) is a...etc"
        },
        {
        "Title": "The Basics: Recommended Ages",
        "Description": "",
        "Content": "<h4>When does my child need to get the HPV vaccine?</h4><p><span>Doctors recommend that all...etc"
        }]
```

## MyHealthfinderAPITermsofUse
1. The user must display the MyHealthfinder logo and URL as the content source wherever MyHealthfinder content is used. To properly use the MyHealthfinder API, we ask you to embed the following code wherever MyHealthfinder content appears on your site.

---FRONTEND DEVS PLEASE INCLUDE THIS IN RELEVANT PAGES---
2. The logo and URL only need to appear once on a webpage where MyHealthfinder content appears. Please reference MyHealthfinder as the source, provide credit and link to health.gov/myhealthfinder. You don’t need to display the URL — wrapping the URL around the MyHealthfinder logo is the proper format.
    Code:
    ```html
    <a href="https://health.gov/myhealthfinder" title="MyHealthfinder">
    <img src="https://health.gov/themes/custom/healthfinder/images/MyHF.svg" alt="MyHealthfinder"/>
    </a>
    ```
---FRONTEND DEVS PLEASE INCLUDE THIS IN RELEVANT PAGES---

3. When displaying topic details, inform visitors of the last time the content was updated.
Example:
Last Updated: 3/1/2020 12:00:00 AM

4. You can put MyHealthfinder content anywhere on your website.

5. Do not manipulate or alter the MyHealthfinder content. The MyHealthfinder results are evidence-based and require careful maintenance and oversight by the MyHealthfinder team to ensure they're up to date.

6. If the content is mashed up or presented with other content, please ensure that the content provides related value, is consistent with the MyHealthfinder content, and does not harm the integrity of the MyHealthfinder content.

7. Use best practices to determine when to use the MyHealthfinder API in real-time versus when to use the API to gather the MyHealthfinder content and store it in a local database.