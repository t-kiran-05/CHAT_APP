import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
 
	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:5000/", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import { io } from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
//     return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const { authUser } = useAuthContext();

//     useEffect(() => {
//         if (authUser) {
//             console.log("Connecting to socket with user ID:", authUser._id);
//             const socket = io('http://localhost:5000', {
//                 query: {
//                     userId: authUser._id,
//                 },
//                 withCredentials: true,
//             });

//             setSocket(socket);

//             // Listen for online users
//             socket.on("getOnlineUsers", (users) => {
//                 console.log("Online users:", users);
//                 setOnlineUsers(users);
//             });

//             // Listen for new messages
//             socket.on("newMessage", (message) => {
//                 console.log("New message received:", message);
//                 // Handle the new message (e.g., update state or notify user)
//             });

//             // Handle socket connection errors
//             socket.on("connect_error", (error) => {
//                 console.error("Socket connection error:", error);
//             });

//             socket.on("error", (error) => {
//                 console.error("Socket error:", error);
//             });

//             return () => {
//                 console.log("Disconnecting socket");
//                 socket.close();
//                 setSocket(null);
//             };
//         } else {
//             if (socket) {
//                 console.log("Closing socket due to no authUser");
//                 socket.close();
//                 setSocket(null);
//             }
//         }
//     }, [authUser]);

//     return (
//         <SocketContext.Provider value={{ socket, onlineUsers }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };