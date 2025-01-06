"use client";

import Navbar from "@/components/navbar";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MeetPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start bg-[#275933]">
      <Navbar />
      <Section1 />
      <Section3 />
    </div>
  );
};

export default MeetPage;

const Section1 = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="relative flex h-auto w-full max-w-[112rem] flex-col items-center justify-start overflow-hidden bg-[#275933]  px-2 pb-16 md:px-10">
      <div className="flex w-full items-center justify-center space-x-2 rounded-full border-[1px] border-[#FEF7E7] py-4  font-light italic text-[#FEF7E7] md:space-x-10 ">
        <div className="relative">
          <Link
            className={
              pathname === "/"
                ? "relative z-50 cursor-pointer whitespace-nowrap px-4 text-[#FFC500]"
                : "relative z-50 cursor-pointer whitespace-nowrap px-4 text-[##F5F0D255] hover:text-[#FFC500]"
            }
            href="/"
          >
            Home
          </Link>
          {pathname === "/" && (
            <Image
              src="/assets/navbar_line.png"
              alt="logo"
              width={75}
              height={75}
              className="absolute left-1/2 top-[40%] z-0 -translate-x-1/2 object-cover"
            />
          )}
        </div>
        <div className="relative">
          <Link
            className={
              pathname === "/meet"
                ? "relative z-50 cursor-pointer whitespace-nowrap px-4 text-[#FFC500]"
                : "relative z-50 cursor-pointer whitespace-nowrap px-4 text-[##F5F0D255] hover:text-[#FFC500]"
            }
            href="/meet"
          >
            Meet the Wankers
          </Link>
          {pathname === "/meet" && (
            <Image
              src="/assets/navbar_line.png"
              alt="logo"
              width={75}
              height={75}
              className="absolute left-1/2 top-[40%] z-0 -translate-x-1/2 object-cover"
            />
          )}
        </div>
        <div className="relative">
          <Link
            className={
              pathname === "/game"
                ? "relative z-50 cursor-pointer whitespace-nowrap px-4 text-[#FFC500]"
                : "relative z-50 cursor-pointer whitespace-nowrap px-4 text-[##F5F0D255] hover:text-[#FFC500]"
            }
            href="/game"
          >
            Wank Da Bear
          </Link>
          {pathname === "/game" && (
            <Image
              src="/assets/navbar_line.png"
              alt="logo"
              width={75}
              height={75}
              className="absolute left-1/2 top-[40%] z-0 -translate-x-1/2 object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex h-auto w-full flex-col items-center justify-center">
        <div className="relative my-20">
          <p className="relative z-10 text-center text-5xl font-black italic text-[#FFC500] md:text-7xl">
            Meet The Wankers
          </p>
          <Image
            src="/assets/meet_sweat.png"
            alt=""
            width={90}
            height={90}
            className="absolute right-[-70px] top-[-40px] object-cover"
          />
          <Image
            src="/assets/meet_line.png"
            alt=""
            width={300}
            height={300}
            className="absolute bottom-[-25px] right-[0px] z-0 object-cover"
          />
        </div>
        <div className="relative h-auto w-full rounded-3xl border-[1px] border-[#FEF7E7] bg-[#FFFFFF10] p-4">
          <div className="relative grid h-auto w-full grid-cols-2 gap-x-6 gap-y-12 overflow-hidden rounded-3xl  p-4 md:grid-cols-4">
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla4.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla4.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla4.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla4.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla5.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla5.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla5.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla5.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla6.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla6.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla6.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla6.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla7.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla7.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla7.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla7.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla8.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla8.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla8.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla8.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla9.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla9.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla9.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
            <div className=" h-auto w-full cursor-pointer overflow-hidden rounded-xl border-[1px] border-[#ffffff] bg-[#275933] hover:bg-[#27593375]">
              <div className="relative aspect-square h-auto w-full border-b-[1px] border-[#ffffff]">
                <Image
                  src="/assets/bulla9.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-auto w-full items-center justify-between px-4 py-6">
                <p className="text-xl italic text-white">Old Meow</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section3 = () => {
  return (
    <div className="relative flex h-full w-full max-w-[112rem] flex-col items-center justify-center overflow-hidden bg-[#275933]  px-2 py-12 md:px-10 ">
      <div className=" absolute bottom-[112px] left-0 h-[1px] w-full bg-[#F5F0D2]" />
      <div className="relative mb-6 flex h-[36rem] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#FDB700] py-16">
        <Image
          src="/assets/section7.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <p className="mb-8 text-xl font-light italic text-[#F5F0D2] ">
        Incubated by <span className="font-bold">Retard Memeors</span>
      </p>
      <div className="mb-6 flex flex-row items-center justify-center gap-x-1">
        <p className=" text-lg font-light italic text-[#F5F0D2] md:text-xl ">
          Building on{" "}
          <span className="font-bold text-[#F74E2D]">Berachain</span>
        </p>
        <Image
          src="/assets/berachain.png"
          alt=""
          width={32}
          height={32}
          className="object-contain object-center"
        />
      </div>
    </div>
  );
};
