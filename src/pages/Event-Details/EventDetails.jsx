import { use, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router"
import { AuthContext } from "../../context/AuthContext";
import { useAxiousSecure } from "../../hooks/useAxiousSecure";
import { Loader } from "../Loader/Loader";
import moment from "moment";
import { Fade } from "react-awesome-reveal";

export const EventDetails = ()=>{
    const {user , isDark} = use(AuthContext)
    const navigate = useNavigate();
    const axiousSecure = useAxiousSecure();
    const {id} = useParams();
    const [eventData , setEventData] = useState(null)
    const [loading , setLoading] = useState(true);
    
    const fetchingData = ()=>{
        axiousSecure.get(`https://eventra-server.vercel.app/eventDetails/${id}`).then((res)=>{
          setEventData(res.data)
          setLoading(false)
        }).catch(error => console.log(error))
      }


    useEffect(()=>{
      fetchingData();
    },[])

    useEffect(() => {
        document.title = "Event-Details - Eventra";
        return () => {
          document.title = "Eventra"; // reset on unmount
        };
      }, []);

   if(loading){
    return <Loader/>
   }

    const {_id,ThumbPhoto,description,eventDate,eventLocation,eventTitle,eventType,userEmail} = eventData ;

    const originalDate = eventDate;
      const formattedDate = moment
        .utc(originalDate)
        .utcOffset(6 * 60)
        .format("DD/MM/YYYY");

    const handleJoinEvent = ()=>{

      const joinedEventData = {
        ThumbPhoto,
        description,
        eventDate,
        eventLocation,
        eventTitle,
        eventType,
        userEmail:user.email,
        userName:user.displayName,
        userPhoto:user.photoURL,
      }


      axiousSecure.post("https://eventra-server.vercel.app/joinedEvents",joinedEventData).then((response)=>{
        if(response.data.insertedId){
          swal(" Joined a event successfully!", "Welcome to HobMeet", "success");
          navigate("/joined-events")
        }
      }).catch(error => console.log(error))

      
    }

    return(
        <section className="md:pt-50 pt-30 min-h-screen pb-10 container mx-auto px-3 md:px-6 lg:px-8 xl:px-20">
          <button onClick={()=>navigate("/")} className={`btn mb-10 shadow-none border-none ${isDark? "bg-[#006d77] text-white": "bg-[#e4c1f9] text-black"}`}>Go Back</button>
          <Fade>
              <div className={`px-3 md:px-20 md:py-20 py-4 card lg:card-side border-2 rounded-2xl  ${isDark ? "bg-gradient-to-l from-[#02272b] to-[#000000] border-black":" bg-gradient-to-l from-white to-[#eee5f1] border-white"}`}>
            <figure className="w-full">
              <img
                src={ThumbPhoto}
                alt="Movie"
                className="rounded-2xl h-[300px] w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title lg:text-3xl text-2xl">{eventTitle}</h2>
              <p className=""><span className="font-medium">Event Type :</span> <span className={` text-xs py-2 px-4 rounded-full ${isDark ? "bg-[#02272b]":"bg-fuchsia-100"}`}>{eventTitle}</span></p>
              <p className=""><span className="font-medium">Event Date :</span> {formattedDate}</p>
              <p className=""><span className="font-medium">Location :</span> {eventLocation}</p>
              <p className=""><span className="font-medium">Description :</span> {description}</p>
              <div className="card-actions ">
                <button onClick={handleJoinEvent} className={`btn shadow-none border-none ${isDark? "bg-[#006d77] text-white" : "bg-[#e4c1f9] text-black"}`}>Join Event</button>
              </div>
            </div>
          </div>
          </Fade>
        </section>
    )
}