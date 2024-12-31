// // import { useEffect } from "react";
// import React, { useEffect, useState } from 'react';
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { messages, setMessages } = useConversation();

// 	useEffect(() => {
// 		socket?.on("newMessage", (newMessage) => {
// 			newMessage.shouldShake = true;
// 			const sound = new Audio(notificationSound);
// 			sound.play();
// 			setMessages([...messages, newMessage]);
// 		});

// 		return () => socket?.off("newMessage");
// 	}, [socket, setMessages, messages]);
// };
// export default useListenMessages;

import { useEffect } from 'react';
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);

    return null; // This hook does not render anything
};

export default useListenMessages;