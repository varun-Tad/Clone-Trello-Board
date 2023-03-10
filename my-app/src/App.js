import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import SearchAppBar from "./Components/AppBar";
import { CardData } from "./data";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./App.css";
import { useState } from "react";

function App() {
  const [CardD, setCardD] = useState(CardData);
  const [addCardInputData, setAddCardInputData] = useState("");
  const [addListToggle, setAddListToggle] = useState(true);
  const [addListInput, setAddListInput] = useState("");

  const addCardClickHandler = (DataTitle) => {
    setCardD(
      CardD.map((cardObj) =>
        cardObj.title === DataTitle
          ? { ...cardObj, addCardDataToggle: !cardObj.addCardDataToggle }
          : { ...cardObj }
      )
    );
  };

  const addCardInputChangeHandler = (e) => {
    setAddCardInputData(e.target.value);
  };

  const addToCardHandler = (DataTitle) => {
    setCardD(
      CardD.map((cardObj) =>
        cardObj.title === DataTitle
          ? { ...cardObj, content: [...cardObj.content, addCardInputData] }
          : { ...cardObj }
      )
    );

    setAddCardInputData("");
  };

  const addListToggleFunc = () => {
    setAddListToggle(!addListToggle);
  };

  const addListChangeHandler = (ListInput) => {
    setAddListInput(ListInput.target.value);
  };

  const addListClickHandler = () => {
    setCardD([
      ...CardD,
      {
        title: addListInput,
        content: [],
        addCardDataToggle: false,
      },
    ]);
    addListToggleFunc();
  };

  return (
    <div className="App">
      <SearchAppBar />
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "1rem",
          paddingBottom: "1rem",
          paddingRight: "1rem",
          backgroundColor: "#1976d9",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Typography sx={{ color: "white", fontWeight: 800 }}>
            Things to do
          </Typography>
          <Button variant="contained">Tech</Button>
          <Button variant="contained">Private</Button>
          <Button variant="contained">Invite</Button>
        </Box>
        <Box>
          <Button variant="contained">
            <MoreHorizIcon />
            Show more
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#1976d9",
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {CardD.map((data) => (
          <Box sx={{ width: "15rem", height: "auto" }}>
            <Paper elevation={3}>
              <Box
                className="title"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",
                  paddingRight: "0.5rem",
                  paddingTop: "0.6rem",
                }}
              >
                <Typography sx={{ fontWeight: "800" }}>{data.title}</Typography>
                <CloseIcon sx={{ cursor: "pointer" }} />
              </Box>
              <Box sx={{ padding: "0.6rem" }} className="contents">
                {data.content.map((ele, index) => (
                  <Paper
                    sx={{ marginTop: "0.5rem", padding: "0.3rem" }}
                    elevation={5}
                  >
                    {ele}
                  </Paper>
                ))}
                <Box>
                  {data.addCardDataToggle ? (
                    <Box>
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        value={addCardInputData}
                        placeholder="Enter Content"
                        sx={{ marginTop: "1.5rem" }}
                        onChange={(e) => addCardInputChangeHandler(e)}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "0.6rem",
                          gap: "0.4rem",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => addToCardHandler(data.title)}
                        >
                          Add Card
                        </Button>
                        <CloseIcon
                          onClick={() => addCardClickHandler(data.title)}
                          sx={{ cursor: "pointer" }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      onClick={() => addCardClickHandler(data.title)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      <AddIcon />
                      <Typography>Add Card</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
        {addListToggle ? (
          <Button
            sx={{ width: "15rem", height: "2rem" }}
            variant="contained"
            onClick={() => addListToggleFunc()}
          >
            <AddIcon />
            Add List
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              height: "13rem",
            }}
          >
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="Add List"
              sx={{ backgroundColor: "white", padding: "1rem" }}
              value={addListInput}
              onChange={(e) => addListChangeHandler(e)}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Button
                onClick={addListClickHandler}
                sx={{ width: "10rem" }}
                variant="contained"
              >
                Add List
              </Button>
              <CloseIcon
                onClick={() => addListToggleFunc()}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;
