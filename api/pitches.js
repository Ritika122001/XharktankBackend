const express = require("express");

const Offers = require("../models/offer"); //Schema for Offers
const Pitch = require("../models/pitch"); //Schema for Pitches

const Router = express.Router(); //Using Express Router

//Function to check the validity of the data
function check(s) 
{
  if (s === "" || s === null) 
  {
    return true;
  }

  return false;
}

// 1st Endpoint to post the pitch with following details

Router.post("/", async (req, res) => {
  try {

    //getting the data from the request body
    const { entrepreneur, pitchTitle, pitchIdea, askAmount, equity } = req.body;

    if (
      check(entrepreneur) ||
      check(pitchTitle) ||
      check(pitchIdea) ||
      askAmount <= 0
    ) 
    {
      throw new Error("Invalid data");
    }

    if (equity > 100) {
      throw new Error("Invalid data");
    }

    //creating pitch using PitchSchema
    const NewPitch = await Pitch.create({
      entrepreneur,
      pitchTitle,
      pitchIdea,
      askAmount,
      equity,
    });

//Returning the Pitch Id
    return res.status(201).json({ id: NewPitch._id }); 
  } catch (error) {
    return res.status(400).send("Invalid Request Body"); //Error Occured
  }
});

// 2nd Endpoint to make the offer by investor to a specific Pitch

Router.post("/:id/makeOffer", async (req, res) => {
  try {

    //Getting the data from request body

    const { investor, amount, equity, comment } = req.body;
    const { id } = req.params;

    if (check(investor) || check(comment) || amount <= 0) {
      //checking validity of the data
      throw new Error("Invalid data");
    }

    if (equity > 100) {
      throw new Error("Invalid data");
    }

    //Creating offer using Offer schema

    const NewOffer = await Offers.create({
      investor,
      amount,
      equity,
      comment,
    });

    //Updating pitch data by finding the id
    const updatePitch = await Pitch.findByIdAndUpdate(
      id,
      {
        $push: { offers: NewOffer._id },
      },
      { new: true }
    );

    if (!updatePitch) {
      return res.status(404).send("Pitch Not Found");
    }

//Returning the id of the offer
    return res.status(201).json({ id: NewOffer._id }); 
  } catch (error) {
    return res.status(400).send("Invalid Request Body");
  }
});

//3rd Endpoint to get all the pitches

Router.get("/", async (req, res) => {
  try {

    //offers in decreasing order
    const data = await Pitch.find().sort({ createdAt: -1 }).populate("offers");

    //Iterating on the data
    const Data = data.map((it) => {
      const dataof = {
        id: it._id,
        entrepreneur: it.entrepreneur,
        pitchTitle: it.pitchTitle,
        pitchIdea: it.pitchIdea,
        askAmount: it.askAmount,
        equity: it.equity,
      };

      dataof.offers = it.offers.map((it2) => {
        return {
          id: it2._id,
          investor: it2.investor,
          amount: it2.amount,
          equity: it2.equity,
          comment: it2.comment,
        };
      });

      return dataof;
    });

    //returning all the pitches along with their offers

    return res.status(200).json(Data);
  } 
  catch (error) {
    return res.status(400).send("Internal Server Error");
  }

});

//4th Endpoint of getting the pitch of a specific Id

Router.get(":id", async (req, res) => {
 
  try {

    const { id } = req.params;

//Populating the offers by finding the id of Pitch
    const data = await Pitch.findById(id).populate("offers");

    if (!data) 
    {
      return res.status(404).send("Pitch Not Found");
    }

    const dataof = 
    {
      id: id,
      entrepreneur: data._doc.entrepreneur,
      pitchTitle: data._doc.pitchTitle,
      pitchIdea: data._doc.pitchIdea,
      askAmount: data._doc.askAmount,
      equity: data._doc.equity,
      offers: data._doc.offers,

    };

 //Iterating on the offers array
    const NewOffers = data._doc.offers.map((each) => {
      return {
        id: each._id,
        investor: each.investor,
        amount: each.amount,
        equity: each.equity,
        comment: each.comment,
      };
    });

    dataof.offers = NewOffers;

    //Returning the data of the specific pitch 
    return res.status(200).json(dataof); 
  } catch (error) {
    return res.status(400).send("Internal Server Error");
  }
});

module.exports = Router;

//End