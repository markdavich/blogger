import express from 'express'
import BlogService from '../services/BlogService';
import { Authorize } from '../middleware/authorize.js'
import mongoose from 'mongoose'
import { setAuthor } from '../common';
import CommentService from '../services/CommentService';

/** @type {mongoose.Model<mongoose.Document>} */
let _blogService = new BlogService().repository
let _commentService = new CommentService().repository

export default class BlogController {
    constructor() {
        this.router = express.Router()
            //NOTE all routes after the authenticate method will require the user to be logged in to access
            .get('', this.getAll)
            .get('/:id', this.getById)

            // http://localhost:3000/api/blogs/5d733a428650f93ff0f5ab65/comments
            .get('/:id/comments', this.getCommentsForThisBlog)

            .use(Authorize.authenticated)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }

    async getAll(req, res, next) {
        console.log('BlogController.getAll()')
        try {
            let data = await _blogService.find({})

            return res.send(data)
        } catch (error) {
            console.log('ERROR: BlogController.getAll()')
            next(error)
        }

    }

    async getById(req, res, next) {
        console.log('BlogController.getById()')
        try {
            let data = await _blogService.findById(req.params.id)
                // .populate('authorId', '_id')
                // .populate('authorId', 'name')

            if (!data) {
                throw new Error("Invalid Id")
            }

            res.send(data)
        } catch (error) {
            console.log('ERROR: BlogController.getById()')
            next(error)
        }
    }

    async create(req, res, next) {
        console.log('BlogController.create()')
        try {
            // NOTE the user id is accessable through req.body.uid,
            // never trust the client to provide you this information

            // Old way works
            // let blog = req.body
            // blog.author = {}
            // blog.author._id = req.session.uid
            // blog.author.name = req.session.uname
            // blog.authorId = req.session.uid

            // let data = await _blogService.create(blog)

            // 1. What is data???
            // 2. What does create return???
            // let data = await _blogService.create(req.body)

            let data = await _blogService.create(setAuthor(req).body)

            res.send(data)
        } catch (error) {
            console.log('ERROR: BlogController.create()')
            next(error)
        }
    }

    async getCommentsForThisBlog(request, response, next) {
        console.log('BlogController.getCommentsFoThisBlog()')
        try {

            let comments = await _commentService.find(
                {
                    blogId: request.params.id
                }
            )

            if (comments) {
                return response.send(comments)
            } else {
                return response.status(402).send('No Comments for this Blog')
            }
        } catch (error) {
            console.log('ERROR: BlogController.getCommentsFoThisBlog()')
            next(error)
        }

    }

    async edit(req, res, next) {
        console.log('BlogController.edit()')
        try {
            let blog = setAuthor(req).body
            if (blog.img) {
                blog.image = ''
            }
            let data = await _blogService.findOneAndUpdate(
                {
                    _id: req.params.id,
                    authorId: req.session.uid
                },
                blog,
                { new: true }
            )
            if (data) {
                return res.send(data)
            }
            
            return res.status(400).send(`
                Node Server: BlogController.edit()
                Wrong blogId or authorId in request.body

            `)
        } catch (error) {
            console.log('ERROR: BlogController.edit()')
            next(error)
        }
    }

    async delete(req, res, next) {
        console.log('BlogController.delete()')
        try {
            await _blogService.findOneAndRemove({ _id: req.params.id })
            res.send("deleted value")
        } catch (error) {
            console.log('ERROR: BlogController.delete()')
            next(error)
        }
    }
}