import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-2'>
     <div className='flex items-center justify-center gap-4'>
     <a target='_blank' href="https://kaliyappan-r.web.app/">About</a>
      <a target='_blank' href="mailto:kaliyappanr.tech@gmail.com">Contact</a>
     </div>
     <p className='text-sm text-white'>Created by Dynamic Coding with Kaliyappan</p>
    </footer>
  )
}

export default Footer