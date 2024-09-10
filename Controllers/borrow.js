const conn = require('../Config/db')

exports.getBorrow = async (req, res) => {
    const {id} = req.params;
    
    try {
        const sql = "SELECT * FROM borrow_transaction";
        conn.execute(sql, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(200).json(results[0]);
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.setBorrow = async (req, res) => {
    const { book_id,user_id,borrow_date,due_date,return_date} = req.body;

    try {
        const sql = "INSERT INTO books(book_id,user_id,borrow_date,due_date,return_date) VALUES(?, ?, ?, ?, ?)";
        conn.execute(sql, [book_id,user_id,borrow_date,due_date,return_date], (err,result) => {
            if(err){
                res.status(500).json({message:err.message})
            }
            res.status(201).json({ message: "Book created successfully", borrow_id: result.insertId});
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error1" });
    }
    
};