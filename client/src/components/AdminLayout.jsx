import { useSelector } from "react-redux";
import SearchForm from "./SearchForm";

const AdminLayout = ({children , title}) => {

const{currentUser} = useSelector((state) => state.Events);

return(
    <div>
        <div className="w-screen bg-blue-500 text-white h-auto flex justify-around items-center">
            <SearchForm/>
            <div className="flex gap-4 items-center ">
                <p>Welcome {currentUser.fullName} !</p>
                <button class="bg-white hover:bg-blue-200 text-blue-500 font-bold py-2 px-4 rounded-full">
                  logout
                </button>
            </div>
        </div>
    {children}
    </div>
)
}

export default AdminLayout;