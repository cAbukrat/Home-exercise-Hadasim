const memberModel = require('../models/memberModel')

const getAllMembers = () => {
    return memberModel.find({})
}

const getMemberById = (id) => {
    return memberModel.findById(id)
}

const addMember = async (obj) => {
    const member = new memberModel(obj)
    await member.save()
    return 'Created successfully!'
}

const updateMember = async (id, obj) => {
    await memberModel.findByIdAndUpdate(id, obj)
    return 'Updated successfully!'
}

const deleteMember = async (id) => {
    await memberModel.findByIdAndDelete(id)
    return 'Deleted successfully!'
}

const uploadProfileImage = async (id, uploadedImage) => {
    await memberModel.findByIdAndUpdate(id, { profileImage: uploadedImage.path });
    return uploadedImage.path;
}



module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember,
    getMemberById,
    uploadProfileImage
}