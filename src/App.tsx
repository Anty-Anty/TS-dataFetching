import { useEffect, useState, type ReactNode } from 'react';


import BlogPosts, { type BlogPost } from './components/BlogPosts.tsx'
import { get } from './components/util/http';
import fetchingImg from './assets/data-fetching.png';

type RawDataBlogPost = {
  id:number;
  userId:number;
  title:string;
  body:string;
}

function App() {

  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const data = (await get('https://jsonplaceholder.typicode.com/posts')) as RawDataBlogPost[];

      const blogPosts: BlogPost[] = data.map(rawPost =>{
        return {
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body
        }
      });

      setIsFetching(false);
      setFetchedPosts(blogPosts);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;

if(fetchedPosts){
  content= <BlogPosts posts={fetchedPosts}/>
}

if (isFetching){
  content = <p id="loading-fallback">Fetching posts...</p>
}

  return <main>
    <img src={fetchingImg} alt='image'/>
    {content}
  </main>;
}

export default App;
