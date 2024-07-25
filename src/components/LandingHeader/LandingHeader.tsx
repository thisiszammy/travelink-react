import { User } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGripLinesVertical, faCircleUser, faSortDown } from '@fortawesome/free-solid-svg-icons';
import './LandingHeader.css';
import TopBar from '../TopBar';


function HeaderButtons(){
    return (
        <div></div>
    );
}

export default function LandingHeader({user} : {user:User|null}){

    if(user == null){

        return (
            <div className='landingheader-container'>
                <h2>TraveLink</h2>
                <div className='landingheader-actions'>
                    <ul>
                        <li><FontAwesomeIcon icon={faBell} /></li>
                        <li>|</li>
                        <li><FontAwesomeIcon icon={faCircleUser}/></li>
                        <li>thisiszammy</li>
                        <li className='dropdown'>
                            <FontAwesomeIcon icon={faSortDown}/>
                            
                        </li>
                    </ul>
                </div>
            </div>
        );
        
    }else{
        
        return (
            <div className='landingheader-container'>
                <h2>TraveLink</h2>
                <h3><a href=''>Sign In</a></h3>
            </div>  
        );
    }

   


}       