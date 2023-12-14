import Notification from "../Notification/Notification"

const NotificationTray = ({ notifications }) => {
    return (
        <>
            {notifications.map(
                n => 
                <Notification 
                    key={n.id} 
                    message={n.message} 
                    isError={n.isError} />
            )}
        </>
    )
}

export default NotificationTray
