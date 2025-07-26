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
import Ronaldo from "../assets/ronaldo.jpeg"
import Ronaldo2 from '../assets/ronaldo2.jpeg'
import axios from "axios"; 
import PostCard from "../components/PostCard";

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
  const [posts, setPosts] = useState([] as Post[]); 

  const dummyPosts = [
  {
    postId: 1,
    image: Ronaldo, 
    caption: "I lost a foosball game after this 😅",
    likes: 1700,
    comments: ["Nice shot!", "Haha relatable", "Foosball is serious business"],
    totalStars: 45,
    owner: {
      username: userData?.user?.username,
      profileImage: profileImage, 
    },
  },
    {
    postId: 1,
    image: Ronaldo2, 
    caption: "119 anos a orgulhar Portugal 🦁 Parabéns, meu @SportingCP",
    likes: 12200,
    comments: ["Nice shot!", "Haha relatable", "Foosball is serious business"],
    totalStars: 70,
    owner: {
      username: userData?.user?.username,
      profileImage: profileImage, 
    },
  },
];


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
          const users = response?.data?.data; 
          console.log(users, "Suggested Users Response");
          setSuggestedUsers(users); 
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
        // backgroundColor: "inherit",
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
          color: theme.palette.text.primary,
        }}
        onClick={() => window.location.reload()}
      >
        <HomeIcon fontSize="large" sx={{ color: theme.palette.text.primary }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: theme.palette.text.primary }}>
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
          color: theme.palette.text.primary,
        }}
        onClick={() => navigate("/search")}
      >
        <Search fontSize="large" sx={{ color: theme.palette.text.primary }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: theme.palette.text.primary }}>
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
          color: theme.palette.text.primary,
        }}
        onClick={() => navigate("/messages")}
      >
        <Message fontSize="large" sx={{ color: theme.palette.text.primary }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: theme.palette.text.primary }}>
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
          color: theme.palette.text.primary,
        }}
        onClick={() => setMoreOptionsOpen(!moreOptionsOpen)}
      >
        <MoreHoriz fontSize="large" sx={{ color: theme.palette.text.primary }} />
        {!isMid && (
          <Typography marginLeft={2} sx={{ color: theme.palette.text.primary }}>
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
              color: theme.palette.text.primary,
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            <Typography sx={{ color: theme.palette.text.primary }}>Logout</Typography>
          </Button>
          <Button
            fullWidth
            disableRipple
            sx={{
              justifyContent: isMid ? "center" : "flex-start",
              marginBottom: 2,
              color: theme.palette.text.primary,
            }}
            onClick={() => navigate("/settings")}
          >
            <Settings fontSize="large" sx={{ color: theme.palette.text.primary }} />
            {!isMid && (
              <Typography marginLeft={2} sx={{ color: theme.palette.text.primary }}>
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
      height={"100%"}
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
          <PostCard posts={dummyPosts}/>

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
            {!isMid && <Typography marginTop={1} sx={{color:theme.palette.text.primary, justifyContent:"flex-end", 
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
            width: 'auto',
            paddingRight: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.text.primary, justifyContent:"flex-end" }}>
            Suggested Users
          </Typography>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.map((user) => (
              <Stack key={user.id} direction="row" spacing={2}  width={"200px"}
              justifyContent={"space-between"}
              sx={{ marginTop: 1}}
               >
                <img
                  src={user.profileImage ? user.profileImage : defaultProfileImage}
                  alt="Profile"
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
                <Typography  
                sx={{ color: theme.palette.text.primary,  
                      width:"150px",
                      ":hover": {
                        color: theme.palette.primary.main,
                        cursor: "pointer",
                      },
                      textAlign:'center'
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
          <PostCard posts={dummyPosts}/>
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
