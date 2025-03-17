import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const PurchaseSuccess = () => {
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("courseId");
    const userId = searchParams.get("userId");

    useEffect(() => {
        if (courseId && userId) {
            
            axios.post(`${import.meta.env.VITE_BACKEND_URL}purchase/update-purchase-status`, { courseId, userId })
                .then((res) => {
                    toast.success("Purchase successful! You can now access the course.");
                    window.location.href = `/course-progress/${courseId}`;
                })
                .catch(() => {
                    toast.error("Failed to update purchase status.");
                });
        }
    }, [courseId, userId]);

    return <h2>Processing your purchase...</h2>;
};

export default PurchaseSuccess;
