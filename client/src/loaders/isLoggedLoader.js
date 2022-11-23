import { redirect } from "react-router-dom";

export async function isLoggedLoader() {
    return redirect('/register');
}