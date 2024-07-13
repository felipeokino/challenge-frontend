import {
  NavigateFunction,
  useNavigate as useDefaultNavigate,
} from "react-router-dom";

type useCustomNavigateProps = {
  navigate: NavigateFunction;
  goBack: () => void;
  goHome: () => void;
};
const useCustomNavigate = (): useCustomNavigateProps => {
  const navigate = useDefaultNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return { navigate, goBack, goHome };
};

export default useCustomNavigate;
