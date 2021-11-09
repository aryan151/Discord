import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Splash.module.css';


const SplashPart2 = () => {


    return (
        <div
            className={styles.splash_body_container}
        >
            <div
                className={styles.splash_body_header}
            >
                <h2>Invite Only.</h2>
                <h3>You Pick Who Belongs</h3>
                <p>After Hours servers are organized into topic-based 
                        channels where you can collaborate, share, and 
                        just talk about your day without clogging up a 
                        group chat.</p>
            </div>
        </div>
    );
};  

export default SplashPart2;