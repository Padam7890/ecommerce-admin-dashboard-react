import { RxDashboard } from "react-icons/rx";
import { FaShoppingCart, FaUserCog } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { PiFlagBannerFill } from "react-icons/pi";
import { PiMetaLogoLight } from "react-icons/pi";
import { TbSpeakerphone } from "react-icons/tb";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";

import { FaCartShopping } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";


const navmenu = [
    {
        title: "Dashboard",
        icon: <RxDashboard size={19}/>,
        link: "/"
    },{
        title: "Products",
        icon: <FaShoppingCart size={19}/>,
        link: "/products"
    },{
        title: "Category",
        icon: <MdCategory size={19}/>,
        link: "/categories"
    },{
        title: "Subcategory",
        icon: <TbCategoryPlus size={19}/>,
        link: "/subcategories"
    },{
        title: "Banners",
        icon: <PiFlagBannerFill size={19}/>,
        link: "/banner"
    },
    {
        title: "Logos",
        icon: <PiMetaLogoLight size={19}/>,
        link: "/logos"
    },{
        title: "Advertisment",
        icon: <TbSpeakerphone size={19}/>,
        link: "/advertisment"
    },{
        title: "Menus",
        icon: <BsMenuButtonWideFill size={19}/>,
        link: "/menu"
    },{
        title: "Orders",
        icon: <FaCartShopping size={19}/>,
        link: "/order"
    },{
        title: "Cilents",
        icon: <MdGroups2 size={20}/>,
        link: "/client"
    },{
        title: "Profile",
        icon: <FaUserCog size={19}/>,
        link: "/profile"
    }
]

export  {navmenu};