import {
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Home as HomeIcon,
  Search,
  Message,
  Settings,
  MoreHoriz,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/defaultProfileImage.png";
import axios from "axios"; 

interface User {
  id: number;
  username: string;
  profileImage: string;
}

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

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userInformation") || "{}");
  const profileImage = userData?.user?.profileImage
    ? userData.user.profileImage
    : defaultProfileImage;
  const currentUserId = userData?.user?._id
    ? userData.user._id
    : ""
    console.log(currentUserId,"CurrentUserId");
  const theme = useTheme();
  const isMid = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [suggestedUsers, setSuggestedUsers] = useState([] as User[]);
  const [posts, setPosts] = useState([] as Post[]); // State to hold posts

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get("/api/v1/users/getUserSuggestion", {
            params: {
              currentUserId,
            },
          });
          const users = response?.data?.data; // Store the full user object
          console.log(users, "Suggested Users Response");
          setSuggestedUsers(users); // Set the entire user object
        } catch (error) {
          console.error("Failed to fetch user suggestions:", error);
        }
      };
      

      // const fetchPosts = async () => {
      //   try {
      //     const response = await axios.get("/api/v1/posts"); // Fetch posts API
      //     setPosts(response.data); // Assuming API response is an array of posts
      //   } catch (error) {
      //     console.error("Error fetching posts:", error);
      //   }
      // };

      // setSuggestedUsers([
      //   { id: 1, username: "user1", profileImage: "" },
      //   { id: 2, username: "user2", profileImage: "" },
      //   { id: 3, username: "user3", profileImage: "" },
      //   { id: 4, username: "user4", profileImage: "" },
      //   { id: 5, username: "user5", profileImage: "" },
      // ]);

      fetchSuggestions();
      // fetchPosts(); // Fetch posts when component mounts
    }
  }, [navigate]);

  const drawerContent = (
    <Stack
      sx={{
        width: isMid ? "80px" : "20%",
        height: "100%",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 2,
        paddingTop: 4,
      }}
    >
      <Button
        fullWidth
        disableRipple
        sx={{
          justifyContent: isMid ? "center" : "flex-start",
          marginBottom: 2,
          color: "black",
        }}
        onClick={() => window.location.reload()}
      >
        <HomeIcon fontSize="large" sx={{ color: "black" }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: "black" }}>
            Home
          </Typography>
        )}
      </Button>
      <Button
        fullWidth
        disableRipple
        sx={{
          justifyContent: isMid ? "center" : "flex-start",
          marginBottom: 2,
          color: "black",
        }}
        onClick={() => navigate("/search")}
      >
        <Search fontSize="large" sx={{ color: "black" }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: "black" }}>
            Search
          </Typography>
        )}
      </Button>
      <Button
        fullWidth
        disableRipple
        sx={{
          justifyContent: isMid ? "center" : "flex-start",
          marginBottom: 2,
          color: "black",
        }}
        onClick={() => navigate("/messages")}
      >
        <Message fontSize="large" sx={{ color: "black" }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: "black" }}>
            Messages
          </Typography>
        )}
      </Button>
      <Button
        fullWidth
        disableRipple
        sx={{
          justifyContent: isMid ? "center" : "flex-start",
          marginBottom: 2,
          color: "black",
        }}
        onClick={() => setMoreOptionsOpen(!moreOptionsOpen)}
      >
        <MoreHoriz fontSize="large" sx={{ color: "black" }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: "black" }}>
            More Options
          </Typography>
        )}
      </Button>
      {moreOptionsOpen && (
        <Stack sx={{ width: "100%", marginTop: 2 }}>
          <Button
            fullWidth
            disableRipple
            sx={{
              justifyContent: isMid ? "center" : "flex-start",
              marginBottom: 2,
              color: "black",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            <Typography sx={{ color: "black" }}>Logout</Typography>
          </Button>
          <Button
            fullWidth
            disableRipple
            sx={{
              justifyContent: isMid ? "center" : "flex-start",
              marginBottom: 2,
              color: "black",
            }}
            onClick={() => navigate("/settings")}
          >
            <Settings fontSize="large" sx={{ color: "black" }} />
            {!isMid && (
              <Typography marginLeft={2} sx={{ color: "black" }}>
                Settings
              </Typography>
            )}
          </Button>
        </Stack>
      )}
    </Stack>
  );

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      direction={isSmall ? "column" : "row"}
    >
      {/* Drawer for large and medium screens */}
      {!isSmall && (
        <>
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: isMid ? "80px" : "20%",
              "& .MuiDrawer-paper": {
                width: isMid ? "80px" : "20%",
                boxSizing: "border-box",
              },
            }}
          >
            {drawerContent}
          </Drawer>

          {/* Main Content */}
          <Stack
            sx={{
              width: isMid ? "calc(100vw - 80px)" : "calc(100vw - 20%)",
              height: "100%",
              overflowY: "scroll",
              padding: 2,
            }}
          >
            {/* Display Posts */}
            {posts.length > 0 ? (
              posts.map((post) => (
                <Stack key={post.postId} spacing={2} sx={{ marginBottom: 3 }}>
                  <img
                    src={post.image}
                    alt="Post"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography variant="body1">{post.caption}</Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Likes: {post.likes}</Typography>
                    <Typography>Comments: {post.comments.length}</Typography>
                    <Typography>Total Stars: {post.totalStars}</Typography>
                  </Stack>
                </Stack>
              ))
            ) : (
              console.log("No posts to show"),
              <Typography
              sx={{fontSize:"20px", color: "black" }}
              >No posts to display</Typography>
            )}
          </Stack>

          {/* Profile and Suggested Users on the Right Side */}
          <Stack
            sx={{
              position: "fixed",
              top: 16,
              right: 16,
              alignItems: "flex-end",
              width: isMid ? "80px" : "20%",
              paddingRight: 2,
            }}
          >
            {/* Profile Icon */}
            <IconButton
              disableRipple
              onClick={() => navigate("/profile")}
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                padding: 0,
                border: "1px solid gray",
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: "100%", borderRadius: "50%" }}
              />
            </IconButton>
            {!isMid && <Typography marginTop={1} sx={{color:"black", justifyContent:"flex-end", 
              right:0
            }}>{userData.user.username}</Typography>}
          </Stack>
          {/* Suggested users */}
          <Stack
          sx={{
            marginTop: 4,
            position: "fixed",
            top: 100,
            right: 10,
            alignItems: "flex-end",
            width: isMid ? "80px" : "20%",
            paddingRight: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: "black", justifyContent:"flex-end" }}>
            Suggested Users
          </Typography>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.map((user) => (
              <Stack key={user.id} direction="row" spacing={2}  width={"200px"}
              justifyContent={"space-between"}
              sx={{ marginTop: 1,
               }}>
                <img
                  src={user.profileImage ? user.profileImage : defaultProfileImage}
                  alt="Profile"
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
                <Typography  
                sx={{ color: "black",  
                      width:"150px",
                      ":hover": {
                        color: "blue",
                        cursor: "pointer",
                      }
                    }}
                  onClick={() => navigate(`/profile/${user.username}`)}
                >
                  {user.username ? user.username : "user"}
                </Typography>
              </Stack>
            ))
          ) : (
            <Typography>No users to suggest</Typography>
          )}
        </Stack>

        </>
      )}

      {/* Bottom Navigation for small screens */}
      {isSmall && (
        <>
          <Stack
            sx={{
              flexGrow: 1,
              padding: 2,
              overflowY: "scroll",
            }}
          >
            {/* Display Posts */}
            {posts.length > 0 ? (
              posts.map((post) => (
                <Stack key={post.postId} spacing={2} sx={{ marginBottom: 3 }}>
                  <img
                    src={post.image}
                    alt="Post"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography variant="body1">{post.caption}</Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Likes: {post.likes}</Typography>
                    <Typography>Comments: {post.comments.length}</Typography>
                    <Typography>Total Stars: {post.totalStars}</Typography>
                  </Stack>
                </Stack>
              ))
            ) : (
              <Typography>No posts to display</Typography>
            )}
          </Stack>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
              onClick={() => window.location.reload()}
            />
            <BottomNavigationAction
              label="Search"
              icon={<Search />}
              onClick={() => navigate("/search")}
            />
            <BottomNavigationAction
              label="Messages"
              icon={<Message />}
              onClick={() => navigate("/messages")}
            />
            <BottomNavigationAction
              label="More"
              icon={<MoreHoriz />}
              onClick={() => setMoreOptionsOpen(!moreOptionsOpen)}
            />
          </BottomNavigation>
        </>
      )}
    </Stack>
  );
}
