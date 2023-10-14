const User = require("../models/User");
const Student = require("../models/Student")

 
// For Creating Student
exports.create = async (req, res)=> {
 try {

    const { studentId, name, email, cnic, gender, phone, address, course, qualification, enrollmentType} = req.body
    const existingStudent = await Student.findOne({email});

    if (existingStudent) {
      return res.status(409).json({ error: 'Student With Same Email Already Exists' });
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

   //add student_id in User Model
   const authUser = await User.findOne({email})

   if(authUser){
       authUser.student_id = newStudent._id
       await authUser.save()
   }
   
    res.status(201).json({
      message: `Student ${newStudent.name.firstName} Registered Successfully`,
    })

 } catch (error) {
    res.status(500).json({
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
        res.status(500).json({
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
        res.status(500).json({
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
                error:"Student With That ID Does Not Exist"
            })
        }

        await Student.findByIdAndDelete({_id:id})
        res.status(200).json({
            message:"Student Deleted"
        })

    } catch (error) {
        res.status(500).json({
            error:"Unable To Delete Student"
        })
    }
}


// For Updating Student
exports.update = async (req, res)=> {
    try {
        const {id} = req.params
        const {studentId, name, email, cnic, gender, phone, address, course, qualification, enrollmentType} = req.body

        const updatedStudent ={}
        if(studentId){
            updatedStudent.studentId = studentId
        }
        if(name){
            updatedStudent.name = name
        }
        if(email){
            updatedStudent.email = email
        }
        if(cnic){
            updatedStudent.cnic = cnic
        }
        if(gender){
            updatedStudent.gender = gender
        }
        if(phone){
            updatedStudent.phone = phone
        }
        if(address){
            updatedStudent.address = address
        }
        if(course){
            updatedStudent.course = course
        }
        if(qualification){
            updatedStudent.qualification = qualification
        }
        if(enrollmentType){
            updatedStudent.enrollmentType = enrollmentType
        }

        const updated = await Student.findByIdAndUpdate({_id:id},{$set:updatedStudent},{new:true})
         
        if(!updated){
            return res.status(404).json({
                error:"Student With That ID Does Not Exist"
            })
        }

        res.status(200).json({
            message:"Student Updated Successfully",
        })
        
    } catch (error) {

        res.status(500).json({
            error:"Unable To Update Student"
        }) 

    }
}