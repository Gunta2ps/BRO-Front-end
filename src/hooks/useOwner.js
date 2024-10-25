import { useContext } from "react";
import OwnerContext from "../contexts/OwnerContext";

export default function useOwner() {
    return useContext(OwnerContext)
}