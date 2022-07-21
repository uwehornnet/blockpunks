import { useContext } from "react";
import { NotificationContext } from "../context";

const Notification = () => {
	const { notifications } = useContext(NotificationContext);

	return notifications.length ? (
		<div className="absolute top-4 left-4 z-[90] bg-slate-800 rounded-xl p-4">
			<ul>
				{notifications.map((note, index) => {
					return (
						<li key={index}>
							<div className={`${note.type}-500`}>{note.message}</div>
						</li>
					);
				})}
			</ul>
		</div>
	) : null;
};

export default Notification;
