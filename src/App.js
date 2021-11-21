import "./App.css";
import { useState } from "react";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CircularProgress from "@mui/material/CircularProgress";
import NightlightIcon from "@mui/icons-material/Nightlight";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    login: "github",
    id: 9919,
    avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
    html_url: "https://github.com/github",
    name: "GitHub",
    company: null,
    blog: "https://github.com/about",
    location: "San Francisco, CA",
    bio: "How people build software.",
    twitter_username: null,
    public_repos: 398,
    public_gists: 0,
    followers: 0,
    following: 0,
  });
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [ift, setIft] = useState();
  const [kuku, setKuku] = useState(false);
  const [theme, setTheme] = useState("dark");

  const fetchApi = () => {
    setKuku(true);
    setLoading(true);
    if (username === "") {
      setLoading(true);
      return setIft("Please enter a username");
    } else {
      setIft("");
      setLoading(true);
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        });
    }
  };

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div
      className="app"
      style={{
        color: theme === "dark" ? "white" : "black",
        backgroundColor: theme === "dark" ? "#141c2f" : "white",
      }}
    >
      {/* Header */}
      <header className="header">
        <h1>devfinder</h1>
        <div
          className="theme"
          style={{
            display: "flex",
            alignItems: "center",
            width: "15%",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={changeTheme}
        >
          <h3>{theme === "dark" ? "LIGHT" : "DARK"}</h3>
          {theme === "dark" ? <Brightness7Icon /> : <NightlightIcon />}
        </div>
      </header>
      {/* Search Box */}
      <section
        className="search"
        style={{ backgroundColor: theme === "dark" ? "#1f2a48" : "#d7dae4" }}
      >
        <SearchIcon style={{ fontSize: "2.5pc", color: "#1f4984" }} />
        <input
          type="text"
          placeholder="Search for GitHub username..."
          className="search__input"
          style={{
            borderRadius: "5px",
            border: "none",
            padding: "10px",
            width: "100%",
            color: theme === "dark" ? "white" : "black",
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn" onClick={fetchApi}>
          Search
        </button>
      </section>
      {/* Find Box */}
      <section
        className="result"
        style={{ backgroundColor: theme === "dark" ? "#1f2a48" : "#d7dae4" }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress sx={{ marginRight: "20px" }} />
            {ift}
          </div>
        ) : (
          <>
            <div className="left">
              <img src={user.avatar_url} alt="" className="img" />
            </div>
            <div className="right">
              <div className="gen">
                <h2>{user.message ? user.message : user.login}</h2>
                <p>{user.message ? user.message : user.name}</p>
                <h3>{user.message ? user.message : user.bio}</h3>
              </div>
              <div
                className="repo"
                style={{
                  backgroundColor: theme === "dark" ? "#141c2f" : "#adaeb3",
                }}
              >
                <div className="repo__one">
                  <p>Repos</p>
                  <h2>{user.message ? user.message : user.public_repos}</h2>
                </div>
                <div className="repo__two">
                  <p>Followers</p>
                  <h2>{user.message ? user.message : user.followers}</h2>
                </div>
                <div className="repo__three">
                  <p>Following</p>
                  <h2>{user.message ? user.message : user.following}</h2>
                </div>
              </div>
              <div className="general">
                <div className="part">
                  <div>
                    <LocationOnIcon className="icon" />
                    <p>{user.message ? user.message : user.location}</p>
                  </div>
                  <div>
                    <TwitterIcon className="icon" />
                    <p>{user.message ? user.message : user.twitter_username}</p>
                  </div>
                </div>
                <div className="part">
                  <div>
                    <LinkIcon className="icon" />
                    <br />
                    <p>
                      <a
                        href={user.blog}
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: theme === "dark" ? "white" : "black" }}
                      >
                        {user.message ? user.message : user.blog}
                      </a>
                    </p>
                  </div>
                  <div>
                    <ApartmentIcon className="icon" />
                    <a
                      href={user.html_url}
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: theme === "dark" ? "white" : "black",
                        textDecoration: "none",
                      }}
                    >
                      {user.message ? user.message : "@github"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
