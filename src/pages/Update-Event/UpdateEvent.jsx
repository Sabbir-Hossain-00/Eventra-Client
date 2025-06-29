import { use, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate, useParams } from "react-router";
import { useAxiousSecure } from "../../hooks/useAxiousSecure";
import { Loader } from "../Loader/Loader";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import '../Create-Event/customDatePickerWidth.css';
import DatePicker from "react-datepicker";

export const UpdateEvent = ()=>{
    const {isDark , user} = use(AuthContext);
    const navigate = useNavigate();
    const axiousSecure = useAxiousSecure();
    const {id} = useParams();
    const [eventData , setEventData] = useState(null)
    const [loading , setLoading] = useState(true);
    const [updateEventDate , setUpdateEventDate] = useState(null)
    
    const fetchingData = ()=>{
        axiousSecure.get(`https://eventra-server.vercel.app/eventDetails/${id}`).then((res)=>{
          setEventData(res.data)
          setUpdateEventDate(res.data.eventDate)
          setLoading(false)
        }).catch(error => console.log(error))
      }


    useEffect(()=>{
      fetchingData();
    },[])
    useEffect(() => {
        document.title = "Update-Event - Eventra";
        return () => {
          document.title = "Eventra"; // reset on unmount
        };
      }, []);

   if(loading){
    return <Loader/>
   }

   const {_id,ThumbPhoto,description,eventDate,eventLocation,eventTitle,eventType,userEmail} = eventData ;
    


    const handleUpdateEvent = (e)=>{
        e.preventDefault();
        const form = e.target ;
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());
        const bdFormattedDate = moment(updateEventDate).utcOffset(6 * 60).format("YYYY-MM-DD HH:mm:ss");
        updatedData.eventDate = bdFormattedDate;

        axiousSecure.put(`https://eventra-server.vercel.app/events/${_id}` , updatedData).then((result)=>{
            if(result.data.modifiedCount){
                swal("Event Updated Successfully !", "", "success");
                navigate("/manage-events")
            }
        }).catch(error => console.log(error))

    }



    return(
        <>
            <div
              className={`mt-20 py-10 min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
                isDark
                  ? "bg-gradient-to-br from-[#006d77] via-[#0a9396] to-[#94d2bd] text-gray-300"
                  : "bg-gradient-to-br from-purple-300 via-blue-200 to-blue-300 text-gray-800"
              }`}
            >
              <form
                onSubmit={handleUpdateEvent}
                className={`backdrop-blur-lg border p-5 md:p-8 rounded-xl w-full max-w-xl shadow-2xl ${
                  isDark ? "bg-white/5 border-white/20" : "bg-white/10 border-white/50"
                }`}
              >
                <h2 className="text-2xl font-bold text-center mb-6">Update an Event</h2>
        
                <label className="block mb-2 font-medium">
                  Event Title:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="eventTitle"
                  defaultValue={eventTitle}
                  className="w-full p-2 mb-4 border rounded bg-transparent"
                  required
                />
        
                <label className="block mb-2 font-medium">
                  Event Type:<span className="text-red-500">*</span>
                </label>
                <select
                  name="eventType"
                  defaultValue={eventType}
                  required
                  className="w-full p-2 mb-4 border rounded bg-transparent"
                >
                  <option value="Plantation">Plantation</option>
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup</option>
                </select>
        
                <div className="flex md:flex-row flex-col gap-2 mb-4">
                  <div className="w-full">
                    <label className="block mb-2 font-medium">
                      User Name:<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="userName"
                      value={user.displayName}
                      readOnly
                      className="w-full p-2 border rounded bg-transparent"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2 font-medium">
                      User Email:<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="userEmail"
                      value={user.email}
                      readOnly
                      className="w-full p-2 border rounded bg-transparent"
                      required
                    />
                  </div>
                </div>
        
                <div className="flex md:flex-row flex-col gap-2 mb-4">
                  <div className="w-full">
                    <label className="block mb-2 font-medium">
                     Event Location:<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="eventLocation"
                      defaultValue={eventLocation}
                      className="w-full p-2 border rounded bg-transparent"
                      required
                    />
                  </div>
                </div>
        
                <label className="block mb-2 font-medium">
                 Event Date:<span className="text-red-500">*</span>
                </label>


                <div className="customDatePickerWidth">
                  <DatePicker
                  selected={updateEventDate}
                  onChange={(date)=> setUpdateEventDate(date)}
                  minDate={new Date()}
                  placeholderText="Enter Date"
                  className=" w-full p-2 mb-4 border rounded bg-transparent"
                  required
                />
                </div>
        
                <label className="block mb-2 font-medium">
                 Thumbnail Image URL:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ThumbPhoto"
                  defaultValue={ThumbPhoto}
                  className="w-full p-2 mb-4 border rounded bg-transparent"
                  required
                />
        
                <label className="block mb-2 font-medium">
                  Description:<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  defaultValue={description}
                  rows="4"
                  className="w-full p-2 mb-4 border rounded bg-transparent"
                  required
                ></textarea>
        
                <button
                  type="submit"
                  className={`btn w-full shadow-none border-none ${isDark? "bg-[#006d77] text-white": "bg-[#e4c1f9] text-black"}`}
                >
                  Update
                </button>
              </form>
            </div>
        </>
    )
}