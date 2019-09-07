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
      .post('', this.create)
  }

  getAll(reqest, response, next) {
    console.log('Getting all fucking comments...')
    console.log(reqest)
  }

  async create(request, response, next) {
    try {
      // let data = await _commentService.create(request.body)

      // response.send(data)

      let comment = setAuthor(request).body

      let newComment = await _commentService.create(comment)

      response.send(newComment)

    } catch (error) {
      console.log('FUCK FUCK FUCK')
    }
  }
}