const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Student = require("../models/Student")

const { sendEmailWithNodemailer } = require("../helpers/email")
const bcrypt = require("bcryptjs")

// SignUp
exports.signup = async (req, res) => {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return res.status(409).json({
            error: 'User With Same Email Already Exists'
        })
    }

    const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET, { expiresIn: "1h" })

    const emailData = {
        from: "TutorInc",
        to: `${email}`,
        subject: "ACCOUNT ACTIVATION LINK",
        html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #333;">Please use the following link to activate your account</h1>
        <p style="font-size: 16px;">Click here to activate your account:</p>
        <a href="http://localhost:3000/auth/activate/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Activate</a>
        <hr style="border: 1px solid #ddd;">
        <p style="font-size: 14px;">This email may contain sensitive information.</p>
        <p style="font-size: 14px;"><a href="http://localhost:3000" style="color: #007bff;">Visit our website</a></p>
      </div>
              `,
    }

    sendEmailWithNodemailer(res, emailData)
}

// Activate Account 
exports.activateAccount = async (req, res) => {
    const { token } = req.body

    try {

        jwt.verify(token, process.env.JWT_SECRET) 
        const { name, email, password } = jwt.decode(token)

        //hash password
        const salt = await bcrypt.genSalt(10)
        const secPassword = await bcrypt.hash(password, salt)

        //create user
        const authUser = await User.create({ name, email, password: secPassword })
        
        // enter student_id in User model
        const student = await Student.findOne({ email })

        if(student){
            authUser.student_id = student._id
            await authUser.save()
        }

        res.status(201).json({
            message: "Signup Success. Please Sign In",
        })

    } catch (error) {
        return res.status(401).json({
            error:"Expired Token. Signup Again"
        })
    }
}

// Sign In
exports.signin = async (req, res) => {
    
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({
                error: "User With That Email Does Not Exist"
            })
        }

        const passwordCompare = await bcrypt.compare(password, existingUser.password)

        if(!passwordCompare){
            return res.status(400).json({
                error: "Invalid Credentials"
            })
        }

        const data = {
            id: existingUser._id,
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET)

        return res.status(200).json({
            authToken
        })

    } catch (error) {
        
        return res.status(500).json({
            error:"Login Failed",
        })
}
}

// Google Login
exports.googleLogin = async (req, res) => {
    try {
        const { email_verified, name, email } = req.body

        if(!email_verified){
            return res.status(400).json({
                error:"Google Login Failed"
            })
        }

        const existingUser = await User.findOne({ email })

        if(existingUser){
            const data = {
                id: existingUser._id,
            }
    
            const authToken = jwt.sign(data, process.env.JWT_SECRET)
    
            return res.status(200).json({
                authToken
            })
        }else{
            // Create User
            let password = Math.round(new Date().valueOf() * Math.random()) + '';
            const  newUser = await User.create({ name, email, password})

            const data = {
                id: newUser._id,
            }

            // Generate Auth Token
            const authToken = jwt.sign(data, process.env.JWT_SECRET)

            return res.status(200).json({
                authToken
            })

        }


        
        
    } catch (error) {
        return res.status(500).json({
            error:"Login Failed",
        })
    }
}