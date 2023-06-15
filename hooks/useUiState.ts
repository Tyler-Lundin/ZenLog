import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

export default function useUiState() {
  const { isNavigationOpen } = useSelector((state: RootState) => state.ui)

  return {
    isNavigationOpen,
  }
}
