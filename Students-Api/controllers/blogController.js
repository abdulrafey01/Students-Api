const Blog = require("../models/Blog")

// Create Blog
exports.create = async (req, res)=> {
    try {
        const { title, content, author, feature_image, tags, permaLink, category, subcategory } = req.body
        const newBlog =  new Blog(
            {
                title,
                content,
                author,
                feature_image,
                tags,
                permaLink,
                category,
                subcategory,
            }
        )

       await newBlog.save()
       res.status(201).json({
           message: `Blog of ${newBlog.category} created successfully`,
       })
    } catch (error) {
        res.status(500).json({
            error:"Unable To Create Blog",
            message: error
        })
    }
}

// Fetch Blogs With Pagination 
exports.fetchBlogs = async (req, res)=> {

    const {page} = req.params || 1
    const limit = 6
    const skip = (page - 1) * limit

    try {
        const blogs = await Blog.find().skip(skip).limit(limit).select("title author feature_image")

        if(blogs.length === 0){
            return res.status(404).json({
                error:"No Blog Found"
            })
        }

        res.status(200).json({
            blogs
        })
        
    } catch (error) {
        res.status(500).json({
            error:"Unable To Fetch Blogs"
        })
    }
}

// Fetch All Blogs
exports.fetchOne = async (req, res)=> {
        try {
            const {id} = req.params
            const blog = await Blog.findOne({_id:id})

            if(!blog){
                return res.status(404).json({
                    error:"Blog With That ID Does Not Exist"
                })
            }

            res.status(200).json({
                blog
            })
        } catch (error) {
            res.status(500).json({
                error:"Unable To Fetch Blog Details"
            })
        }
}

// Delete Blog
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

   const blog = await Blog.findByIdAndDelete(id);

    if(!blog){
      return res.status(404).json({
        error:"Blog With That ID Does Not Exist"
      })
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to delete blog",
    });
  }
};


// Update Blog
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, feature_image, tags, permaLink, category, subcategory } = req.body;

        const updatedBlog = {}
        if(title) updatedBlog.title = title
        if(content) updatedBlog.content = content
        if(author) updatedBlog.author = author
        if(feature_image) updatedBlog.feature_image = feature_image
        if(tags) updatedBlog.tags = tags
        if(permaLink) updatedBlog.permaLink = permaLink
        if(category) updatedBlog.category = category
        if(subcategory) updatedBlog.subcategory = subcategory

        const updated = await Blog.findByIdAndUpdate({_id:id}, {$set: updatedBlog}, {new:true})
        
        
        if(!updated){
            return res.status(404).json({
                error:"Blog With That ID Does Not Exist"
            })
        }

        res.status(200).json({
            message: "Blog updated successfully",
        })
    } catch (error) {        
        res.status(500).json({
            error: "Unable to Update Blog",
        })
    }
}