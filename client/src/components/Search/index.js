import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm";
import Container from "../Container"; 
import API from "../../utils/API"

function Search() {
    console.log("Enter Search");
    const [search, setSearch] = useState("Wiki");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");


    const handleInputChange = event => {
        setSearch(event.target.value)
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        API.getBook(search)
            .then(res => {
                if (res.data.length == 0) {
                    throw new Error("No results Found");
                }
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                setTitle(res.data[1][0]);
            })
            .catch(err => setError(err));

    }

    useEffect(() => {
        if (!search) {
            return;
        }

        API.getBook(search)
            .then(res => {
                if (res.data.length == 0) {
                    throw new Error("No results Found");
                }
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                setTitle(res.data[1][0]);
            })
            .catch(err => setError(err));
    }, [search]);

    return (
        <div>
            <Container style={{ minHeight: "100vh" }} />
            <h1 className="text-container"> Search for some book </h1>
            <SearchForm
                handleFormSubmit={handleFormSubmit}
                handleInputChange={handleInputChange}
                results={search}
            />
        </div>

    )

};

export default Search;