import { useEffect, useState, createContext } from "react";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		if (notifications.length) {
			notifications.forEach((note, index) =>
				setTimeout(() => {
					setNotifications((oldMessages) => oldMessages.filter((oldMessage) => oldMessage !== note));
				}, 5000 + index * 5000)
			);
		}
	}, [notifications]);

	return (
		<NotificationContext.Provider value={{ notifications, setNotifications }}>
			{children}
		</NotificationContext.Provider>
	);
};
