const express = require("express")
const router = express.Router()
const path = require('path')
const fs = require('fs')

const diseaseFilePath = path.join(__dirname, 'medinfo.json')

// @desc    Get All Diseases
// @route   GET /diseases/allDiseases?page=${}&limit=6
// @returns Object of page, limit, total diseases and Diseases Array
// @access  Public
router.get('/allDiseases', (req, res) => {
    try {
        fs.readFile(diseaseFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error reading the JSON file" })
                return;
            }

            const diseases = JSON.parse(data)

            // Get query parameters for pagination
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 6
            const startIndex = (page - 1) * limit
            const endIndex = startIndex + limit

            // Get the paginated data
            const paginatedDiseases = diseases.slice(startIndex, endIndex)

            // Extract only Disease and Description properties
            const simplifiedDiseases = paginatedDiseases.map(disease => ({
                Disease: disease.Disease,
                Description: disease.Description
            }));

            // Prepare the response with pagination info
            const response = {
                page: page,
                limit: limit,
                totalDiseases: diseases.length,
                diseases: simplifiedDiseases
            }

            res.status(200).json(response)
        })
    } catch (err) {
        res.status(500).json({ message: `Error fetching data from JSON file: ${err}` })
    }
})

// @desc    Get One Diseases
// @route   GET /diseases/disease?name=${}
// @returns Object of specific Disease containing disease, symptom, description and precaution
// @access  Public
router.get("/disease", (req, res) => {
    try {
        fs.readFile(diseaseFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error reading the JSON file" })
                return
            }
            const diseases = JSON.parse(data)

            // Get the disease name from the query parameter
            const diseaseName = req.query.name
            if (!diseaseName) {
                res.status(400).json({ message: "Disease name query parameter is required" })
                return
            }

            // Find the disease object with the specified name
            const oneDisease = diseases.find(disease => disease.Disease.toLowerCase() === diseaseName.toLowerCase())

            if (!oneDisease) {
                res.status(404).json({ message: "Disease not found" })
                return
            }

            res.status(200).json(oneDisease)

        })
    } catch (err) {
        res.status(500).json({ message: `Error fetching data from JSON file: ${err}` })
    }
})

/**ADMIN ACCESS ROUTES**/
// @desc    Add a New Disease
// @route   POST /diseases/addDisease
// @access  Private
router.post('/addDisease', (req, res) => {
    try {
        fs.readFile(diseaseFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error reading the JSON file" })
                return
            }
            let diseases = JSON.parse(data)

            const newDisease = {
                Disease: req.body.Disease,
                Symptoms: req.body.Symptoms,
                Description: req.body.Description,
                Precautions: req.body.Precautions
            }

            diseases.push(newDisease)

            fs.writeFile(diseaseFilePath, JSON.stringify(diseases, null, 2), (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error writing to the JSON file" })
                    return
                }

                res.status(200).json({ message: "Disease added successfully", disease: newDisease })
            })
        })
    } catch (err) {
        res.status(500).json({ message: `Error processing request: ${err}` })
    }
})

// @desc    Add a New Disease
// @route   PUT /diseases/updateDisease?name=${}
// @access  Private
router.put('/updateDisease', (req, res) => {
    try {
        fs.readFile(diseaseFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error reading the JSON file" })
                return
            }
            let diseases = JSON.parse(data)

            // Get the disease name from the query parameter
            const diseaseName = req.query.name
            if (!diseaseName) {
                res.status(400).json({ message: "Disease name query parameter is required" })
                return
            }

            // Find the index of the disease object with the specified name
            const diseaseIndex = diseases.findIndex(disease => disease.Disease.toLowerCase() === diseaseName.toLowerCase())

            if (diseaseIndex === -1) {
                res.status(404).json({ message: "Disease not found" })
                return
            }

            // Update the disease details
            diseases[diseaseIndex] = {
                Disease: req.body.Disease,
                Symptoms: req.body.Symptoms,
                Description: req.body.Description,
                Precautions: req.body.Precautions
            }

            // Write the updated array back to the file
            fs.writeFile(diseaseFilePath, JSON.stringify(diseases, null, 2), (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error writing to the JSON file" })
                    return
                }

                res.status(200).json({ message: "Disease updated successfully", disease: diseases[diseaseIndex] })
            })
        })
    } catch (err) {
        res.status(500).json({ message: `Error processing request: ${err}` })
    }
})

// @desc    DELETE One Disease
// @route   DELETE /diseases?name=${}
// @access  Private
router.delete("/", (req, res)=>{
    try {
        fs.readFile(diseaseFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error reading the JSON file" })
                return
            }
            let diseases = JSON.parse(data)

            // Get the disease name from the query parameter
            const diseaseName = req.query.name
            if (!diseaseName) {
                res.status(400).json({ message: "Disease name query parameter is required" })
                return
            }

            // Find the index of the disease object with the specified name
            const diseaseIndex = diseases.findIndex(disease => disease.Disease.toLowerCase() === diseaseName.toLowerCase())

            if (diseaseIndex === -1) {
                res.status(404).json({ message: "Disease not found" })
                return
            }

            // Remove the disease from the array
            diseases.splice(diseaseIndex, 1)

            // Write the updated array back to the file
            fs.writeFile(diseaseFilePath, JSON.stringify(diseases, null, 2), (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error writing to the JSON file" })
                    return
                }

                res.status(200).json({ message: "Disease deleted successfully" })
            })
        })
    } catch (err) {
        res.status(500).json({ message: `Error processing request: ${err}` })
    }
})

module.exports = router;
