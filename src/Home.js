import React, { useState, useEffect } from "react";
import "./App.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineCloudUpload, AiOutlineCopy } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineLoading } from 'react-icons/ai';
import aa from "./aa.png";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import UserForm from "./UserForm";
import { toast } from 'react-toastify';
import Select from 'react-select';
import { switchOff, turnOff } from "./config";
import {Select as Demo, MenuItem, Chip, InputLabel } from "@material-ui/core";
// import Chip from "../src/Chip"
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';





const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  // const [detailsForm, setDetailsForm] = useState(false);
  const [spin, setSpin] = useState(false);
  const [dataa, setDataa] = useState({
    message: "",
    emotion: "",
    length: ""
  });

  const { users } = useSelector((state) => state.User_Register);
  const { activeUser } = useSelector((state) => state.User_Register);
  // console.log(users[0]._id,"userrrrrrrrrrrrrrrrr ")
  // const userIdd = users.length > 0 ? users[0]._id : null;


  const [showContent, setShowContent] = useState(true);
  const [answer, setAnswer] = useState([]);
  const [output, setOutput] = useState([]);
  const [buttonClassName, setButtonClassName] = useState('open-btn');
  const [count, setCount] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const options = [
    { value: "select", label: "Emotion" },
    { value: "funny", label: "Funny" },
    { value: "disagree", label: "Disagree" },
    { value: "friendly", label: "Friendly" },
    { value: "congratulation", label: "Congratulation" },
    { value: "appriciating", label: "Appriciating" },
    { value: "serious", label: "Serious" },
    { value: "lovely", label: "Lovely" },
    { value: "shocking", label: "Shocking" },
  ]
{/* <option value="30">30</option> */}
  const lengths = [
    {value:"Length", label:"Length"},
    {value:"10", label:"10"},
    {value:"20", label:"20"},
    {value:"30", label:"30"},
  ]



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/userForm")
    } else {
      navigate("/")
    }
  }, [])












  // const handleFormSubmit = () => {
  //   setButtonClassName('open-btn show');
  // };






  // const { logout } = useAuth0();


  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (!storedUser || !storedUser.name) {
  //     navigate('/login')
  //   }
  // }, [])

  const logoutUser = () => {
    localStorage.clear();
    navigate("/login")
  }



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { message } = dataa


  const triggerParaphrasing = async () => {
    // console.log(message, "messagesssssssssssss")
    setSpin(true);
    const res = await axios.post("https://commention-backend.onrender.com/paraphrasing", {
      message: message,
      userId: activeUser._id
    },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    console.log(res, "response");
    const payload = {
      userId: activeUser._id,
      message: res.data.message
    }
    dispatch({ type: "SETPARAPHRASE", payload })
    setSpin(false);
    setAnswer(res.data.message);
  };



  //   useEffect(() => {
  // console.log(answer,message,"resmessage")
  // dispatch({type:"SETPARAPHRASE",payload:{answer}})

  //   }, [answer])


  const paraphraseSubmit = () => {
    if (!dataa.message.trim()) {
      toast.warning("Please write something", {});
      return;
    }
    setAnswer([])
    setSpin(true)
    triggerParaphrasing();
  };

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(answer);
  };

  const copyTo = async () => {
    // const commentId = "64229e80f6ed2dc103338bd0";
    // const res = await axios.post("https://commention-backend.onrender.com/copied", {
    //   commentId: commentId,
    // })
    // console.log(res, "eeeeeeeeeeeeeeeeeeeeeeeeeeee")
    navigator.clipboard.writeText(output);
  };

  const deleteParagraph = () => {
    setDataa({
      message: "",
      emotion: "",
      length: ""
    })
  }



  // const res = await axios.post(
  //   "/api/doctor/update-status",
  //   {
  //     appointmentsId: record._id,
  //     status,
  //   },
  //   {
  //     headers: {
  //      Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   }
  // );







  const triggerCommention = async () => {
    try {

      console.log(localStorage.getItem("token"))
      setSpin(true);

      const res = await axios.post("https://commention-backend.onrender.com/comment", {
        data: dataa.message,
        drop: dataa.emotion,
        length: dataa.length,
      },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res, "responseeee");
      setSpin(false);
      setOutput(res.data.message.trim(":\n\nI"));

    } catch (error) {
      console.log(error)
    }
  };


  const commentionSubmit = () => {
    if (!dataa.message.trim()) {
      toast.warning("Please write something", { autoClose: 1000 });
      return;
    }
    triggerCommention();
    setDataa({
      message: "",
      emotion: "",
      length: ""
    })
    setIsEditable(false);
  };

  const handleLogout = () => {
    // localStorage.clear();
    navigate("/login")

  }

  console.log(dataa,"dddddddddddd")



  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://commention-backend.onrender.com/countUsed', {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCount(response.data.count)
      console.log(response.data.count, "responseh")
    }
    fetchData();
  }, [triggerParaphrasing, triggerCommention]);

  useEffect(() => {
    if (count === 0) {
      toast.warning("Sorry, you have used up all your credit. To keep using our service, you need to buy a subscription.", { autoClose: 5000 });
    }
  }, [count]);

  const getEditable = () => {
    setIsEditable(true);

  }


  // moves the menu below the select input
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 0 1px #544fb2' : null,
      '&:hover': {
        borderColor: '#544fb2'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(84, 79, 178, 0.9)' : 'white',
      color: state.isSelected ? 'white' : 'black',
      textAlign:'center',
      '&:hover': {
        backgroundColor: state.isSelected ? 'rgba(84, 79, 178, 1)' : '#cccbe0',
        color: state.isSelected ? 'white' : 'black'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '4px',
      marginTop: '2px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      width:'150px',

    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
      overflow: 'auto',
      "&::-webkit-scrollbar": { 
        width: "10px",
        height:"5px"
      },
      "&::-webkit-scrollbar-thumb": {
        background: '#cccbe0',
        borderRadius: "6px",
      },
    })
  };
  

  //  const handleDelete = () => {
  //   setDataa((prev) => ({ ...prev, length: "Length" }))
  //  }

  // const renderChips = (selected) => {
  //  console.log(selected,"sssssssssssssssssss")
  // return <Chip  label={selected} />

  // }


  // const renderOption = (option, { selected }) => {
  //   console.log("renderOption", option, selected);
  //   return (
  //     <Chip
  //       key={option.value}
  //       label={option.label}
  //       color={selected ? "primary" : "default"}
  //       style={{ margin: "2px" }}
  //     />
  //   );
  // };


  const renderChips = (selected) => {
    if (!Array.isArray(selected)) {
      selected = [selected];
    }
  
    return (
      <div>
        {selected.map((value) => (
          <Chip className="chip" key={value} label={value} />
        ))}
      </div>
    );
  };


  // const handleChipClick = (value) => {
  //   setSelectedValue(value);
  // };

  



  return (
    <>
      <div className="sidebar-container">
        <button className={buttonClassName} onClick={toggleSidebar}>
          Open Sidebar
        </button>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleSidebar}>
            X
          </button>
          <div className="sidebar-header">
            <img
              src={aa}
              alt="icon"
              className="sidebar-header-icon"
              style={{ color: "#0A66C2" }}
              width={60}
              height={60}
            />
            <span className="sidebar-header-title">COMMENTION</span>
          </div>

          <div className="buttons-container">
            <button
              className={`paraphrasing-button ${showContent ? "active" : ""}`}
              onClick={() => setShowContent(true)}
            >
              Paraphrasing
            </button>
            <button
              className={`commention-button ${!showContent ? "active" : ""}`}
              onClick={() => setShowContent(false)}
            >
              Commention
            </button>
          </div>
          {/* <button onClick={handleLogout} className="navigate logout">Logout</button> */}

          {/* <p>{count}</p> */}


          <div className="sidebar-content">

            <div className="credit-count">
              <span className="count"> Count - {count}</span>
            </div>
            <img onClick={handleLogout} className="switchOff" src={switchOff} alt="" />

            {showContent ? (
              <>
                <h2 className="sidebar-content-title">Write Your Paragraph</h2>
                <div className="sidebar-textarea-div">
                  <textarea
                    onChange={(e) =>
                      setDataa((prev) => ({ ...prev, message: e.target.value }))
                    }
                    value={dataa.message}
                    rows={5}
                    className="sidebar-textarea"
                    placeholder="Enter your message"

                  ></textarea>
                  <div className="sidebar-icons">
                    <span className="edit-icon">
                      <MdOutlineModeEditOutline onClick={getEditable} />
                    </span>
                    <span onClick={deleteParagraph} className="delete-icon">
                      <HiOutlineTrash />
                    </span>
                  </div>
                </div>

                <button onClick={paraphraseSubmit} className="sidebar-button">
                  Submit
                </button>

                <div className="output_box">
                  <h2 className="paraphrased-title">Paraphrased Paragraph</h2>
                  <div className="answer-container">
                    {spin ? <>
                      <div className="loading-spinner">
                        <AiOutlineLoading />
                      </div>
                    </> : <>

                      <textarea
                        readOnly={!isEditable} value={answer} className="answer" onChange={(e) => setAnswer(e.target.value)} />
                      <div className="output-box-icons">
                        <MdOutlineModeEditOutline onClick={getEditable} className="icon" />
                        <AiOutlineCopy onClick={copyToClipboard} className="icon" />
                      </div>
                    </>}
                  </div>

                </div>
              </>
            ) : (
              <>
                <h2 className="sidebar-content-title">Drop Message</h2>
                <div className="sidebar-textarea-div">
                  <textarea
                    onChange={(e) =>
                      setDataa((prev) => ({ ...prev, message: e.target.value }))
                    }
                    value={dataa.message}
                    rows={5}
                    className="sidebar-textarea"
                    placeholder="Enter your message"
                  ></textarea>
                  <div className="sidebar-icons">
                    <span className="edit-icon">
                      <MdOutlineModeEditOutline onClick={getEditable} />
                    </span>
                    <span onClick={deleteParagraph} className="delete-icon">
                      <HiOutlineTrash />
                    </span>
                  </div>
                </div>

                  <div className="dropdown-box">

                    <div className="emotion-dropdown">
                    <Select
                      className="select"
                      onChange={(options) =>
                        setDataa((datas) => ({
                          ...datas,
                          emotion: options.value
                        }))
                      }
                      options={options}
                      menuPortalTarget={document.body}
                      isSearchable
                      // value={dataa.emotion}
                      // defaultValue={dataa.emotion}
                      placeholder="Emotion"
                      styles={customStyles}
                    />

                    </div>

                    <div className="chip-container">
  <Chip
    label="10"
    onClick={() => setDataa((prev) => ({...prev,length:10}))}
    color={dataa.length === 10 ? 'primary' : 'default'}
    className={dataa.length === 10 ? 'selected-chip' : 'unselected-chip'}
  />
  <Chip
    label="20"
    onClick={() => setDataa((prev) => ({...prev,length:20}))}
    color={dataa.length === 20 ? 'primary' : 'default'}
    className={dataa.length === 20 ? 'selected-chip' : 'unselected-chip'}
  />
  <Chip
    label="30"
    onClick={() => setDataa((prev) => ({...prev,length:30}))}
    color={dataa.length === 30 ? 'primary' : 'default'}
    className={dataa.length === 30 ? 'selected-chip' : 'unselected-chip'}
  />
</div>









  {/* <Chip/> */}



  {/* <Select
  className="select"
    onChange={(options) =>
      setDataa((datas) => ({
        ...datas,
        length: options.value
      }))
    }
    options={lengths}
    isSearchable
    placeholder="Length"
    styles={customStyles}
  />   */}

{/* <Demo
    className="select"
    onChange={(options) =>{
      console.log(options,"ooooooooooooooooo")
      setDataa((datas) => ({
        ...datas,
        length: options.target.value
      }))
    }
    }
    // options={lengths}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={dataa.length || "Length"}
    label="Age"
    // onChange={handleChange}
    renderValue={renderChips} 
    // renderOption={renderOption}
  >
  {lengths.map((curElem) => {
    return <MenuItem value={curElem.value}>{curElem.label}</MenuItem>
  })}
  </Demo> */}











                    {/* older one is below */}

                  {/* <Select
                    onChange={(options) =>
                      setDataa((datas) => ({
                        ...datas,
                        length: options.value
                      }))
                    }
                    defaultValue={dataa.length}
                    options={lengths}
                    // id="type"
                  // value={dataa.emotion}
                  /> */}
                  {/* <select
                  value={dataa.emotion}
                  onChange={(e) =>
                    setDataa((datas) => ({
                      ...datas,
                      emotion: e.target.value
                    }))
                  }
                >
                  <option value="select">Emotion</option>
                  <option value="funny">Funny</option>
                  <option value="disagree">Disagree</option>
                  <option value="friendly">Friendly</option>
                  <option value="congragulating">Congragulating</option>
                  <option value="appriciating">Appriciating</option>
                  <option value="serious">Serious</option>
                  <option value="lovely">Lovely</option>
                  <option value="shocking">Shocking</option>
                </select> */}




                  {/* <select
                    value={dataa.length}
                    onChange={(e) =>
                      setDataa((datas) => ({
                        ...datas,
                        length: e.target.value
                      }))
                    }
                    id="type"
                  >
                    <option value="select">Length</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select> */}
                </div>

                <button onClick={commentionSubmit} className="sidebar-button">
                  Submit
                </button>

                <div className="output_box">
                  <h2 className="paraphrased-title">Output</h2>
                  <div className="answer-container">
                    {spin ? <>
                      <div className="loading-spinner">
                        <AiOutlineLoading />
                      </div>
                    </> : <>
                      <textarea readOnly={!isEditable} value={output} onChange={(e) => setOutput(e.target.value)} className="answer" />
                      <div className="output-box-icons">
                        <MdOutlineModeEditOutline onClick={getEditable} className="icon" />
                        <AiOutlineCopy onClick={copyTo} className="icon" />
                      </div>
                    </>}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
