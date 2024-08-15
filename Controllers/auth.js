const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'jwtsecret';
const saltRounds = 10

const conn = require('../Config/db')

exports.register = async(req,res)=>{
    try {
        const { username, password, role } = req.body

        if (!username || !password || !role) {
            return res.status(400).json({
                message: 'Please provide username, password, and role'
            });
        }

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
                conn.execute(sql,
                    [username, hash, role],
                    (err, result) => {
                        if(err) {
                            res.status(500).json({
                                message : err.message
                            })
                            return
                        }
                        res.status(201).json({
                            message : "เพิ่มข้อมูลสำเร็จ",
                            data : result
                        })
                    })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
    // try{

    //   //1. Check user, ตรวจสอบว่ามี user ที่ต้องการลงทะเบียนในฐานข้อมูลแล้วหรือยัง
    //     const { name, password, role } = req.body;
    // //   console.log(req.body)
    //     const chkuser = await User.findOne({ name });
    //     if (chkuser) {
    //         return res.status(400).json({ message: 'User already exists' });
    //     }
        
    //     //2. Create new user and encrypt password.
    //     const salt = bcrypt.genSaltSync(10);
    //     const hashpassword = bcrypt.hashSync(password, salt);
    //     //3. Save user to database.
    //     const user = { name, password:hashpassword, role };
    //     user.save()
    //     res.send(user)
    
    // }catch (err){
    //     console.log(err)
    //     res.status(500).send('Server Error')
    // }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if all required fields are provided
        if (!username || !password) {
            return res.status(400).json({
                message: 'Please provide username and password'
            });
        }

        // Check for the user in the database
        const sql = "SELECT * FROM users WHERE username = ?";
        conn.execute(sql, [username], async (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (results.length === 0) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }

            const user = results[0];

            // Compare the provided password with the hashed password stored in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }

            // Prepare the payload for JWT
            const payload = {
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
            };

            // Generate a JWT token
            jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error generating token'
                    });
                }
                res.status(200).json({ token, payload });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};