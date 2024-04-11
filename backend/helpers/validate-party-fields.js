//validateFields middleware

const ValidateFields = (req, res, next) => {
    try {
        const {title, description, party_date } = req.body;
        console.log(title, description, party_date)
        //validations
        if(_.isEmpty(title)  || _.isEmpty(description)  ||  party_date.length === 0){
            return res.status(400).json({error: "Title, Description and Party Date are required."});
        } else {
            next();
        };
    } catch (error) {
        if(error && error.errors.partyDate) {
            return res.status(400).json({error: "Title, Description and Party Date are required."});
        };
    }
}
