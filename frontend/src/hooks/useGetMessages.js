import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const useGetMessages = (conversationId) => {
//     const [loading, setLoading] = useState(false);
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const getMessages = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch(`/api/messages/${conversationId}`, {
//                     credentials: "include", // Include credentials for CORS requests
//                 });
//                 if (!res.ok) {
//                     throw new Error(`Error: ${res.status} ${res.statusText}`);
//                 }
//                 const data = await res.json();
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }
//                 setMessages(data);
//             } catch (error) {
//                 toast.error(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getMessages();
//     }, [conversationId]);

//     return { loading, messages };
// };

// export default useGetMessages;