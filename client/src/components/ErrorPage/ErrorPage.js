import image from './chatBlan.png';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="row justify-content-center">
            <h1 className="display-2 text-bold">La page n'a pas été trouvée</h1>
            <img className="ms-5 w-25 h-25" src={image} alt="Erreur"/>
            <Link to="." relative="/login">
                Retourner à l'accueil
            </Link>
        </div>
    );
};
export default ErrorPage;


