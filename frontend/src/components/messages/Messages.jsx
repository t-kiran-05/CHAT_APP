
import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const containerRef = useRef();
    const lastMessageRef = useRef();

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                if (lastMessageRef.current) {
                    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
                }
            }, 400);
        }
    }, [messages]);

    return (
        <div ref={containerRef} className='px-4 flex-1 overflow-auto'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message, index) => (
                    <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;

// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";

// const Messages = ({ conversationId }) => {
//     const { messages, loading } = useGetMessages(conversationId);
//     useListenMessages();
//     const containerRef = useRef();
//     const lastMessageRef = useRef();

//     useEffect(() => {
//         if (messages.length > 0) {
//             setTimeout(() => {
//                 if (lastMessageRef.current) {
//                     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//                 }
//             }, 400);
//         }
//     }, [messages]);

//     return (
//         <div ref={containerRef} className='px-4 flex-1 overflow-auto'>
//             {!loading &&
//                 messages.length > 0 &&
//                 messages.map((message, index) => (
//                     <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
//                         <Message message={message} />
//                     </div>
//                 ))}

//             {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
//             {!loading && messages.length === 0 && (
//                 <p className='text-center'>Send a message to start the conversation</p>
//             )}
//         </div>
//     );
// };

// export default Messages;