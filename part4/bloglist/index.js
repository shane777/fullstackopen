
require('dotenv').config();
const app = require('./app');
const blogsRouter = require('./controllers/blog');

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})