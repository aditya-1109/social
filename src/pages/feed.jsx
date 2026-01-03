import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import { CommentIcon, HeartIcon } from '../components/ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/getData';
import { apiRequest } from '../https/httpfunction';
import Buttons from '../components/ui/buttons';
import { updatePostApi } from '../https/apis';

export default function Feed() {

  const { posts, loading, error } = useSelector((state) => state.getData);
  const [comment, setComment] = useState([]);
  const [showComments, setShowComments] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]);

  useEffect(() => {
    if(posts){
    

      if (!Array.isArray(posts) || posts.length === 0) return;
    
      setShowComments(posts.map(() => false));
      setComment(posts.map(() => ""));
    }
}, [posts]);


  const increaseLike = async (post) => {
    const updatedPost = { ...post, likes: post.likes + 1 }
    const response = await apiRequest(updatePostApi, "patch", [post._id], { data: updatedPost }, null);
    if (response) {
      dispatch(fetchPosts())
    }
  }

  const addComment = async (post, index) => {
    if (!comment[index].trim()) return;

    const updatedComments = [
      ...(post.comments || []),
      { text: comment[index] }
    ];

    const response = await apiRequest(
      updatePostApi,
      "patch",
      [post._id],
      {
        data: { comments: updatedComments }
      }
    );

    if (response?.data?.success) {
      dispatch(fetchPosts());
      let comm = comment;
      comm[index] = "";
      setComment(comm);
      alert("Successfully added comment")
    } else {
      alert("could not add comment")
    }
  };

  const remainingTime = (date) => {
    const now = Date.now();
    const past = new Date(date).getTime();
    const diff = Math.floor((now - past) / 1000); // in seconds

    if (diff < 60) {
      return `${diff} sec ago`;
    }

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  const cloudUrl = "https://socialb-ackend.onrender.com"

  console.log(posts)


  return (
    <div className='w-full flex flex-col h-screen'>
      <Header />
      <div className='h-full w-full flex flex-col gap-2 overflow-y-scroll' style={{ scrollbarWidth: "thin", scrollbarColor: "transparent" }}>
        {posts?.map((post, index) => (
          <div key={index} className='w-full border p-2 border-gray-300 shadow-sm rounded-lg bg-white'>
            <img src={`${cloudUrl}/${post.image}`} alt='img' className='w-full rounded-lg ' />
            <h1 className='flex flex-wrap w-full text-md text-black font-bold p-2'>{post?.caption}</h1>
            <div className='flex flex-row gap-2 justify-start items-center'>
              <div className='flex flex-row gap-2 justify-center items-center p-2'>
                <HeartIcon onclick={() => increaseLike(post)} size={30} color='black' className="cursor-pointer" />
                <p className='font-bold text-black text-lg'>{post?.likes}</p>
              </div>
              <div className='flex flex-row gap-2 justify-center items-center p-2'>
                <CommentIcon
                  onclick={() => {
                    setShowComments(prev => {
                      const updated = [...prev];
                      updated[index] = !updated[index];
                      return updated;
                    });
                  }}
                  size={30}
                  color="black"
                  className="cursor-pointer"
                />
                <p className='font-bold text-black text-lg'>{post?.comments?.length}</p>
              </div>
            </div>

            {showComments[index] && (
              <div className="w-full mt-3 space-y-3 px-2">
                {post.comments?.map((com, ind) => (
                  <div
                    key={ind}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3
                   shadow-sm hover:shadow-md transition"
                  >
                    {/* Comment Text */}
                    <p className="text-sm text-gray-900 leading-relaxed break-words">
                      {com.text}
                    </p>

                    {/* Time */}
                    <p className="mt-1 text-xs text-gray-500">
                      {remainingTime(com.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}


            <div>
              <textarea onChange={(e) => {
                    setComment(prev => {
                      const updated = [...prev];
                      updated[index] = e.target.value;
                      return updated;
                    });
                  }} value={comment[index]} className='w-full text-black font-semibold text-lg border-2 p-2 border-gray-400 rounded-lg' placeholder='Add a Comment...' />
              <Buttons text="Add" onclick={() => addComment(post, index)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
