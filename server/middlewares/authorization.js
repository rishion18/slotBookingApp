
const authorisedRoles = (...allowedUsers) => (req , res , next) => {
    const role = req.user.role;
    // const allowedUsers = ["ADMIN" , "SUPERADMIN"];
    if(!allowedUsers.includes(role)){
        return  res.status(403).send('You are not authorised!')
    }

    next();
}

export default authorisedRoles;