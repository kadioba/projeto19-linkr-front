import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import PostComponent from "../PostComponent/PostComponent";
import { useLocation } from "react-router-dom";

function PostsRenderer({ posts, user, setPosts }) {
  const location = useLocation();

  if (!posts || !user) return <LoadingComponent />;
  if (posts.length === 0)
    return (
      <h1 data-test="message" style={{ color: "white" }}>
        {
          location.pathname === "/timeline"
          ? (Object.keys(user.following).length === 0
              ? "You don't follow anyone yet. Search for new friends!"
              : "No posts found from your friends")
          : "There are no posts yet"
        }
      </h1>
    );

  console.log(posts)

  return (
    <>
      {posts.map((post) => (
        <PostComponent
          key={`${post.id}-${post.repost_id}`}
          postId={post.id}
          post={post}
          userId={user.id}
          username={user.username}
          setPosts={setPosts}
        />
      ))}
    </>
  );
}

export default PostsRenderer;
