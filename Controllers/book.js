const conn = require('../Config/db')

exports.getBook = async (req, res) => {
    const { book_id } = req.params;

    try {
        const sql = "SELECT * FROM book WHERE book_id = ?";
        conn.execute(sql, [book_id], (err, results) => {
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
    const { book_name, book_desc, booktype_id, author_id, publisher_id } = req.body;

    try {
        const sql = "INSERT INTO book (book_name, book_desc, booktype_id, author_id, publisher_id) VALUES (?, ?, ?, ?, ?)";
        conn.execute(sql, [book_name, book_desc, booktype_id, author_id, publisher_id], (err, result) => {
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
    const { book_id } = req.params;
    const { book_name, book_desc, book_type, author, publisher } = req.body;

    try {
        const sql = "UPDATE book SET book_name = ?, book_desc = ?, book_type = ?, author = ?, publisher = ? WHERE book_id = ?";
        conn.execute(sql, [book_name, book_desc, book_type, author, publisher, book_id], (err, result) => {
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
    const { book_id } = req.params;

    try {
        // Delete associated book items first (to maintain referential integrity)
        const deleteBookItemsSql = "DELETE FROM bookitem WHERE book_id = ?";
        conn.execute(deleteBookItemsSql, [book_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            // Then delete the book
            const deleteBookSql = "DELETE FROM book WHERE book_id = ?";
            conn.execute(deleteBookSql, [book_id], (err, result) => {
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
