

export default async function Home() {
  const blogs= await fetchBlogs()
  console.log(blogs,"blogss")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     test
    </main>
  );
}
async function fetchBlogs(){
const options={
  headers:{
    Authorization:`Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  }
}
try{
const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}api/blogs`,options)
const format = await res.json()
console.log(format,"format")
return format
}catch(err){
  console.log(err,"err")
}
}