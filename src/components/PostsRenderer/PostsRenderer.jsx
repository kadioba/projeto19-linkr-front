import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import PostComponent from "../PostComponent/PostComponent";


function PostsRenderer({ posts, user, setPosts }) {
  if (!posts || !user) return <LoadingComponent />;
  if (posts.length === 0) return <h1 data-test="message">There are no posts yet</h1>;

  return (
    <>
      {posts.map((post) => (
        <PostComponent
          key={post.id}
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
