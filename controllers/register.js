const handleRegister = (db, bcrypt)=> (req,res) =>{
    
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);

    if(!name || !email || !password){
        return res.status(400).json('invalid form submissions');
    }

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user =>{
                res.json(user[0]);
                // console.log(response);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
   
    .catch(err => {
        res.status(400).json('unable to register');
    });
    
}

module.exports = {
    handleRegister: handleRegister
}