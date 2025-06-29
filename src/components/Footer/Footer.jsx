import { use } from "react"
import { AuthContext } from "../../context/AuthContext"
import { NavLink } from "react-router"
import { FacebookIcon, Github, Instagram, Twitter } from "lucide-react"

export const Footer = ()=>{
  const {isDark , user} = use(AuthContext)
    return(
        <section className={` ${isDark ? "bg-black":"bg-white"}`}>
            <footer className="pt-20 py-12 px-6 sm:px-10 lg:px-20 shadow-lg">
              <div className="container mx-auto px-3 md:px-6 lg:px-8 xl:px-20 flex flex-col md:flex-row gap-12 md:gap-0  justify-between items-start">
            
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img className="w-12 mt-1" src={isDark? "https://i.ibb.co/bMvnf5GX/Chat-GPT-Image-Jun-16-2025-11-27-58-PM.png": "https://i.ibb.co/xKhwZF7w/Chat-GPT-Image-Jun-16-2025-11-29-55-PM.png"} alt="" />
                      <h3 className={`text-3xl font-medium tracking-wide ${isDark ? "text-[#006d77]" :"text-[#e4c1f9]"}`}>Eventra</h3>
                  </div>
                  <p className={`max-w-xs ${isDark? "text-white" : "text-black"} `}>
                    Bringing communities together through powerful events and shared purpose. Join us and be the change you want to see.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    
                     <a target="blank" href="https://www.facebook.com/jrsabbir00">
                       <FacebookIcon className={` hover:text-[#e4c1f9] transition duration-500 text-2xl cursor-pointer ${isDark ? "text-white" : "text-black"}`}/>
                     </a>
                     <a target="blank" href="https://www.instagram.com/dhali_sabbir_hossain/">
                        <Instagram className={` hover:text-[#e4c1f9] transition duration-500 text-2xl cursor-pointer ${isDark ? "text-white" : "text-black"}`}/>
                     </a>
                     <a target="blank" href="https://x.com/ms7398037">
                       <Twitter className={` hover:text-[#e4c1f9] transition duration-500 text-2xl cursor-pointer ${isDark ? "text-white" : "text-black"}`}/>
                     </a>
                     <a target="blank" href="https://github.com/Sabbir-Hossain-00">
                       <Github className={` hover:text-[#e4c1f9] transition duration-500 text-2xl cursor-pointer ${isDark ? "text-white" : "text-black"}`}/>
                     </a>
                  </div>
                </div>
            
                
                <div>
                  <h4 className={`text-xl font-semibold mb-4 ${isDark? "text-white" : "text-black"}`}>Quick Links</h4>
                  <ul className="space-y-3">
                    <li className={`${isDark ? "text-white" : ""}`}><NavLink to="/" className="text-sm font-medium">Home</NavLink></li>
                    <li className={`${isDark ? "text-white" : ""}`}><NavLink to="/upcoming-events" className="text-sm font-medium">Upcoming Events</NavLink></li>
                  </ul>
                </div>
            
                
                <div className={`${isDark? "text-white" : "text-black"}`}>
                  <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
                  <p className=" mb-2">Email: support@eventra.com</p>
                  <p className=" mb-2">Phone: +1 (555) 123-4567</p>
                  <p className="">Address: 123 Community Lane, Cityville</p>
                </div>
              </div>
            
              <div className="mt-12 text-center text-gray-600 text-xs">
                &copy; 2025 Eventra. All rights reserved.
              </div>
           </footer>

        </section>
    )
}