
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  console.log("Request body:", req.body); // Log the request body

  const { fullName, username, password, confirmPassword, gender } = req.body;

  // Validate input
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    const foundUser  = await User.findOne({ username });
    
    if (foundUser ) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      // Create a new user
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser  = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      });

      // Save the new user
      await newUser .save();

      // Generate JWT tokens after saving the user
      generateTokenAndSetCookie(newUser ._id, res);

      // Respond with the new user data
      res.status(201).json({
        _id: newUser ._id,
        fullName: newUser .fullName,
        username: newUser .username,
        profilePic: newUser .profilePic,
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error); // Log the entire error
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async(req, res) => {
    try{
      const {username, password} = req.body;
      const user = await User.findOne({username});
      
      console.log("User found:", user); // Log the user object

      if(!user){
        return res.status(400).json({error:"Invalid username "});
      } 
       
      const ispasswordCorrect = await bcryptjs.compare(password, user?.password || "");
      console.log("Password comparison result:", ispasswordCorrect); // Log the password comparison result

        if (!ispasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

      //generate jwt tokens
      generateTokenAndSetCookie(user._id, res);

      res.status(200).json({//user logged in successfully
        _id: user._id,
        fullName: user.fullName,
        username:user.username,
        profilePic:user.profilePic,
      });


     } catch(error){
        console.log("Error in login controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
    
}


export const logout = (req, res) => {
  try {
      // Clear the JWT cookie by setting its value to an empty string and maxAge to 0
      res.cookie('jwt', '', { maxAge: 0 });

      // Send a success response
      res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
       console.error("Error in logout controller:", error.message);
       res.status(500).json({ error: "Internal Server Error" });
  }
};
