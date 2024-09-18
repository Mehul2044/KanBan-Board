import PropTypes from "prop-types";
import styles from "../styles/UserAvatar.module.css";

function UserAvatar({user}) {
    return (
        <div
            title={user.name}
            className={styles.userAvatar}
            style={{
                backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}>
            {user.name.slice(0, 2).toUpperCase()}
            <span
                className={styles.availabilityDot}
                style={{
                    backgroundColor: user.available ? 'yellow' : 'grey',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    border: '2px solid white'
                }}
            />
        </div>
    )
}

UserAvatar.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserAvatar;