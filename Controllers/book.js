const conn = require('../Config/db')

exports.getBook = async (req, res) => {
    const {id} = req.params;
    
    try {
        const sql = "SELECT * FROM book WHERE book_id = ?";
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

exports.getAllBooks = async (req, res) => {
    try {
        const sql = "SELECT * FROM book";
        conn.execute(sql, [], (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.createBook = async (req, res) => {
    const { book_name, book_desc, booktype , author , publisher , publis_year,price ,total_quantity,aviable_quantity } = req.body;

    try {
        const sql = "INSERT INTO book (book_name, book_desc, book_type , author , publisher , publis_year,price ,total_quantity,aviable_quantity) VALUES (?, ?, ?,?, ?, ?,?, ?, ?)";
        conn.execute(sql, [book_name, book_desc, booktype , author , publisher , publis_year,price ,total_quantity,aviable_quantity], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ message: "Book created successfully", book_id: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { book_name, book_desc, total_quantity } = req.body;

    try {
        const sql = "UPDATE book SET book_name = ?, book_desc = ?, total_quatity = ? WHERE book_id = ?";
        conn.execute(sql, [book_name, book_desc,total_quantity,id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(200).json({ message: "Book updated successfully" });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete associated book items first (to maintain referential integrity)
        const deleteBookItemsSql = "DELETE FROM bookitem WHERE book_id = ?";
        conn.execute(deleteBookItemsSql, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            // Then delete the book
            const deleteBookSql = "DELETE FROM book WHERE book_id = ?";
            conn.execute(deleteBookSql, [id], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Book not found" });
                }
                res.status(200).json({ message: "Book deleted successfully" });
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
