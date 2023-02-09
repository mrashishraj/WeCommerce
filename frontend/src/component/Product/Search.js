import React,{Fragment,useState} from 'react'
import "./Search.css"

const Search = ({history}) => {
    const [keyword,setKeyword] = useState("")

    const searchSubmitHandler = (e)=>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        }else{
            history.push('/products')
        }
    }


    return (
        <Fragment>
            <form onSubmit={searchSubmitHandler} className="searchBox">
                <input type="text" placeholder='Search a product ...' onChange={e=>setKeyword(e.target.value)} />
                <input type="submit" value="search" />
            </form>
        </Fragment>
    )
}

export default Search