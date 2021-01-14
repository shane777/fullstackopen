const dummy = (blogs) => {
  return 1;
}

const totalLikes = ( blogs ) => {
  if(Array.isArray(blogs) && blogs.length > 0) return blogs.reduce((p,c)=> p + c.likes , 0);
  else return 0;
}

const favoriteBlog = (blogs) => {
  if(!Array.isArray(blogs) || blogs.length < 1) return false;
  const max =  blogs.reduce((p, c)=> p.likes >= c.likes? p : c);
  const { title, author, likes} = max;
  return {
    title,
    author,
    likes
  };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}