import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pageNumber = 1, setPageNumber, totalItems = 1, perPage = 1, showItem = 5 }) => {
    const totalPages = Math.ceil(totalItems / perPage);

    const startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
    const endPage = Math.min(totalPages, startPage + showItem - 1);

    const createBtn = () => {
        const btns = [];
        for (let i = startPage; i <= endPage; i++) {
            btns.push(
                <li
                    key={i}
                    onClick={() => setPageNumber(i)}
                    className={`${
                        pageNumber === i
                            ? 'bg-green-700 shadow-lg shadow-indigo-300/50 text-white'
                            : 'bg-slate-600 hover:bg-green-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'
                    } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
                >
                    {i}
                </li>
            );
        }
        return btns;
    };

    return (
        <ul className="flex gap-3">
            {pageNumber > 1 && (
                <li
                    onClick={() => setPageNumber(pageNumber - 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
                >
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            )}
            {createBtn()}
            {pageNumber < totalPages && (
                <li
                    onClick={() => setPageNumber(pageNumber + 1)}
                    className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
                >
                    <MdOutlineKeyboardDoubleArrowRight />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
