const express = require('express')
const membersBL = require('../BL/membersBL')
const multer = require('multer');

const router = express.Router();

//Get All Members
router.route('/').get(async(req, res) => {
    try {
        const members = await membersBL.getAllMembers()
        res.json(members)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get Member By ID
router.route('/:id').get(async(req, res) => {
    try {
        const { id } = req.params
        const member = await membersBL.getMemberById(id)
        res.json(member)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Add Member
router.route('/').post(async(req, res) => {
    try {
        const obj = req.body
        const result = await membersBL.addMember(obj)
        res.json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//Update Member
router.route('/:id').put(async(req, res) => {
    try {
        const { id } = req.params
        const obj = req.body
        const status = await membersBL.updateMember(id, obj)
        res.json(status)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//Delete Member
router.route('/:id').delete(async(req, res) => {
    try {
        const { id } = req.params
        const status = await membersBL.deleteMember(id)
        res.json(status)
    } catch (error) {
        res.status(500).json( error.message )
    }
})

//Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

//Upload Profile Image
router.put('/:id/uploadImage', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const uploadedImage = req.file; 
        const result = await membersBL.uploadProfileImage(id, uploadedImage);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;

