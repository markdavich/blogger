
export function setAuthor(request) {
  let session = request.session
  let authorId = session.uid
  let authorName = session.uname

  request.body.authorId = authorId
  request.body.author = {}
  request.body.author._id = authorId
  request.body.author.name = authorName


  return request
}