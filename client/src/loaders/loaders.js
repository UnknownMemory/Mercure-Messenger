import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

export const isNotLoggedLoader = async (request) => {
    const url = request.request.url;
    if (!Cookies.get("auth")) {
      if(!url.includes('login') && !url.includes('register')){
        return redirect("/login");
      }
    } else {
      if(!url.includes('wetchat')){
        return redirect("/wetchat/home")
      }
    }
};