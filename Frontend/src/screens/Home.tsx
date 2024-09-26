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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Home as HomeIcon, Search, Message, Settings, MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../assets/defaultProfileImage.png';
import axios from 'axios'; // Import axios for API calls
interface User {
  id: number;
  username: string;
  profileImage: string;
}

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userInformation") || '{}');
  const theme = useTheme();
  const isMid = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [suggestedUsers, setSuggestedUsers] = useState([] as User[]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      // Fetch suggested users
      // axios.get('/api/v1/users/getUserSuggestion')
      //   .then(response => setSuggestedUsers(response.data))
      //   .catch(error => console.error(error));
      setSuggestedUsers([
        { id: 1, username: 'user1', profileImage: '' },
        { id: 2, username: 'user2', profileImage: '' },
        { id: 3, username: 'user3', profileImage: '' },
        { id: 4, username: 'user4', profileImage: '' },
        { id: 5, username: 'user5', profileImage: '' },
      ]);
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
        sx={{ justifyContent: isMid ? "center" : "flex-start", marginBottom: 2, color: "black" }}
        onClick={() => window.location.reload()}
      >
        <HomeIcon fontSize="large" sx={{ color: "black" }} />
        {!isMid && <Typography marginLeft={2} sx={{ color: "black" }}>Home</Typography>}
      </Button>
      <Button
        fullWidth
        disableRipple
        sx={{ justifyContent: isMid ? "center" : "flex-start", marginBottom: 2, color: "black" }}
        onClick={() => navigate('/search')}
      >
        <Search fontSize="large" sx={{ color: "black" }} />
        {!isMid && <Typography marginLeft={2} sx={{ color: "black" }}>Search</Typography>}
      </Button>
      <Button
        fullWidth
        disableRipple
        sx={{ justifyContent: isMid ? "center" : "flex-start", marginBottom: 2, color: "black" }}
        onClick={() => navigate('/messages')}
      >
        <Message fontSize="large" sx={{ color: "black" }} />
        {!isMid && <Typography marginLeft={2} sx={{ color: "black" }}>Messages</Typography>}
      </Button>
      <Button
        fullWidth
        disableRipple
        sx={{ justifyContent: isMid ? "center" : "flex-start", marginBottom: 2, color: "black" }}
        onClick={() => setMoreOptionsOpen(!moreOptionsOpen)}
      >
        <MoreHoriz fontSize="large" sx={{ color: "black" }} />
        {!isMid && <Typography marginLeft={2} sx={{ color: "black" }}>More Options</Typography>}
      </Button>
      {moreOptionsOpen && (
        <Stack sx={{ width: "100%", marginTop: 2 }}>
          <Button
            fullWidth
            disableRipple
            sx={{ justifyContent: isMid ? "center" : "flex-start", marginBottom: 2, color: "black" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate('/');
            }}
          >
            <Typography sx={{ color: "black" }}>Logout</Typography>
          </Button>
          <Button
            fullWidth
            disableRipple
            sx={{ justifyContent: isMid ? "center" : "flex-start", marginBottom: 2, color: "black" }}
            onClick={() => navigate('/settings')}
          >
            <Settings fontSize="large" sx={{ color: "black" }} />
            {!isMid && <Typography marginLeft={2} sx={{ color: "black" }}>Settings</Typography>}
          </Button>
        </Stack>
      )}
    </Stack>
  );

  return (
    <Stack width={"100vw"} height={"100vh"} direction={isSmall ? "column" : "row"}>
      {/* Drawer for large and medium screens */}
      {!isSmall && (
        <>
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: isMid ? "80px" : "20%",
              '& .MuiDrawer-paper': {
                width: isMid ? "80px" : "20%",
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>

          {/* Profile and Suggested Users on the Right Side */}
          <Stack
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              alignItems: 'flex-end',
              width: isMid ? '80px' : '20%',
              paddingRight: 2,
            }}
          >
            {/* Profile Icon */}
            <IconButton
              disableRipple
              onClick={() => navigate('/profile')}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                padding: 0,
                border: "1px solid #000000",
                backgroundColor: '#fff',
                marginBottom: 2,
                ":hover": {
                  backgroundColor: "#f0f0f0",
                  transition: "0.3s",
                  cursor: "pointer",
                  boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.2)"
                },
              }}
            >
              <img
                src={userData?.profileImage || defaultProfileImage}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </IconButton>

            {/* Suggested Users */}
            {suggestedUsers.map((user) => (
              <Stack key={userData.id} direction="row" alignItems="center" sx={{ marginBottom: 1 }}>
                <IconButton
                  disableRipple
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    padding: 0,
                    border: "1px solid #000000",
                    marginRight: 1,
                  }}
                >
                  <img
                    src={userData.profileImage || defaultProfileImage}
                    alt={userData.username}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{ cursor: 'pointer', color: 'black' }}
                  onClick={() => navigate(`/profile/${user.username}`)}
                >
                  {user.username}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </>
      )}

      {/* Bottom Navigation for small screens */}
      {isSmall && (
        <BottomNavigation
          showLabels={false}
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            borderTop: "1px solid #ddd",
          }}
        >
          <BottomNavigationAction icon={<HomeIcon />} onClick={() => navigate('/home')} sx={{ color: "black" }} />
          <BottomNavigationAction icon={<Search />} onClick={() => navigate('/search')} sx={{ color: "black" }} />
          <BottomNavigationAction icon={<Message />} onClick={() => navigate('/messages')} sx={{ color: "black" }} />
          <BottomNavigationAction icon={<MoreHoriz />} onClick={() => setMoreOptionsOpen(!moreOptionsOpen)} sx={{ color: "black" }} />
        </BottomNavigation>
      )}
    </Stack>
  );
}
