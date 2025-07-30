const express = require("express")
const router = express.Router();
const Todo=require("../models/todo")


// ➤ 할 일 추가
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: "할 일을 저장하지 못했습니다." });
  }
});


router.get("/",async(req,res)=>{
    try {
        const todos=await Todo.find().sort({createdAt:-1})
        res.json(todos)
    } catch (error) {
        res.status(500).json({message:"데이터를 불러오지 못했습니다.",error})
    }
})

module.exports=router
