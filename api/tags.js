const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } =  require('../db'); 

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
    next();
});

const { getAllTags } =  require('../db'); 

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
    res.send({
        tags 
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params;

    
    
    try {
      
      const getTagNamePosts = await getPostsByTagName(tagName);

      const tags = getTagNamePosts.filter(tag => {
        return tag.active || (req.user && tag.author.id === req.user.id);
      });
      
      res.send({
        tags 
      })

    } catch ({ name, message }) {
      next({ name, message})
    }
  });

module.exports = tagsRouter;