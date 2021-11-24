const router = require('express').Router();
const { request } = require('express');
const Post=require('../models/Posts');



//ROUTES



// router.route('/:longi').get(async(req, res) => {
//     var long = req.params.long;
//     var lat = req.params.lat;
//     try{
//         // const locat=await Post.get(long)
//         res.json(long)
//         console.log(long)
//     }
//     catch(err){res.json('Error: ' + err)};
//   });




router.get('/rit',(req,res) => {
      res.send("Go Tigers!!")
});

// router.route('/').get((req,res)=>{
//     Post.find({description:req.body}).limit(5)
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

router.get('/',(req,res) => {
    res.send("Go RIT!")
});
router.get('/pani',(req,res) => {
  res.send("Go!")
});




// router.route('/count/:NameOfListing').get((req, res) => {
//     async function findOneListingByName(client,NameOfListing){
//         const result= await Post.findOne({BOROUGH : NameOfListing});
//         if(result){
//             console.log(`found list --'${NameOfListing}'`);
//             console.log(result);
//         }else{
//             console.log(`no log founded for '${NameOfListing}' `);
//         }
//     }

    
//     }.toArray((err, docs) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(docs));
    
//     findOneListingByName().catch(console.error);
//   });

// })


//finds a one radom data record
router.get('/read',async(req,res)=>
  {
    Post.findOne({},{LOCATION:1})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));

});


//Counts incidents in each BOROUGH where atleast one person were killed
router.get('/atleast_1',async(req,res)=>{
  var bor=req.params.search;
  //var dat=req.params.date;
  Post.aggregate( [{$match :{"PERSONS KILLED":{$ne:"0"}}},{$group:{_id:"$BOROUGH",count: { $sum: 1 }}}])
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));

})

router.get('/search/q',async(req,res)=>{
  var bor=req.params.search;
  //var dat=req.params.date;
  Post.aggregate( [{$match :{"PEDESTRIANS KILLED":"2"}},{$group:{_id:"$BOROUGH",count: { $sum: 1 }}}])
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));

})


//output_explain:---gives no.of PERSONS KILLED where '_id' defines count of killed, 'count' representes total till on that location overall
router.get('/perkilled/:LONGITUDE/:LATITUDE',async(req,res)=>{
  var lon=req.params.LONGITUDE;
  var lat=req.params.LATITUDE;
  Post.aggregate( [{$match :{LONGITUDE:lon,LATITUDE:lat }},{$group:{_id:"$PERSONS KILLED",count: { $sum: 1 }}}])
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));

})



//output_explain:---gives no.of PERSONS INJURED where '_id' defines count of injured, 'count' representes total till on that location overall
router.get('/perinjured/:LONGITUDE/:LATITUDE',async(req,res)=>{
  var lon=req.params.LONGITUDE;
  var lat=req.params.LATITUDE;
  Post.aggregate( [{$match :{LONGITUDE:lon,LATITUDE:lat }},{$group:{_id:"$PERSONS INJURED",count: { $sum: 1 }}}])
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));

})






router.route('/geoSearch/:LONGITUDE/:LATITUDE').get(async(req, res) => {
  var long = req.params.LONGITUDE;
  var lat = req.params.LATITUDE;
  Post.find({
      geoLoc:{
          $geoNear:{
              $geometry: {
                  type:"Point",
                  coordinates: [long, lat]
              },
              $maxDistance: 5000
          }
      }
  },{LOCATION:1,BOROUGH:1}).limit(5)
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json('Error: ' + err));
});



// router.route('/geoSearch').get((req, res) => {
//     var LONGITUDE = req.params.longitude;
//     var LATITUDE = req.params.latitude;
//     Post.find( 
//         {
//           '$project': {
//             '_id': 0, 
//             'LOCATION': 1
//           }
//         }
//       ).limit(5)
//     .then(data => {
//       res.json(data)
//       console.log(data)
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
//   })





module.exports=router;