import React from "react";
import Link from "next/link";
import { RxSketchLogo, RxDashboard } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSettings, FiUserPlus, FiUsers } from "react-icons/fi";
import { Tooltip } from "../basic/Tooltip";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col gap-y-5 items-center">
          <Link href="/">
            <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
              <RxSketchLogo size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full"></span>

          <Link href="/">
            <Tooltip message="Dashboard">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block">
                <RxDashboard size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/new">
            <Tooltip message="Add User">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block">
                <FiUserPlus size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/list">
            <Tooltip message="All Users">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block">
                <FiUsers size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/">
            <Tooltip message="Orders">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block">
                <HiOutlineShoppingBag size={20} />
              </div>
            </Tooltip>
          </Link>
          <Link href="/">
            <Tooltip message="Settings">
              <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block">
                <FiSettings size={20} />
              </div>
            </Tooltip>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
