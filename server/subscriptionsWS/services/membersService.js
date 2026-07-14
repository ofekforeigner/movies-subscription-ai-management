const membersRepo = require('../repositories/membersRepo')
const subsRep = require('../repositories/subscriptionsRepo');

const getAll = () => {
    return membersRepo.getAllMembers();
}

const getById = (id) => {
    return membersRepo.getById(id);
};

const addMember = (obj) => {
    return membersRepo.addMember(obj);
};

const updateMember = (id, obj) => {
    return membersRepo.updateMember(id, obj);
};

const deleteMember = async (id) => {
    const sub = await subsRep.getAllSubscriptionsByUserId(id)
    if (sub.length > 0) {
        await subsRep.deleteSubscription(sub[0].id)
    }
    return membersRepo.deleteMember(id);
};

module.exports = { getAll, getById, addMember, updateMember, deleteMember }