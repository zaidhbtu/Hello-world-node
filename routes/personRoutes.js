const express = require('express');
const router = express.Router();
const Person = require("../models/Person");



// GET Method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    // What this Person.find() did it will read
    // all the Person data which are saved inside our db.
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contain the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new Person to the database
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Update Person Data
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true, // Return the update document which we update
      runValidators: true, // Run Mongoose validation. which we create in our Person model.
    });

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }


    console.log("Data Updated");
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Delete Routes
router.delete('/:id', async(req,res) => {
  try {
    const personId = req.params.id;
    
    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }

    console.log("Data Deleted");
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;