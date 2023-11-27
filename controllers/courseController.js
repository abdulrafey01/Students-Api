const Course = require("../models/Course");
const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: "00510afb4c8ea860000000001",
  applicationKey: "K005SImRsi7O1H6bTI4cakaoZuVD0Z4",
});
b2.authorize()
  .then(() => {
    console.log("Authorized backblaze b2");
  })
  .catch((error) => {
    console.log("Error authorizing b2");
  });

// For Creating Course
exports.create = async (req, res) => {
  try {
    const {
      course_id,
      title,
      description,
      short_description,
      duration,
      skills,
      outline,
      outcomes,
      availability,
      level,
      category,
      sub_category,
    } = req.body;

    // Check if the course already exists
    const existingCourse = await Course.findOne({ course_id });

    if (existingCourse) {
      return res
        .status(409)
        .json({ error: "Course With Same Course ID Already Exists" });
    }

    // Check if there is no file
    if (req.files.length === 0) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Get the bucket information
    const bucketResponse = await b2.getBucket({
      bucketName: "tutorinc-bucket",
    });

    // Get the upload URL
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: bucketResponse.data.buckets[0].bucketId,
    });

    // Upload the file
    const uploadFileResponse = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: `${req.files[0].originalname}`,
      data: req.files[0].buffer,
      onUploadProgress: null,
    });

    // Construct the image URL
    const feature_img = `https://tutorinc-bucket.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`;

    // Create a new course
    const newCourse = new Course({
      course_id,
      title,
      description,
      short_description,
      duration,
      skills,
      outline,
      outcomes,
      availability,
      level,
      category,
      sub_category,
      feature_img,
    });

    // Save the new course to the database
    await newCourse.save();

    res.status(201).json({
      message: `Course of ${newCourse.title} created successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable To Create Course",
    });
  }
};

// For Fetching All Courses
exports.fetchAll = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      courses,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable To Fetch Courses",
    });
  }
};

// For Fetching Single Course
exports.fetchOne = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ _id: id });

    if (!course) {
      return res.status(404).json({
        error: "Course Not Found",
      });
    }

    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable To Fetch Course",
    });
  }
};

// For Deleting Course
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById({ _id: id });

    if (!course) {
      return res.status(404).json({
        error: "Course With That ID Does Not Exist",
      });
    }

    await Course.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Course Deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable To Delete Course",
    });
  }
};

// For Updating Course
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      course_id,
      title,
      description,
      short_description,
      duration,
      skills,
      outline,
      outcomes,
      availability,
      level,
      category,
      sub_category,
    } = req.body;

    const updatedCourse = {};

    if (course_id) updatedCourse.course_id = course_id;
    if (title) updatedCourse.title = title;
    if (description) updatedCourse.description = description;
    if (short_description) updatedCourse.short_description = short_description;
    if (duration) updatedCourse.duration = duration;
    if (skills) updatedCourse.skills = skills;
    if (outline) updatedCourse.outline = outline;
    if (outcomes) updatedCourse.outcomes = outcomes;
    if (availability) updatedCourse.availability = availability;
    if (level) updatedCourse.level = level;
    if (category) updatedCourse.category = category;
    if (sub_category) updatedCourse.sub_category = sub_category;

    // Check if there is a file to upload
    if (req.files.length > 0) {
      const bucketResponse = await b2.getBucket({
        bucketName: "tutorinc-bucket",
      });
      const uploadUrlResponse = await b2.getUploadUrl({
        bucketId: bucketResponse.data.buckets[0].bucketId,
      });
      const uploadFileResponse = await b2.uploadFile({
        uploadUrl: uploadUrlResponse.data.uploadUrl,
        uploadAuthToken: uploadUrlResponse.data.authorizationToken,
        fileName: `${req.files[0].originalname}`,
        data: req.files[0].buffer,
        onUploadProgress: null,
      });

      updatedCourse.feature_img = `https://tutorinc-bucket.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`;
    }

    const updated = await Course.findByIdAndUpdate(
      { _id: id },
      { $set: updatedCourse },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Course With That ID Does Not Exist" });
    }

    res.status(200).json({ message: "Course Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable To Update Course" });
  }
};

// exports.uploadImage = async (req, res) => {
//   const files = req.files[0].buffer;
//   console.log("files", files);
//   try {
//     const b2 = new B2({
//       applicationKeyId: "00510afb4c8ea860000000001",
//       applicationKey: "K005SImRsi7O1H6bTI4cakaoZuVD0Z4",
//     });
//     await b2.authorize();
//     b2.getBucket({
//       bucketName: "tutorinc-bucket",
//     })
//       .then((response) => {
//         b2.getUploadUrl({
//           bucketId: response.data.buckets[0].bucketId,
//         }).then((response) => {
//           b2.uploadFile({
//             uploadUrl: response.data.uploadUrl,
//             uploadAuthToken: response.data.authorizationToken,
//             fileName: `${req.files[0].originalname}`,
//             data: req.files[0].buffer,
//             onUploadProgress: null,
//           }).then(async (response) => {
//             const newBlazeImage = new BlazeImage({
//               imgUrl: `https://hivestorage.s3.us-east-005.backblazeb2.com/${response.data.fileName}`,
//             });
//             await newBlazeImage.save();

//             res.status(200).json({
//               message: "File Uploaded Successfully",
//               data: response.data,
//             });
//           });
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           error: "Unable To Upload File",
//           data: error.data,
//         });
//       });
//   } catch (error) {
//     console.log("Error getting bucket:", error);
//   }
// };

// Download Api
// https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=
// https://hivestorage.s3.us-east-005.backblazeb2.com/9794.jpg
