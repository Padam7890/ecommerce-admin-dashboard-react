import React, { useEffect, useState } from "react";
import http from "../../Utils/http";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    user();
  }, []);
  const user = async () => {
    try {
      const res = await http.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      setRoles(res.data.user.roles);
    } catch (error) {
      console.log(error);
    }
  };

  const changepass = ()=>{
    nav('/change_password')
  }
  return (
    <div class="hidden space-y-6 p-10 pb-16 md:block bg-white">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
        <p class="text-muted-foreground"></p>
      </div>
      <div class="shrink-0 bg-border h-[1px] w-full"></div>
      <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          <a
            class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
          >
            Profile
          </a>
    
        </nav>

        <div class="flex-1 flex gap-2 flex-col lg:max-w-2xl">
          <h2 class="text-lg font-bold tracking-tight">Account</h2>
          <p class="text-sm text-muted-foreground">
            Name: <strong>{name}</strong>
          </p>
          <p class="text-sm text-muted-foreground">
            Email: <strong>{email}</strong>
          </p>
          {roles.map((role) => (
            <p class="text-sm text-muted-foreground">
              Roles: <strong>{role.name}</strong>
            </p>
          ))}
          <div className="forgetpassword">
            <Button
            onClick={()=>changepass()}
              title=""
              className=" mt-5 bg-green-700 hover:bg-green-900"
            >Change Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
