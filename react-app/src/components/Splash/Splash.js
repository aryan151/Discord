import AHours from '../video/AHours.mp4'    
import { Link } from "react-router-dom";
import { Redirect, NavLink } from 'react-router-dom';
import './Splash.css'
import { AiOutlineLogin } from 'react-icons/ai'
import { IoIosMail } from "react-icons/io";
import { IoMdVolumeHigh } from "react-icons/io";  
import part1 from '../video/Splash1.svg'       

function Splash() {
                
     
    return (   
        <>
        <div className='splash-page'>
            <video className='loginbackground'autoplay="autoplay" playsinline="playsinline" muted="muted" loop="loop" src={AHours}></video>
            <ul className='logIn'>
                <li className='loginbutton'>
                    <a href="/login">  
                        <AiOutlineLogin/>
                    </a>  
                </li>  
                <li className='loginbutton'>
                    <Link to="/signup"> 
                    <i class="fas fa-user-plus"></i>
                    </Link>  
                </li>          
                <li className='loginbutton'>
                    <a href="#Screen1">    
                    <i class="fas fa-cocktail"></i>
                    </a>  
                </li>
                <li className='loginbutton'>
                    <a href="#Screen2">  
                    <i class="fas fa-cocktail"></i>
                    </a>  
                </li>
                <li className='loginbutton'>
                    <a href="#Screen3">  
                    <i class="fas fa-gamepad"></i>
                    </a>  
                </li>
                <li className='loginbutton'>
                    <a href="#Screen4">  
                        <AiOutlineLogin/>
                    </a>  
                </li>
                <li className='loginbutton'>
                    <a href="#Screen5">  
                        <AiOutlineLogin/>
                    </a>  
                </li>
                <li className='loginbutton'>
                    <a href="#footer">    
                    <i class="far fa-address-card"></i>
                    </a>  
                </li> 
            </ul>       
       
            <div className="Screen1" id='Screen1'> 
                <h1>IMAGINE A PLACE...</h1>       
                <h2>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h2>
            </div>     

    
            
            <div className="Screen2" id='Screen2'>  
                <div className='thirdimg'>
                    <p className='hiddentext' >sssssssssdddddddddddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>     
                </div> 
                <div className="homeContentWords">
                    <h3>Create an invite-only place where you belong</h3>
                    <h4>Discuss servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</h4>
                </div>
            </div>

            <div className="Screen3" id='Screen3'>
                <div className="homeContentWords" id="shiftRight">
                    <h3>Where hanging out is easy</h3>
                    <h4>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</h4>
                </div>
                <div className='secondimg'>
                    <p className='hiddentext'>sssssssssdddddddddddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>     
                </div>
            </div>
  
            <div className="Screen4" id='Screen4'>
            <div className='thirdimg'>
                        <p className='hiddentext'>ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>     
                    </div>
                <div className="homeContentWords">
                    <h3>From few to a fandom</h3>
                    <h4>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</h4>
                </div>
            </div>     

   
            <div className="Screen5" id='Screen5'>
                <h3>RELIABLE TECH FOR STAYING CLOSE</h3> 
                <h4>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</h4>
                <div className='fourthimg'>
                        <p className='hiddentext'>ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>     
                    </div>
            </div>

                 
            <div className='footer' id='footer'>
                <p> Created By</p>
                <p> Aryan Attul</p>
                <p> Nick Frase</p>
                <p> Ethan Harwell</p>   
                <p> Joey Peterson</p>
            </div>
        </div>   
        </>
    )  
};


export default Splash;
