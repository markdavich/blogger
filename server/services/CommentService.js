import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema(
  {
    blogId: {
      type: ObjectId,
      required: true,
      ref: 'blog'
    },

    body: {
      type: String,
      required: true
    },

    authorId: {
      type: ObjectId
    },

    author: {
      _id: {
        type: ObjectId
      },
      name: {
        type: String,
        required: false
      }
    }
  }
)

export default class CommentService{
  get repository() {
    return mongoose.model('comment', _model)
  }
}