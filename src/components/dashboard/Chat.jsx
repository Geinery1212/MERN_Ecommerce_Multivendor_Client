import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import userImage from '../../assets/images/user.png'
import demoImage from '../../assets/images/admin.png'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { socket_connection } from '../../connection/global';
import { add_friend_seller, addNewMessage, chatMessageClear, send_message } from '../../store/reducers/chatReducer';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';
const Chat = () => {
    const dispatch = useDispatch();
    const [newMessageText, setNewMessageText] = useState('');
    const [newMessageReceived, setNewMessageReceived] = useState({});
    const [allSellersActive, setAllSellersActive] = useState([]);
    const { sellerId } = useParams();
    const { userInfo } = useSelector(state => state.auth);
    const { chatLoader, chatSuccessMessage, chatErrorMessage, myFriends, friendMessages, currentFriend } = useSelector(state => state.chat);
    const scrollRef = useRef();
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(socket_connection); 

        if (userInfo) {
            socketRef.current.emit('add_customer', userInfo);
        }

        socketRef.current.on('seller_message', msg => {
            setNewMessageReceived(msg);
        });

        socketRef.current.on('activeSellers', allSellers => {
            setAllSellersActive(allSellers);
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });

        return () => {
            socketRef.current.disconnect(); // Disconnect the socket on cleanup
        };
    }, []); // Depend on userInfo

    useEffect(() => {
        if (chatSuccessMessage !== '' && friendMessages.length > 0) {
            const lastMessage = friendMessages[friendMessages.length - 1];
            socketRef.current.emit('send_customer_message', lastMessage);
            dispatch(chatMessageClear());
        }
    }, [chatSuccessMessage, friendMessages]);

    const send = (e) => {
        e.preventDefault();
        if (newMessageText) {
            dispatch(send_message({
                userId: userInfo.id,
                newMessageText,
                sellerId,
                name: userInfo.name
            }));
            setNewMessageText(''); 
        }
    };

    useEffect(() => {
        if (userInfo) {
            dispatch(add_friend_seller({
                sellerId: sellerId || "",
                userId: userInfo.id
            }));
        }
    }, [sellerId, userInfo]);

    useEffect(() => {
        if (newMessageReceived && newMessageReceived.senderName) {            
            if (newMessageReceived.senderId === sellerId && newMessageReceived.receiverId === userInfo.id) {
                dispatch(addNewMessage(newMessageReceived));
            } else {
                toast.success(`${newMessageReceived.senderName} sent a message`);
                dispatch(chatMessageClear());
            }
        }
    }, [newMessageReceived]);

    useEffect(() => {
        if (scrollRef.current) {
            const offset = 0; 
            const container = scrollRef.current.parentElement; 
            container.scroll({
                top: container.scrollHeight - container.clientHeight - offset,
                behavior: 'smooth'
            });
        }
    }, [friendMessages]);

    return (
        <div>
            {
                chatLoader ? <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div> : <div className='bg-white p-3 rounded-md'>
                    <div className='w-full flex'>
                        <div className='w-[230px]'>
                            <div className='flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]'>
                                <span><AiOutlineMessage /></span>
                                <span>Message</span>
                            </div>
                            <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3'>
                                {
                                    myFriends && myFriends.map((friend, i) => {
                                        return <Link key={i} to={`/dashboard/chat/${friend.fdId}`} className={`flex gap-2 justify-start items-center pl-2 py-[5px]`} >
                                            <div className='w-[30px] h-[30px] rounded-full relative'>
                                                {allSellersActive.some((s) => s.sellerId === friend.fdId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>}
                                                <img src={friend.image ? friend.image : demoImage} alt="" />
                                            </div>
                                            <span>{friend.name}</span>
                                        </Link>

                                    })
                                }

                            </div>
                        </div>
                        <div className='w-[calc(100%-230px)]'>
                            {
                                currentFriend ? <div className='w-full h-full'>
                                    <div className='flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
                                        <div className='w-[30px] h-[30px] rounded-full relative'>
                                            {allSellersActive.some(s => s.sellerId === currentFriend.fdId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>}
                                            {currentFriend.image !== '' ? <img src={currentFriend.image} alt="" /> : <img src={demoImage} alt="" />}
                                        </div>
                                        <span>{currentFriend.name}</span>
                                    </div>
                                    <div className='h-[400px] w-full bg-slate-100 p-3 rounded-md'>
                                        <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
                                            {
                                                friendMessages && friendMessages.map((msg, i) => {
                                                    const isSender = msg.senderId === userInfo.id;
                                                    const isRecipient = msg.senderId === sellerId;
                                                    let senderImage = '';
                                                    let receiverImage = '';

                                                    for (let i = 0; i < myFriends.length; i++) {
                                                        if (myFriends[i].fdId === currentFriend.fdId) {
                                                            receiverImage = myFriends[i].image;
                                                        }
                                                    }



                                                    return (
                                                        <div key={i} ref={scrollRef} className={`w-full flex gap-2 justify-${isSender ? 'end' : 'start'} items-center text-[14px]`}>
                                                            <img className='w-[30px] h-[30px]' src={isSender ?
                                                                senderImage !== '' ? senderImage : userImage
                                                                : receiverImage !== '' ? receiverImage : demoImage} alt="" />
                                                            <div className={`p-2 rounded-md ${isSender ? 'bg-purple-500' : isRecipient ? 'bg-cyan-500' : 'bg-gray-300'}`}>
                                                                <span>{msg.message}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                    <form className='flex p-2 justify-between items-center w-full' onSubmit={send}>
                                        <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
                                            <label className='cursor-pointer' htmlFor=""><AiOutlinePlus /></label>
                                            <input className='hidden' type="file" />
                                        </div>
                                        <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
                                            <input value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)} type="text" placeholder='input message' className='w-full rounded-full h-full outline-none p-3' />
                                            <div className='text-2xl right-2 top-2 absolute cursor-auto'>
                                                <span><GrEmoji /></span>
                                            </div>
                                        </div>
                                        <div className='w-[40px] p-2 justify-center items-center rounded-full'>
                                            <button className='text-2xl cursor-pointer'>
                                                <IoSend />
                                            </button>
                                        </div>
                                    </form>
                                </div> : <div className='w-full h-full flex justify-center items-center text-lg ont-bold text-slate-600'>
                                    <span>select seller</span>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
export default Chat;