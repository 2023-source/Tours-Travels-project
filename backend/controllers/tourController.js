import Tour from "../models/Tour1_mongoose.js"

// create new tour
export const createTour = async(req,res)=>
{
    const newTour = new Tour(req.body)

    try {
        const savedTour = await newTour.save()
        res.status(200).json({success:true, message:'Successfully created', data:savedTour})
        
    } catch (error) {
        res.status(500).json({success:false, message:'Failed to create. Try again'})
    }
}

// update tour
export const updateTour = async(req,res)=>
{
    const id = req.params.id
    try {
        
        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set:req.body
        },{new:true})

        res.status(200).json({success:true, message:'Successfully updated', data:updateTour})

    } catch (err) {

        res.status(500).json({success:false, message:'Failed to update. Try again'})
    }
}

//  delete tour
export const deleteTour = async(req,res)=>
{
    const id = req.params.id
    try {
        
        await Tour.findByIdAndDelete(id)

        res.status(200).json({success:true, message:'Successfully deleted'})

    } catch (err) {

        res.status(500).json({success:false, message:'Failed to delete. Try again'})
    }
}

// getSingle tour
export const getSingleTour = async(req,res)=>
{
   const id = req.params.id
    try {
        
        const tour = await Tour.findById(id)

        res.status(200).json({success:true, message:'Successfully', data:tour})

    } catch (err) {

        res.status(404).json({success:false, message:'not found. Try again'})
    }
}

// getAll tour
export const getAllTour = async(req,res)=>
{

   try {     
        const tours = await Tour.find({})

        res.status(200).json({success:true, message:'Successfully added all', data:tours})

    } catch (err) {

        res.status(404).json({success:false, message:'not found. Try again'})
    }
}

// get Tour by Search
export const getTourBySearch = async(req,res)=>
{
    // i is case sensitive
    const city = new RegExp(req.query.city, 'i') // Create a case-insensitive regular expression for the city query parameter

    const distance = parseInt(req.query.distance) //Parse the distance query parameter as an integer
    const maxGroupSize = parseInt(req.query.maxGroupSize) //Parse the maxGroupSize query parameter as an integer

    try {
        const tours = await Tour.find({city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}})

        res.status(200).json({success:true, message:'Successfully Tor search', data:tours})

    } catch (err) {
        res.status(404).json({success:false, message:'not found. Try again'})
        
    }
}

// getFeatured tour
export const getFeaturedTour = async(req,res)=>
{

   try {     
        const tours = await Tour.find({featured:true}).limit(8)

        res.status(200).json({success:true, message:'Successfully deleted', data:tours})

    } catch (err) {

        res.status(404).json({success:false, message:'not found. Try again'})
    }
}

// get tour count
export const getTourCount = async(req,res)=>
{
    try {     
        const tourCount = await Tour.estimatedDocumentCount()

        res.status(200).json({success:true, data:tourCount})

    } catch (err) {

        res.status(404).json({success:false, message:'failed to fetch'})
    }
}