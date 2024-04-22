import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/perfilPicture.webp";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown() {
  const [user, setUser] = useState({});
  const [picture,setPicture]=useState(defaultProfile)
  useEffect(()=>{
      if (localStorage.getItem("user")) {
        const img = JSON.parse(localStorage.getItem("user")).picture;
        setPicture(img)
        console.log(picture);

    }

  },[])
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    setUser(usuario);
  }, []);
  // console.log(usuario);
  const navigate = useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="h-8 w-8 relative flex rounded-full text-sm m-0 p-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <img
            className="h-8 w-8 rounded-full"
            src={picture}
            alt=""
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="/Profile/perfil"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account settings
                </a>
              )}

            </Menu.Item> */}
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item> */}
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}