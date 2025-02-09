import { useQuery } from "@tanstack/react-query";
import axios from "axios";

 export function useGetProduct() {
    const grtRecantProducts= ()=> axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    const {isError, error ,isLoading , isFetched ,data }= useQuery({
     queryKey: ['grtRecantProducts'],
     queryFn :  grtRecantProducts ,
     staleTime: 5000*1000
    });
    return {isError, error ,isLoading , isFetched ,data };
    
 }