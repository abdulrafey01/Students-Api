const Student = require("../models/Student")


// For Creating Student
exports.create = async (req, res)=> {
 try {

    const { studentId, name, email, cnic, gender, phone, address, course, qualification, enrollmentType} = req.body
    const existingStudent = await Student.findOne({email});

    if (existingStudent) {
      return res.status(409).json({ error: 'Student already exists' });
    }

    const newStudent = new Student({
        studentId,
        name,
        email,
        cnic,
        gender,
        phone,
        address,
        course,
        qualification,
        enrollmentType
    })

   await newStudent.save()

    res.status(201).json({
      newStudent
    })

 } catch (error) {
    res.status(401).json({
        error:"Unable To Create Student"
    })
 }
}


// For Fetching All Students
exports.fetchAll = async (req, res)=> {
    try {
        const students = await Student.find()
        res.status(200).json({
            students
        })
    } catch (error) {
        res.status(401).json({
            error:"Unable To Fetch Students"
        })
    }
}


// For Fetching Single Student
exports.fetchOne = async (req, res)=> {
    try {
        const {id} = req.params
        const student = await Student.findOne({_id:id})

        if(!student){
            return res.status(404).json({
                error:"Student Not Found"
            })
        }

        res.status(200).json({
            student
        })
    } catch (error) {
        res.status(401).json({
            error:"Unable To Fetch Student"
        })
    }
}

// For Deleting Student
exports.remove = async (req, res)=> {
    try {
        const {id} = req.params
        const student = await Student.findById({_id:id})

        if(!student){
           return res.status(404).json({
                error:"Student With That ID Not Found"
            })
        }

        await Student.findByIdAndDelete({_id:id})
        res.status(200).json({
            message:"Student Deleted"
        })

    } catch (error) {
        res.status(401).json({
            error:"Unable To Delete Student"
        })
    }
}