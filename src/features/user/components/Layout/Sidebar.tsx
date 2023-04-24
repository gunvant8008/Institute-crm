import React from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSettings, FiUserPlus, FiUsers } from "react-icons/fi";
import { Tooltip } from "../basic/Tooltip";
import { SiGriddotai } from "react-icons/si";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="gap-y-5 flex flex-col items-center">
          <Link href="/">
            <div className="inline-block p-3 text-white bg-orange-800 rounded-lg">
              <SiGriddotai size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full"></span>

          <Link href="/">
            <Tooltip message="Dashboard">
              <div className="hover:bg-gray-200 inline-block p-3 bg-gray-100 rounded-lg cursor-pointer">
                <RxDashboard size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/new">
            <Tooltip message="Add User">
              <div className="hover:bg-gray-200 inline-block p-3 bg-gray-100 rounded-lg cursor-pointer">
                <FiUserPlus size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/users">
            <Tooltip message="All Users">
              <div className="hover:bg-gray-200 inline-block p-3 bg-gray-100 rounded-lg cursor-pointer">
                <FiUsers size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/orders">
            <Tooltip message="Orders">
              <div className="hover:bg-gray-200 inline-block p-3 bg-gray-100 rounded-lg cursor-pointer">
                <HiOutlineShoppingBag size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/">
            <Tooltip message="Settings">
              <div className="hover:bg-gray-200 inline-block p-3 bg-gray-100 rounded-lg cursor-pointer">
                <FiSettings size={20} />
              </div>
            </Tooltip>
          </Link>
        </div>
      </div>
      <main className="w-full ml-20">{children}</main>
    </div>
  );
};

export default Sidebar;
