import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import logoImage from "../../assets/images/logo.svg"
import { searched } from "../../features/FilterSlice";
export default function Navbar(){

    const [searchText,setSearchText]= useState('');
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };
    const dispatch = useDispatch();
    const handleSearch= (value)=>{
        setSearchText(value);
        console.log(value)
        dispatch(searched(value));
    }

    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
            <Link  to={'/'}>
                <img src={logoImage} alt="logo"/>
            </Link>
            <div className="flex-1 max-w-xs search-field group">
                <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                <input type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" value={searchText} onChange={(e)=>handleSearch(e.target.value)} />
            </div>
            </div>
        </nav>
    )
}