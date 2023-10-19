import { useNavigate } from "react-router-dom";
let navigate = useNavigate();

useEffect(() => {
   if (LoggedIn){
      return navigate("/");
   }
},[LoggedIn]);