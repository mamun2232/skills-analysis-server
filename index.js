const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()

// middele Ware 
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.Name}:${process.env.PASSWORD}@admin.ooldg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){

      try{

            await client.connect()
            const webCollection = client.db("Web").collection("Skills");
            const appCollection = client.db("App").collection("Skills");
         

            app.get('/webSkill' , async (req , res) =>{
                  const query = {}
                  const result = await webCollection.find(query).toArray()
                  res.send(result)
            })
            app.post('/skill', async (req, res) => {
                  const skills = req.body
               
                  const result = await webCollection.insertOne(skills)
                  res.send({ message: "Skill Added Successfull!" })
            })

            app.get("/webSkill/:id" , async (req, res) =>{
                  const id = req.params.id
                  const quury = {_id : ObjectId(id)}
                  const result = await webCollection.findOne(quury)
                  res.send(result)
            })

            app.patch('/webSkill/:id' ,  async (req , res) =>{
                  const id = req.params.id
                 
                  const filter = {_id: ObjectId(id)}
                  const updateDoc = {
                        $set: {
                              seleted: true,
                              
                        }
                  }

                  const result = await webCollection.updateOne(filter , updateDoc)
                
            })
            app.patch('/webSkillUpdate/:id' ,  async (req , res) =>{
                  const id = req.params.id
                 
                  const filter = {_id: ObjectId(id)}
                  const updateDoc = {
                        $set: {
                              seleted: false,
                              
                        }
                  }

                  const result = await webCollection.updateOne(filter , updateDoc)
                
            })

            // app development 
            app.get('/appSkill' , async (req , res) =>{
                  const query = {}
                  const result = await appCollection.find(query).toArray()
                  res.send(result)
            })
            app.patch('/appSkill/:id' ,  async (req , res) =>{
                  const id = req.params.id
                 
                  const filter = {_id: ObjectId(id)}
                  const updateDoc = {
                        $set: {
                              seleted: true,
                              
                        }
                  }

                  const result = await appCollection.updateOne(filter , updateDoc)
                
            })
            app.patch('/appSkillUpdate/:id' ,  async (req , res) =>{
                  const id = req.params.id
                 
                  const filter = {_id: ObjectId(id)}
                  const updateDoc = {
                        $set: {
                              seleted: false,
                              
                        }
                  }

                  const result = await appCollection.updateOne(filter , updateDoc)
                
            })

            app.post('/appskill', async (req, res) => {
                  const skills = req.body
               
                  const result = await webCollection.insertOne(skills)
                  res.send({ message: "Skill Added Successfull!" })
            })

      }
      finally{

      }     
}

run().catch(console.dir)






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})