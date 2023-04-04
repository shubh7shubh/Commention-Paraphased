import React, {useState, useEffect} from 'react'
import axios from "axios"
import "./App.css"
import { useDispatch} from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const UserForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { users } = useSelector((state) => state.User_Register);
    // console.log(users[0]._id,"userrrrr")
    // console.log(users.name,"userrrrrrrrrrrrrrrrr ")
 

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        occupation: '',
        found: '',
        hope: '',
      });


      useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/userForm")
        }else{
          navigate("/")
        }
      }, [])



    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

    //   console.log(formData,"fromdattttttttttttt")
    
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
        
    //   };

    const handleSubmit = async (event) => {
        event.preventDefault();
    //    setTimeout(() => {    
    //     onSubmit();
    //    }, 2000); 

    // onSubmit();
        // document.querySelector(".wrapper").classList.add("open");
        // setSpin(true);
        // console.log(formData, "dataaaaaaaaaaaaaaa");
        const res = await axios.post("https://commention-backend.onrender.com/user-details", {
          name: formData.name,
          email: formData.email,
          occupation: formData.occupation,
          found: formData.found,
          hope: formData.hope,
        });
        // alert(res.data.message)
        toast.success(res.data.message)
        // console.log(res,"eeeeeeeeeeeeeeeeeeeeeeeeeee")
        dispatch({ type: "SETUSERDETAILS", payload: res.data.data })
        if(res.status === 201){    
            localStorage.setItem("token",res.data.token);  
            navigate("/") 
          }else{
          console.error("invalid")
           }   
        // setDetailsForm(true)
        setFormData({
            name: '',
            email: '',
            occupation: '',
            found: '',
            hope: '',
        })
        // setSpin(false);
        // setOutput(res.data.message);
         
      };




    return <>
     
    <form onSubmit={handleSubmit}>
            <label className='name' htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="occupation">Occupation:</label>
            <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
            
            />

            <label htmlFor="found">How did you find us?</label>
            <select id="foundUs" name="found" value={formData.found} onChange={handleInputChange}>
                <option value="">Please select an option</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="other">Other</option>
            </select>

            <label htmlFor="hope">Why do you want to use our platform?</label>
            <textarea
                id="hope"
                name="hope"
                value={formData.hope}
                onChange={handleInputChange}
                rows="5"
            />

            <button type="submit">Submit</button>
        </form>

       

        {/* <button className='navigate' onClick={() => navigate("/")}>Go to Home page</button> */}
        {/* <button className='navigate' onClick={() => navigate("/")}>Go to Home page</button> */}
        {/* <button className='navigate' onClick={() => navigate("/")}>Go to Home page</button> */}
        {/* <button className='navigate' onClick={() => navigate("/")}>Go to Home page</button> */}
    </>


}

export default UserForm;
