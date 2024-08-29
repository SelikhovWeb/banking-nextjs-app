import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarFooter = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAccount()
      .then((res) => {
        console.log(res);
        router.push("/sign-in");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <p className="text-14 truncate font-normal text-gray-700">
          {user?.name}
        </p>
        <p className="text-14 truncate font-semibold text-gray-700">
          {user?.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogout}>
        <Image src={"icons/logout.svg"} fill alt="logout" />
      </div>
    </footer>
  );
};

export default SidebarFooter;
