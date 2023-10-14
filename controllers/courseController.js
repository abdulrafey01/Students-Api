const Course = require("../models/Course")

// For Creating Course
exports.create = async (req, res)=> {
    try {

        const { course_id, course_name, course_description, course_duration, course_outline, course_outcomes, course_type } = req.body
        const existingCourse = await Course.findOne({course_id})

        if (existingCourse) {
            return res.status(409).json({ error: 'Course With Same Course ID Already Exists' });
        }

        const newCourse = new Course({
            course_id,
            course_name,
            course_description,
            course_duration,
            course_outline,
            course_outcomes,
            course_type
        })

       await newCourse.save()

        res.status(201).json({
            message: `Course of ${newCourse.course_name} created successfully`,
        })
    } catch (error) {
        res.status(500).json({
            error:"Unable To Create Course"
        })
    }
}

// For Fetching All Courses
exports.fetchAll = async (req, res)=> {
    try {
        const courses = await Course.find()
        res.status(200).json({
            courses
        })
    } catch (error) {
        res.status(500).json({
            error:"Unable To Fetch Courses"
        })
    }
}

// For Fetching Single Course
exports.fetchOne = async (req, res)=> {
     try {
        const {id} = req.params
        const course = await Course.findOne({_id:id})

        if(!course){
            return res.status(404).json({
                error:"Course Not Found"
            })
        }

        res.status(200).json({
            course
        })
     } catch (error) {
        res.status(500).json({
            error:"Unable To Fetch Course"
        })
     }
}

// For Deleting Course
exports.remove = async (req, res)=> {
    try {
        const {id} = req.params
        const course = await Course.findById({_id:id})

        if(!course){
           return res.status(404).json({
                error:"Course With That ID Does Not Exist"
            })
        }

        await Course.findByIdAndDelete({_id:id})
        res.status(200).json({
            message:"Course Deleted"
        })

    } catch (error) {
        res.status(500).json({
            error:"Unable To Delete Course"
        })
    }
}

// For Updating Course
exports.update = async (req, res)=> {
    try {
        const {id} = req.params
        const {course_id, course_name, course_description, course_duration, course_outline, course_outcomes, course_type} = req.body

        const updatedCourse ={}
        if(course_id){
            updatedCourse.course_id = course_id
        }
        if(course_name){
            updatedCourse.course_name = course_name
        }
        if(course_description){
            updatedCourse.course_description = course_description
        }
        if(course_duration){
            updatedCourse.course_duration = course_duration
        }
        if(course_outline){
            updatedCourse.course_outline = course_outline
        }
        if(course_outcomes){
            updatedCourse.course_outcomes = course_outcomes
        }
        if(course_type){
            updatedCourse.course_type = course_type
        }

        const updated = await Course.findByIdAndUpdate({_id:id}, {$set: updatedCourse}, {new:true})

        if(!updated){
            return res.status(404).json({
                error:"Course With That ID Does Not Exist"
            })
        }
        
        res.status(200).json({
            message:"Course Updated Successfully",
        })
    } catch (error) {
        res.status(500).json({
            error:"Unable To Update Course"
        })
    }
}