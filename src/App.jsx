import React, {useState} from "react";
import BookCard from "./components/BookCard";
import './index.css'

export default function App(){
  let [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async(e) =>{
    e.preventDefault()
    if(!query){
      return
    }
    setLoading(true)

    query = query.replaceAll(" ", "+")
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`

    try{
      const response =  await fetch(url)
      let data = await response.json()
      setBooks(data.docs)
    }
    catch(error){
      console.error("Error fetching data: ", error)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="BookCard">  
      <h1>Book Pal</h1>
      <p className="slogan">Your #1 Book Finder</p>
      <br />
      <form onSubmit={handleSearch}>
        <input class="searchBox" type="text" placeholder="Search for books, authors, genres..." value={query} onChange={(e)=>setQuery(e.target.value)}/>
      </form>

      {loading? 
      (  <p className="statusText">Searching...</p>) :
      (<p className="statusText">Book Pal is Ready! (Press &crarr; to search)</p>)}

      <div className="booksContainer">
        {books.map((book)=>{
          return(
          <BookCard key={book.key} book={book}></BookCard>
          )
        })}
      </div>

      {!loading && books.length==0 && query &&(
        <p className="statusText">No matching books found...</p>
      )}

    </div>
  )
}