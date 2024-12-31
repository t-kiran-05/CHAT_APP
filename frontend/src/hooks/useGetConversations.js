import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/api/users", {
                    credentials: "include", // Include credentials for CORS requests
                });
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;