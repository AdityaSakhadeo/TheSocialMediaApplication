import { Stack, Typography } from "@mui/material";
import defaultProfileImage from "../assets/defaultProfileImage.png";

interface Post {
  postId: number;
  image: string;
  caption: string;
  likes: number;
  comments: string[];
  totalStars: number;
  owner: {
    username: string;
    profileImage: string;
  };
}

interface PostCardProps {
  posts: Post[];
}

export default function PostCard({ posts }: PostCardProps) {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        marginLeft: { xs: 0, md: "80px" },
        marginRight: { xs: 0, lg: "40%" },
        padding: 2,
        overflowY: "auto",
        height: "100vh",
      }}
    >
      {posts.length > 0 ? (
        posts.map((post) => (
          <Stack
            key={post.postId}
            spacing={2}
            sx={{
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: "8px",
              marginBottom: 3,
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {/* Post Owner Info */}
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={post.owner.profileImage || defaultProfileImage}
                alt="Owner"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography fontWeight="bold">{post.owner.username}</Typography>
            </Stack>

            {/* Post Image */}
            <img
              src={post.image}
              alt="Post"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Caption */}
            <Typography>{post.caption}</Typography>

            {/* Stats */}
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">❤️ {post.likes} Likes</Typography>
              <Typography variant="body2">💬 {post.comments.length} Comments</Typography>
              <Typography variant="body2">⭐ {post.totalStars} Stars</Typography>
            </Stack>
          </Stack>
        ))
      ) : (
        <Typography>No posts to display</Typography>
      )}
    </Stack>
  );
}
