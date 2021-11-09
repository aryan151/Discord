import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';  
import styles from './Splash.module.css';   


const SplashPart5 = () => {

    return (
        <div className={styles.header_outer_container} >
            <div className={styles.header_inner_container} >
                <div className={styles.header_text} >
                    <h2>Reliable Tech for Staying Close</h2>
                    <p>Low-latency voice and video feels like you’re in the 
                    same room. Wave hello over video, watch friends stream 
                    their games, or gather up and have a drawing session with 
                    screen share.</p>
                </div>
            </div>
        </div>  
    )
};

export default SplashPart5;