"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
          <Image
            src="icons/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="size-[34px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Banking App</h1>
        </Link>
        {sidebarLinks.map((link, idx) => {
          const isActive =
            link.route === pathname || pathname.startsWith(`/${link.route}`);

          return (
            <Link
              key={idx}
              href={link.route}
              className={cn("sidebar-link", {
                "bg-bankGradient": isActive,
              })}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({
                    "brightness-[3] invert-0": isActive,
                  })}
                />
              </div>
              <p
                className={cn("sidebar-label", {
                  "!text-white": isActive,
                })}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
        {/* User info */}
      </nav>

      {/* Footer */}
    </section>
  );
};

export default Sidebar;
