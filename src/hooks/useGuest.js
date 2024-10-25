import { useContext } from "react";
import GuestContext from "../contexts/GusetContext";

export default function useGuest() {
    return useContext(GuestContext)
}