import { Box, Stack } from '@mui/material';
import ImagePost from '../../Post/Image/ImagePost';
import TextPost from '../../Post/Text/TextPost';
import Loader from '../../Utils/Loader';
import React, { useState, useEffect} from 'react';
import { Fetch } from "../../../Trials/Controller";
import Follower from './Follower';

const UserPosts = ({data})=>{
  
  const [userPost, setUserPosts ] = useState([])

    const [loading, setLoading ] = useState(false)
  
    useEffect(()=>{
      if(data){
      setLoading(true)
      const formData = new FormData();
      formData.append("apptoken", "7FHS8S43N2JF08");
      formData.append("usertoken", data.usertoken);

      Fetch("https://spilleetapi.spilleet.com/getUserPosts", formData)
      .then((res) => {
        setLoading(false)
        if(res.data.success !== false){
          setUserPosts(res.data)
        }
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
      });
    }
  },[data])
    return(
      <Stack>
      {loading ? <Loader />  :(
        <>
          <Box borderBottom="0.234px solid gray;">
              <p>{userPost.length}</p>
          </Box>
          <Box>
          {userPost.length > 0 &&
             userPost.map((item) =>
                item.image_url === 0 ? (
                  <TextPost
                    key={item.ctn_id}
                    item={item}
                    // reloader={setReload}
                    // loadCommentFig={setLoadCommentFig}
                  />
                ) : (
                  <ImagePost
                    key={item.ctn_id}
                    item={item}
                    // reloader={setReload}
                    // loadCommentFig={setLoadCommentFig}
                  />
                )
              )
            }
          </Box>
          </>
        )}
      </Stack>
    )
}

export default UserPosts