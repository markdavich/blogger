import express from 'express'
import { Authorize } from '../middleware/authorize'
import mongoose from 'mongoose'
import CommentService from '../services/CommentService'
import { setAuthor } from '../common'

/** @type {mongoose.Model<mongoose.Document>} */
let _commentService = new CommentService().repository


export default class CommentController{

  // Always be able to get comments

  //  Only when user is logged in...
  //    1. Create comment for blogId
  //    2. Edit comment for blogId
  //    3. Delete comment

  constructor() {
    this.router = express.Router()
      .get('', this.getAll)
      .use(Authorize.authenticated)

      .post('', this.createNoBlogId)
      // http://localhost:3000/api/comments/5d73d6dddc8c5b55fbab123b
      .post('/:id', this.create)
      .put('/:id', this.edit)
      
  }

  getAll(reqest, response, next) {
    console.log('CommentController.getAll()')
  }

  async create(request, response, next) {
    console.log('CommentController.create()')
    try {
      let comment = setAuthor(request).body
      comment.blogId = request.params.id

      let newComment = await _commentService.create(comment)

      response.send(newComment)

    } catch (error) {
      console.log('ERROR: CommentController.create()')
      next(error)
    }
  }

  async createNoBlogId(request, response, next) {
    console.log('CommentController.createNoBlogId()')

    if (!request.body.blogId) {
      response.status(400).send(`
        Node Server: CommentController.createNoBlogId
        blogId was not attached to request.body
        Make sure the object you are sending has a
        blogId property of type mongoose.Schema.Types.ObjectId
        SEE: MongoDB and mongoose ObjectId
      `)
    }
    
    try {
      let comment = setAuthor(request).body

      let newComment = await _commentService.create(comment)

      response.send(newComment)
    } catch (error) {
      console.log('ERROR: CommentController.createNoBlogId()')
      next(error)
    }
  }

  async edit(reqest, response, next) {
    let authorId = reqest.body.authorId

    if (!authorId) {
      return response
        .status(400)
        .send(`
          Blogger Node Server: CommentController.edit()
          authorId was not attached to request.body

          400 Bad Request
          The server cannot or will not process the request
          due to an apparent client error
          (e.g., 
            malformed request syntax,
            size too large, invalid request message framing,
            or deceptive request routing
          ).
        `)
    }

    try {
      let comment = await _commentService.findOneAndUpdate(
        {
          _id: reqest.params.id,
          authorId: reqest.session.uid
        },
        reqest.body,
        {
          new: true
        }
      )

      if (comment) {
        // 200 OK
        // Standard response for successful HTTP requests.
        // The actual response will depend on the request method used.
        // In a GET request, the response will contain an entity 
        // corresponding to the requested resource. In a POST request,
        // the response will contain an entity describing or containing
        // the result of the action.
        return response.status(200).send(comment)
      } else {
        return response
          .status(204)
          .send(`
          Blogger Node Server: CommentController.edit()
          request.body._id
          OR
          request.body.authorId
          NOT FOUND

          204: The server successfully processed the request and is not returning any content.
        `)
      }
    } catch (error) {
      next(error)
    }
  }
}