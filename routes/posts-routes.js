const router = require('express').Router();
const Posts = require('../data/db');

//middleware router.use(mw)

//synchronous GET/
// router.get('/', (req, res) => {
//   Posts.find()
//     .then(allPosts => {
//       res.status(200).json(allPosts);
//     })
//     .catch(err => {
//       res.status(404).json(err);
//     });
// });

//async GET/

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error retrieving posts' });
  }
});

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   Posts.findById(id)
//     .then(singlepost => {
//       if (id) {
//         res.json(singlepost);
//       } else {
//         res.status(403).json({ message: 'there is no posting, only Zuul!' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

//async GET/ by id

router.get('/:id', async (req, res) => {
  try {
    const singlepost = await Posts.findById(req.params.id);
    if (singlepost) {
      res.status(200).json(singlepost);
    } else {
      res.status(404).json({ message: "can't find your post" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'danger will robinson!' });
  }
});

//Sync PUT/
// server.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;
//   db.update(id, changes).then(updated => {
//     if (updated) {
//       res.json(updated);
//     } else {
//       res.status(404).json({ err: 'cannot find post' });
//     }
//   }).catch;
// });

//Async PUT/

router.put('/:id', async (req, res) => {
  try {
    const updated = await Posts.update(req.params.id, req.body);
    if (updated) {
      res.status(201).json(updated);
    } else {
      res.status(404).json({ message: 'there is no post, only Zuul' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', (req, res) => {
//   const post = req.body;
//   Posts.insert(post)
//     .then(newpost => {
//       res.status(201).json(newpost);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

//async post
router.post('/', async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ err: 'could not add post' });
  }
});

//sync DELETE
// server.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   db.remove(id)
//     .then(bye => {
//       res.status(200).json(bye);
//     })
//     .catch(err => {
//       res.status(404).json(err);
//     });
// });

// // async DELETE/ simple
// router.delete('/:id', async(req, res)=>{
//   try{
//     const seeya = await Posts.remove(req.params.id);
//     res.status(200).json(seeya)
//   } catch (err){
//     res.status(500).json(err)
//   }
// })

//async DELETE/ complex
router.delete("/:id", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked" });
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the hub"
    });
  }
});

module.exports = router;
