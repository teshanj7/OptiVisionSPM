const fs = require('fs');
const router = require("express").Router();
const CataractPost = require("../models/cataractApplication");
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'images/' });

//---------------create Cataract Form---------------------------------
router.post("/addCataract", uploadMiddleware.single('files'), async (req, res) => {
    
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath);

    const {userID,Fullname,Email,Address,TelephoneNumber,Age,Gender} = req.body;

    const postCataract = await CataractPost.create({
        userID,
        Fullname,
        Email,
        Address,
        TelephoneNumber,
        Age,
        Gender,
        image:newPath,
    })
    postCataract.save().then(()=>{
        if (TelephoneNumber < 0 || !TelephoneNumber === 'number') {
            return res.status(400).json({ message: 'Telephone Number must be positive' })
        }
        if (Age <= 0 || !Age === 'number') {
            return res.status(400).json({ message: 'Age must be positive' })
        }
        res.json("Cataract application succefully");
    })
});
//-----------------comment-----------------------------------
router.put("/comment",(req,res) => {
    // const _id = req.params._id;
    const comment = {
        comment : req.body.text,
    }
    CataractPost.findByIdAndUpdate(req.body.cataractID, {
        $push: {comments: comment}
    }, {
        new: true
    }).catch((err,result)=>{
        if(err){
            return res.status(422).json({ error: err })
        }else{
            res.json(result)
        }
    })
})
//-----------------delete comment--------------------------
router.route("/singleCataract/:id/comments/:comment_id").delete(async (req,res) =>{
    const { id, comment_id } = req.params;

    await CataractPost.findByIdAndUpdate(id, { $pull: { comments: { _id: comment_id } } }).then(() =>{
        res.status(200).send({ status: "Cataract comment Deleted" });
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({ status: "Error Deleting comment Details", error: err.message });
    });
})

//---------------get all Cataract Details display for patient----------------------------------
router.route("/viewCataract/:userID").get((req,res) =>{
    const userID = req.params.userID;

    CataractPost.find({userID: userID}).then((cat) =>{
        res.json(cat)
    }).catch((err)=>{
        console.log(err)
    })
})
//---------------get all Cataract Details to display for Doctor----------------------------------
router.get("/viewAllCataract", async(req,res) =>{

    CataractPost.find().then((cat)=>{
        res.json(cat)
    }).catch((err)=>{
        console.log(err)
    })
})

//---------------get one cataract details to display------------------------
router.get("/singleCataract/:id", async(req,res) => {
    const {id} = req.params;

    const postCataract = await CataractPost.findById(id);
    res.json(postCataract);
})

//---------------update cataract form------------------------------------
router.put("/updateCataract/:id",uploadMiddleware.single('files'), async(req,res) => {

    let newPath = null;
    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        newPath = path+'.'+ext
        fs.renameSync(path, newPath);           
    }

    const {id,Fullname,Email,Address,TelephoneNumber,Age,Gender} = req.body;


    const postCataract = await CataractPost.findById(id)

    await postCataract.updateOne({
        Fullname,
        Email,
        Address,
        TelephoneNumber,
        Age,
        Gender,
        image: newPath ? newPath : postCataract.image,
    });
    res.json(postCataract);
})

//----------------delete cataract form----------------------------------
router.delete("/deleteCataract/:id", async(req,res) => {
    const id = req.params.id;

    await CataractPost.findByIdAndDelete(id).then(() =>{
        res.status(200).send({status: "Cataract Details Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error Deleting Cataract Details", error: err.message});
    });
})
module.exports = router;

