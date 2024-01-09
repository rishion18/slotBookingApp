import { useNavigate } from "react-router-dom";
const EventCard = ({item}) => {

  const navigate = useNavigate();

  const handleEventSelection = () => {
    navigate(`/datepicker/${item._id}`);
  }

    return (
        <div className="bg-white rounded-lg border p-4 max-h-96" onClick={handleEventSelection}>
        <img src={item.eventLogo} alt="Placeholder Image" className="w-full h-48 rounded-md object-cover"/>
        <div className="px-1 py-4">
          <div className="font-bold text-xl mb-2">{item.eventName}</div>
          <p className="text-gray-700 text-base">
            {item.eventDescription}
          </p>
        </div>
      </div>
    )
}

export default EventCard;