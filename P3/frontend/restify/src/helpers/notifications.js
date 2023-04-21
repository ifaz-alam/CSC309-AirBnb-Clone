/*
Must be one of reservation_request, cancellation_request, reservation_approved, cancellation_approved, property_comment, test_notification, terminate"
*/
const sendNotification = async (user, notification, url) => {
    let request = await fetch(`http://localhost:8000/notifications/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify({
            username: user,
            notification_type: notification,
            link: url,
        }),
    });
    let response = await request.json();
    console.log(response);
    return true;
};

module.exports = {
    sendNotification,
}