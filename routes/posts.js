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

router.get('/read',function(req,res)
   {
    Post.findOne({},{LOCATION:1})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/search', function(req,res){
  Post.find({'BOROUGH':"MANHATTAN" },{BOROUGH:1}).limit(10)
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));

})


router.route('/geoSearch/:LONGITUDE/:LATITUDE').get((req, res) => {
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