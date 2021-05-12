const express = require('express');
const { translateAliases } = require('../models/task');
const Task = require('../models/task');

const router= new express.Router();

/*tasks routs*/

// add task

router.post('/tasks',async (req,res) => {
    const task=new Task(req.body)
    try{ 
        await task.save()
        res.status(201).send(task)
    }
    catch(err) {
        res.status(400).send(err)
    };
})

//retrieve all tasks

router.get('/tasks',async(req,res) => {
    try {
        const tasks=await Task.find({})
        res.send(tasks)
        
    } catch (err) {
        console.log('error');
        res.status(404).send('error',err)
    }
})

//retrieve task by id

router.get('/tasks/:id',async (req,res) => {
    _id=req.params.id;
    try {
        const task= await Task.findById(_id)
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        
    } catch (err) {
        res.status(500).send(err.name)
        
    }
})

//update task by id

router.patch('/tasks/:id',async (req,res) => {
    const updates= Object.keys(req.body)
    console.log(updates);
  
    //check if update is valid
    const allowedUpdates= ['description','completed']
    const isValidOperation= updates.every((update) => allowedUpdates.includes(update))
     if(!isValidOperation){
        return res.status(400).send('invalid operation')
    }

    try {
        const task= await Task.findById(req.params.id)
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()

        //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
        if (!task){
            res.status(404).send("not found")
            return console.log('error',res.body)
           
        }
        res.send(task)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

//delete task

router.delete('/tasks/:id',async (req,res) => {
    try {
        const task= await Task.findByIdAndDelete(req.params.id,req)
        if(!task){
            return res.status(404).send('not found')
        }
        res.send(task)
    } catch (err) {
        res.status(500).send(err)
    } 
    
})

module.exports = router

