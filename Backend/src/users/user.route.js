const express = require('express');
const User = require('./user.model'); 
const router = express.Router();
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');


router.post("/register", async (req, res) => { 
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered!" });
        }
        const user = new User({ username, email, password, role: "user" });
        await user.save();

        console.log("New user registered:", req.body);
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error registering user!" });
    }
});

router.post("/login", async (req, res)=> { 
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user) { 
            return res.status(404).json({message: "User not Found"});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message: "Password does not match"});
        }

        const token = await generateToken(user._id);

        res.cookie("token", token, { 
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        res.status(200).json({
            message: "Login Successfully",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                profileImage: user.profileImage,
                role: user.role,
                bio: user.bio,
                profession: user.profession
            }
        });

    } catch (error) {
        console.error("Error Login", error);
        res.status(500).json({ message: "Error Login" });
    }
});


router.post("/logout", async (req, res)=>{
    res.clearCookie('token');
    res.status(200).send({message: "Logout Succesfully"})
})

router.delete("/users/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            res.status(404).send({message: "Deleted"})
        }
        res.status(200).send({message: "Deleted Successfully"})
    } catch (error) {
        console.error("Error Deleting User", error);
        res.status(500).json({ message: "Error Deleting User" });
    }
})

router.get("/getusers", async (req, res) => {
    try {
      const user = await User.find({}, "email username role");
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

router.put("/users/:id", async (req, res) => { 
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { role: role }, 
            { new: true } 
        );
        if (!user) { 
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ message: "Error updating user role" });
    }
});

router.patch("/edit-profile", async (req, res)=>{
    try {
        const {userId, username, profileImage, bio, profession} = req.body;
        if(!userId) {
            return res.status(400).send({message: "User Id required"})
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).send({message: "User not Found"})
        }

        if(username !== undefined) user.username = username;
        if(profileImage !== undefined) user.profileImage = profileImage;
        if(bio !== undefined) user.bio = bio;
        if(profession !== undefined) user.profession = profession;

        await user.save();
        res.status(200).send({message: "Profile Updated Successfully", user: { 
            _id: user._id,
            email: user.email,
            username: user.username,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
        }})
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error registering user!" });
    }
})

module.exports = router;
