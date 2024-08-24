import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import _ from 'lodash';  // <-- Import lodash for debouncing

const ExplorePage = () => {
  const params = useParams()
  const [pageNo,setPageNo] = useState(1)
  const [data,setData] = useState([])
  const [totalPageNo,setTotalPageNo] = useState(0)

  console.log("params",params.explore)

  const fetchData = async()=>{
    try {
        const response = await axios.get(`/discover/${params.explore}`,{
          params : {
            page : pageNo
          }
        })
        setData((preve)=>{
          return[
              ...preve,
              ...response.data.results
          ]
        })
        setTotalPageNo(response.data.total_pages)
    } catch (error) {
        console.log('error',error)
    }
  }

  // Updated handleScroll function with debounce
  const handleScroll = _.debounce(() => {
    if((window.innerHeight + window.scrollY ) >= document.body.offsetHeight - 1000){
      setPageNo(preve => preve + 5)
    }
  }, 200);  // <-- Debounce delay in milliseconds (200ms)

  useEffect(()=>{
    fetchData()
  },[pageNo])

  useEffect(()=>{
      setPageNo(5)
      setData([])
      fetchData()
  },[params.explore])

  useEffect(()=>{
      window.addEventListener('scroll',handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };  // <-- Clean up the event listener on component unmount
  },[])

  return (
    <div className='py-16'>
        <div className='container mx-auto'>
            <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {params.explore} show</h3>

            <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
              {
                data.map((exploreData,index)=>{
                  return(
                    <Card data={exploreData} key={exploreData.id+"exploreSEction"} media_type={params.explore}/>
                  )
                })
              }
            </div>
        </div>
    </div>
  )
}

export default ExplorePage
