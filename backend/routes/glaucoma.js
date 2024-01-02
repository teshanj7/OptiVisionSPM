const fs = require('fs');
const router = require("express").Router();
const GlaucomaPost = require("../models/glaucoma");
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'glaucomaImages/' });

router.post("/addGlaucoma", uploadMiddleware.single('files'), async (req, res) => {
    
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath);

    const {userID} = req.body;

    const postGlaucoma = await GlaucomaPost.create({
        userID,
        image:newPath,
    })
    res.json(postGlaucoma);
});