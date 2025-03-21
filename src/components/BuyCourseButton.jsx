import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/apis/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
    const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
        useCreateCheckoutSessionMutation();

        const purchaseCourseHandler = async () => {
            try {
                const response = await createCheckoutSession(courseId);
        
                if (response?.data?.url) {
                    // Append courseId and userId to redirect URL
                    const successUrl = `${window.location.origin}/purchase-success?courseId=${courseId}&userId=USER_ID`;
                    window.location.href = response.data.url + `&success_url=${encodeURIComponent(successUrl)}`;
                } else {
                    toast.error("Invalid response from server.");
                }
            } catch (err) {
                console.error("Error in API Call:", err);
                toast.error("Failed to initiate payment.");
            }
        };
    
    // const purchaseCourseHandler = async () => {
    //     console.log('creating')
    //     try {
    //         const response = await createCheckoutSession(courseId);
    //         console.log("API Response:", response); // Log response
    //     } catch (err) {
    //         console.error("Error in API Call:", err);
    //     }
    // };

    useEffect(() => {
        console.log('effect')
        console.log(data)
        if (isSuccess) {
            console.log('success')
            if (data?.url) {
                console.log(data.url)
                window.location.href = data.url; // Redirect to stripe checkout url
            } else {
                toast.error("Invalid response from server.")
            }
        }
        if (isError) {
            toast.error(error?.data?.message || "Failed to create checkout session")
        }
    }, [data, isSuccess, isError, error])

    return (
        <Button
            disabled={isLoading}
            onClick={purchaseCourseHandler}
            className="w-full"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </>
            ) : (
                "Purchase Course"
            )}
        </Button>
    );
};

export default BuyCourseButton;