import React from "react";

export default function BookCard({book}){
    
    const cover_id = book.cover_i
    const cover_url = cover_id ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg` : 'https://placehold.co/150x200?text=No+Cover+Found'
    return(
        <div className="card">
            <img src={cover_url} alt={book.title} className="image"/>
            <div>
                <h2 className="title">{book.title}</h2><br />
                <p>{book.author_name}</p>
                <p>Published: {book.first_publish_year}</p>
            </div>
        </div>
    )
}