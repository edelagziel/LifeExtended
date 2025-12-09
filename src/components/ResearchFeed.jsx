import React,{useEffect, useState} from "react";
import axios from "axios";
import ResearchItem from "./ResearchItem";
function ResearchFeed()
{
   const  [loading,setLoading]=useState(true);
   const [fetchError,setFetchError]=useState(null);
   const [data,setData]=useState([]);

   useEffect(()=>{
    const fetchData=async()=>
    {
        try
        {
            const response = await axios.get("https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=longevity&resultType=core&format=json&pageSize=20");
            setData(response.data.resultList?.result || []);
        }

        catch(error)
        {
            setFetchError(error.message);
        }

        finally
        {
            setLoading(false);
        }

    };

    fetchData();

   },[]);



   return(
    <>
        {loading&&<h1>Loding...</h1>}
        {!loading&& fetchError&&<h1>{fetchError}</h1>}
        {!loading&& !fetchError &&data.length>0&&<div>{data.map((item,index)=>(<ResearchItem key={index} data={item} />))}</div>}
    </>

   );

}


export default ResearchFeed;