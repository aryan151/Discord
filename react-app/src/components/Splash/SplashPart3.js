import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';  
import styles from './Splash.module.css';   
import AHours from '../video/SplashVID.mp4'


const SplashPart3 = () => {

    return (
        <div className={styles.header_outer_container} >
            <div className={styles.header_inner_container} >
                <div className={styles.header_text} >
                    <h2>Where hanging out is easy</h2>
                    <p>Grab a seat in a voice channel when you’re free. 
                        Friends in your server can see you’re around and 
                        instantly pop in to talk without having to call.</p> 
                </div>
            </div>
        </div>  
    )
};
  
export default SplashPart3; 