"use client";

import { shortenAddress } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const { connectWallet } = usePrivy();
  const { address } = useAccount();

  return (
    <div className=" relative z-40 h-28 w-full max-w-[112rem] px-2  py-6 md:px-10">
      <Link
        className="absolute left-[50%] top-[50%] flex h-full w-[300px] -translate-x-[50%] -translate-y-[50%] cursor-pointer items-center justify-center overflow-hidden"
        href="/"
      >
        <Image
          src="/assets/bullas_logo.png"
          alt="logo"
          width={400}
          height={400}
          className=" h-32 w-full object-cover"
        />
      </Link>
      <div className="flex h-full w-full items-center justify-between ">
        <div className="hidden flex-row items-center justify-center gap-3 md:flex">
          <motion.a
            className=" cursor-pointer rounded-full border-[1px] border-[#FEF7E721] bg-[#FEF7E712] p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://discord.com/invite/bullas"
            target="_blank"
          >
            <FaDiscord className="h-6 w-6 text-[#FEF7E7]" />
          </motion.a>
          <motion.a
            className="cursor-pointer rounded-full border-[1px] border-[#FEF7E721] bg-[#FEF7E712] p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://twitter.com/TheBullas_"
            target="_blank"
          >
            <FaXTwitter className="h-6 w-6 text-[#FEF7E7]" />
          </motion.a>
        </div>
        {address ? (
          <div className="group relative hidden md:flex">
            <button className="relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#F5F0D2] bg-[#F74E2D] px-8 py-3 font-bold italic text-[#F5F0D2] transition-all ease-linear group-hover:translate-y-1">
              <p>{shortenAddress(address)}</p>
              <Image
                src="/assets/bullas_vector.png"
                alt="bullas_vector"
                width={21}
                height={21}
              />
            </button>
            <div className="absolute bottom-[-6px] left-0 z-10 w-full rounded-full border-[1px] border-[#F5F0D2] bg-[#F5F0D2] px-8 py-3 text-[#F5F0D2]">
              Connect Wallet
            </div>
          </div>
        ) : (
          <div className="group relative hidden md:flex ">
            <button
              className="relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#F5F0D2] bg-[#F74E2D] px-8 py-3 font-bold italic text-[#F5F0D2] transition-all ease-linear group-hover:translate-y-1"
              onClick={connectWallet}
            >
              Connect Wallet
              <Image
                src="/assets/bullas_vector.png"
                alt="bullas_vector"
                width={21}
                height={21}
              />
            </button>
            <div className="absolute bottom-[-6px] left-0 z-10 w-full rounded-full border-[1px] border-[#F5F0D2] bg-[#F5F0D2] px-8 py-3 text-[#F5F0D2]">
              Connect Wallet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
