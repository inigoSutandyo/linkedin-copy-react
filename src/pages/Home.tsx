import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import AddPost from "../components/post/AddPost";
import "../styles/pages/home.scss";
import { ApiURL } from "../utils/Server";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import PostComponent from "../components/post/PostComponent";
import ProfileDisplay from "../components/user/profile/ProfileDisplay";
import ModalComponent from "../components/util/ModalComponent";
import { appendPost, removePost, setPosts } from "../features/post/postSlice";
import { checkAuth } from "../utils/Auth";
import { Cookies } from "react-cookie";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/util/Loading";
import { useList, useUser } from "../app/user";
import Footer from "./Footer";
import SendPost from "../components/post/SendPost";

type Props = {};

const axiosConfig = {
  withCredentials: true,
};
const Home = (props: Props) => {
  const limit = 5;

  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const posts = useAppSelector((state) => state.post.posts);
  const comment_count = useAppSelector((state) => state.post.comment_count);
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [movieId, setMovieId] = useState(0);

  const [loading, setLoading] = useState(false)  
  
  

  const loadPosts = () => {
    setTimeout(() => {
      axios
        .get(ApiURL("/home/post"), {
          withCredentials: true,
          params: {
            offset: offset,
            limit: limit,
          },
        })
        .then(function (response) {
          const data = {
            posts: response.data.posts,
            comment_count: response.data.comment_count,
          };
          if (posts && posts.length > 0) {
            dispatch(appendPost(data));
          } else {
            dispatch(setPosts(data));
          }
          setOffset(offset + limit);
          setHasMore(response.data.hasmore);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }, 500);
  };

  useUser();
  useList();

  useEffect(() => {
    checkAuth();
    const cookie = new Cookies();
    console.log(cookie.get("auth"));
    if (!cookie.get("auth")) {
      navigate("/auth/login");
    }

    loadPosts();
  }, []);

  const handleRemovePost = () => {
    closeModal();
    if (movieId == 0) return;
    axios
      .delete(ApiURL("/home/post/remove"), {
        withCredentials: true,
        params: {
          id: movieId,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(removePost(movieId));
        setMovieId(0);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleOpenModal = (msg: string) => {
    setModalTitle(msg);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleLoading = (flag: boolean) => {
    setLoading(flag)
  }

  return (
    <div id="home-page">
      {!loading ? (
        <>
        
          <Navbar />
          <div className="my-3 home-layout">
            {user ? (
              <>
                <div
                  className="container-grow-2 home-container bg-white"
                  id="profile-preview"
                  style={{
                    maxHeight: "256px",
                    position: "sticky",
                  }}
                >
                  <ProfileDisplay />
                </div>
    
                <div className="container-grow-5 home-container ">
                  <div className="container-header bg-white">
                    <button
                      className="btn-primary-outline"
                      style={{
                        marginTop: "10px",
                        borderRadius: "8px",
                      }}
                      onClick={() => handleOpenModal("Add Post")}
                    >
                      Add Post
                    </button>
                  </div>
                  <div className="home-main-content">
                    <InfiniteScroll
                      dataLength={posts.length}
                      next={loadPosts}
                      hasMore={hasMore}
                      loader={<Loading />}
                      style={{
                        minWidth: "100%",
                      }}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Congratulations! You have seen it all</b>
                        </p>
                      }
                    >
                      {posts ? (
                        <>
                          {posts.map((p, i) => {
                            return (
                              <PostComponent
                                post={p}
                                key={i}
                                index={i}
                                handleOpenModal={handleOpenModal}
                                setMovieId={setMovieId}
                                commentCount={comment_count[i]}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <>No Post</>
                      )}
                    </InfiniteScroll>
                  </div>
                </div>
    
                <div
                  className="container-grow-3 home-container bg-white"
                  id="others-preview"
                >
                  <p>Hei</p>
                </div>
    
                <ModalComponent
                  isOpen={modal}
                  closeModal={closeModal}
                  contentLabel={modalTitle}
                  appElement={"#home-page"}
                >
                  {modalTitle == "Add Post" ? (
                    <AddPost user={user} closeModal={closeModal} handleLoading={handleLoading}/>
                  ) : modalTitle == "Delete Post" ? (
                    <div className="d-flex flex-column align-center">
                      <h3>Do You really want to delete this post?</h3>
                      <div className="d-flex my-5">
                        <button
                          className="btn-primary mx-2"
                          onClick={handleRemovePost}
                        >
                          Yes
                        </button>
                        <button
                          className="btn-primary-outline mx-2"
                          onClick={closeModal}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ) : modalTitle == "Send Post" ? (
                    <SendPost post_id={movieId}/>
                  ) : (
                    <></>
                  )}
                </ModalComponent>
              </>
            ) : (
              <p>Empty</p>
            )}
          </div>
          <Footer />
        </>
      ) : <Loading/>}
    </div>
  );
};

export default Home;
