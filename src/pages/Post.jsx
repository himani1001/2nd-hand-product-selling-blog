//we upload an image then we use an editor from tinyMCE which allows us to have ordered list, bold, italic, etc and save them in database. TO save all this in databaseit writes simple HTML with some inline elements and inline style sheets and store them as a text inside your database. We can't display pure HTML in React so we will use html-react-parcer package.

//how if we display singular page and only if you are the author of the page you can edit it or have functionalities will be explored

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

const Post = () => {

  //state to handle post
  const [post, setPost] = useState('')
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  //now we have access to userData

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }
        else {
          navigate('/')
        }
      })
    }
  }, [slug, navigate])

  const deletePost = () => {
    //query to appwrite
    //if something is deleted it gives back you a status
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featureImage)
        navigate('/')
      }
    })
  }

  //only returning something in case of post
  return post ? (
    <div className='py-8'>
      <Container>
        <div
          className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteService.getFilePreview(post.featureImage)}
            alt="post.title"
            className='rounded-xl' />
          {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor='bg-green-500'
                  className='mr-3'>Edit
                </Button>
              </Link>
              <Button bgColor='bg-green-500'
                onClick={deletePost}>Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className='text-2xl font-bold'>{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post