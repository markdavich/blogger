import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 60
        },

        summary: {
            type: String,
            required: true,
            maxlength: 120
        },

        authorId: {
            type: ObjectId,
            ref: 'user'
        },

        author: {
            _id: {
                type: ObjectId
            },
            name: {
                type: String,
                required: false
            }
        },

        image: {
            type: String,
            required: false,
            default: 'https://via.placeholder.com/150'
        },

        body: {
            type: String,
            required: true
        }

    },
    { timestamps: true }
)

export default class BlogService {
    get repository() {
        return mongoose.model('blog', _model)
    }
}