import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';  
import styles from './Splash.module.css';   
import AHours from '../video/SplashVID.mp4'


const SplashPart4 = () => {

    return (
        <div className={styles.header_outer_container} >
            <div className={styles.header_inner_container} >
                <div className={styles.header_text} >
                    <h2>From few to a fandom</h2>
                    <p> Get any community running with moderation tools and 
                        custom member access. Give members special powers, 
                        set up private channels, and more.</p>
                </div>
            </div>
        </div>  
    )
};

export default SplashPart4;