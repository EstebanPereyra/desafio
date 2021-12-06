export const authMiddlaware = (req, res, netx) => {
    const admin = true;
    req.auth = admin;
    if(!req.auth) res.status(403).send({error:-2, message: "NO AUTORIZADO"})
    else netx()
}