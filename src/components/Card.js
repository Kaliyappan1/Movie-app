import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

const Card = ({data, trending, index}) => {
    const imageURL = useSelector((state) => state.movieoData.imageURL);

  return (
    <div className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden rounded relative'>
        <img src={imageURL+data?.poster_path} />
        <div className='absolute top-4'>
        {
            trending && (
                <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/20 overflow-hidden'>
                    #{index} Trending
                </div>
            )
        }
        </div>

        <div className='absolute bottom-0 h-17 backdrop-blur-3xl w-full bg-black/20 p-2'>
            <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
            <div className='text-sm text-neutral-400 flex justify-between'>
                <p>{moment(data.release_date).format("MMM Do YYYY")}</p>
                <p className='bg-black/70 px-2 rounded-full text-xs text-white py-1'>Rating: {Number(data.vote_average).toFixed(1)}</p>
            </div>
        </div>
    </div>
  )
}

export default Card