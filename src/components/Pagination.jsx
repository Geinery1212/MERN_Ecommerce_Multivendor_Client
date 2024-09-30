import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";


const Pagination = ({ pageNumber, setPageNumber, totalItems, perPage, showItem }) => {
    //showItem its used to calculate the start page
    //pageNumber = 1
    //totalItems= 7
    //perPage = 5
    //showItem = 7/5= 1
    let totalPages = Math.ceil(totalItems / perPage) //2 
    // console.log('totalItems', totalItems, 'perPage', perPage)
    // console.log('TOTAL PAGES', totalPages)   
    let startPage = pageNumber//1

    let diff = totalPages - pageNumber//1
    //diff = 1 //showitem = 1
    if (diff <= showItem) {
        startPage = totalPages - showItem//1
    }

    let endPage = startPage < 0 ? showItem : showItem + startPage //2
    if (startPage <= 0) {
        startPage = 1
    }

    const createBtn = () => {

        const btns = []
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li key={i} onClick={() => setPageNumber(i)} className={` ${pageNumber === i ? 'bg-green-700 shadow-lg shadow-indigo-300/50 text-white' : 'bg-slate-600 hover:bg-green-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'} w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}>
                    {i}
                </li>
            )
        }
        return btns
    }

    return (
        <ul className='flex gap-3'>
            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'>
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            }
            {
                createBtn()
            }
            {/* {console.log('result', pageNumber < totalPages, 'totalPages', totalPages, 'pageNumber', pageNumber)} */}
            {                
                pageNumber < totalPages && <li onClick={() => setPageNumber(pageNumber + 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'>
                    <MdOutlineKeyboardDoubleArrowRight />
                </li>
            }

        </ul>
    )


};

export default Pagination;