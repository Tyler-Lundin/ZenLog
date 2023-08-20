import { AppDispatch } from "@/_store";
import { RootState } from "@/_store";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "@/_store/slices/dashboardSlice";
import postVitalsThunk from "@/_store/thunks/postVitalsThunk";
import { toggleVitals } from "@/_store/slices/uiSlice";


export default function useVitals() {
  const { currentStep, mood, bodyweight, sleep } = useSelector((state: RootState) => state.dashboard.vitals)
  const { isVitalsOpen } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch<AppDispatch>();
  const isFirstStep = currentStep === 0;
  const isDone = mood.status === 'COMPLETE' && bodyweight.status === 'COMPLETE' && sleep.status === 'COMPLETE';

  return {
    currentStep,
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep()),
    handleClose: () => dispatch(toggleVitals()),
    handleSubmit: () => dispatch(postVitalsThunk()),
    handleOpen: () => dispatch(toggleVitals()),
    isFirstStep,
    isVitalsOpen,
  }
}
