"use client";

import { addPoints } from "@/app/actions";
import Navbar from "@/components/navbar";
import {
  GAME_DURATION_SECONDS,
  TIME_UNTIL_NEXT_GAME,
} from "@/constants/config";
import { fetcher } from "@/lib/fetcher";
import {
  calculateTimeRemaining,
  convertPointsToHoney,
  hasPlayedInLast24Hours,
} from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import useSWR from "swr";
import { useAccount } from "wagmi";
import dynamic from 'next/dynamic';
// Dynamic import for Lottie
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="h-[550px] w-[550px]" />
});

// Import animation data
import animationData from "../public/assets/bera.json";

const LeaguePage = () => {
  const { address } = useAccount();
  const { connectWallet } = usePrivy();
  const [gameState, setGameState] = useState<
    "default" | "started" | "completed"
  >("default");
  const { data, mutate } = useSWR<{
    discord_id: string;
    address: string;
    last_played: number;
    team: string;
  }>(
    address
      ? "/api/user?" +
          new URLSearchParams({
            address,
          })
      : null,
    fetcher,
  );
  const searchParams = useSearchParams();

  const { data: scoreData } = useSWR<{
    bullas: number;
    beras: number;
  }>("/api/scores", fetcher);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [gameTimeRemaining, setGameTimeRemaining] = useState<number>(
    GAME_DURATION_SECONDS,
  );
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    if (gameState === "started") {
      const interval = setInterval(() => {
        setGameTimeRemaining((currentGameTimeRemaining) => {
          if (currentGameTimeRemaining <= 0) {
            clearInterval(interval);
            setGameState("completed");
            return 0; // Return the updated state to avoid going negative
          }
          return currentGameTimeRemaining - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === "completed" && address) {
      addPoints(address, convertPointsToHoney(points), currentTime);
      mutate();
    }
  }, [gameState]);

  const hasPlayed = data?.last_played
    ? hasPlayedInLast24Hours(currentTime, data?.last_played)
    : false;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // If account is not registered then register user
  useEffect(() => {
    if (!data && address) {
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      }).then((response) => {
        mutate();
      });
    }
  }, [address, data]);

  // If account is registered and no discord account is linked then link discord account
  useEffect(() => {
    if (
      data &&
      !data.discord_id &&
      searchParams.get("token") &&
      searchParams.get("discord") &&
      address
    ) {
      fetch("/api/link-discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: searchParams.get("token"),
          discord: searchParams.get("discord"),
          address,
        }),
      })
        .then((response) => {
          mutate();
          toast.success("Successfully linked discord account.");
        })
        .catch((err) => {
          toast.error("Failed to link discord account.");
        });
    }
  }, [address, data, searchParams]);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (gameState === "started") {
        audioRef.current.volume = 0.25;
        if (isPlaying) {
          audioRef.current.play();
        }
      } else {
        setIsPlaying(false);
        audioRef.current.pause();
      }
    }
  }, [gameState, isPlaying]);

  const router = useRouter();
  const pathname = usePathname();

  const tweetText = `I MILKED THE DIGUSTING FKN HOLY BERA AND GOT ${convertPointsToHoney(points)} MOOLA 🤮 BULLAS OR BERAS, CHOOSE YOUR TEAM AND JOIN @THEBULLAS_ MOOLAWARS NOW!\n\nhttps://www.bullas.xyz/`;
  const text = encodeURIComponent(tweetText);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${text}`;

  return (
    <div className="flex h-auto w-full flex-col items-center justify-start bg-[#275933] md:h-screen">
      <div className="relative flex h-full w-full max-w-[112rem] flex-col items-center justify-start overflow-hidden bg-[#275933] ">
        {gameState !== "completed" && <Navbar />}
        <audio autoPlay loop ref={audioRef}>
          <source src="/assets/bullas.mp3" type="audio/mp3" />
        </audio>
        {(() => {
          switch (gameState) {
            case "default":
              return (
                <div className="relative flex max-h-[64rem] w-full grow flex-col items-start justify-center overflow-hidden bg-[#275933] px-2 md:px-10">
                  <Image
                    src="/assets/tap.png"
                    alt=""
                    width={200}
                    height={200}
                    className="right-[275px] top-[60%] hidden -translate-y-1/2 md:absolute"
                  />
                  <Image
                    src="/assets/hand.png"
                    alt=""
                    width={400}
                    height={400}
                    className="right-0 top-1/2 hidden -translate-y-1/2 md:absolute"
                  />
                  <div className="flex w-full items-center justify-center space-x-2 rounded-full border-[1px] border-[#FEF7E7] px-2 py-4  font-light italic text-[#FEF7E7] md:space-x-10 md:px-10">
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
                  <div className="mt-12 flex h-full w-full flex-col items-center justify-start">
                    <h1 className="relative mb-2 text-center text-5xl font-black italic text-[#FFC500] md:text-7xl">
                      <Image
                        src="/assets/star_icon.png"
                        alt=""
                        width={40}
                        height={40}
                        className="left-[-44px] top-[-16px] hidden md:absolute"
                      />
                      Wank Da Bear Game
                    </h1>
                    {/* <p className="text-center text-lg font-light italic text-white md:text-xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p> */}
                    <div className="absolute bottom-[-20px]">
                      <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        style={{ width: 550, height: 550 }}
                      />
                    </div>
                    <div className="absolute bottom-0 flex h-36 w-full items-center justify-center pt-4">
                      <Image
                        src="/assets/waves.png"
                        alt="waves"
                        fill
                        className="relative object-cover object-top"
                      />
                      <div className="group relative z-50">
                        {(() => {
                          if (!address) {
                            return (
                              <button
                                onClick={() => connectWallet()}
                                className="relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#F5F0D2] bg-[#F74E2D] px-10 py-3 font-bold italic text-[#F5F0D2] transition-all ease-linear group-hover:translate-y-1"
                              >
                                <p className="uppercase">Connect wallet</p>
                              </button>
                            );
                          }
                          if (hasPlayed) {
                            return (
                              <button
                                disabled
                                className="relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#F5F0D2] bg-[#F74E2D] px-10 py-3 font-bold italic text-[#F5F0D2] "
                              >
                                <p className="uppercase">
                                  {calculateTimeRemaining(
                                    (data?.last_played ?? 0) +
                                      TIME_UNTIL_NEXT_GAME,
                                    currentTime,
                                  )}
                                </p>
                              </button>
                            );
                          }
                          return (
                            <button
                              onClick={() => {
                                setGameState("started");
                                setIsPlaying(true);
                              }}
                              className="relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#F5F0D2] bg-[#F74E2D] px-10 py-3 font-bold italic text-[#F5F0D2] transition-all ease-linear group-hover:translate-y-1"
                            >
                              <p className="uppercase">Start the game now</p>
                            </button>
                          );
                        })()}
                        <div className="absolute bottom-[-6px] left-0 z-10 h-full w-full rounded-full bg-[#F74E2D23] px-10 py-3 text-2xl " />
                      </div>
                    </div>
                  </div>
                </div>
              );
            case "started":
              return (
                <div className="relative flex max-h-[64rem] w-full max-w-[112rem] grow flex-col items-start justify-center overflow-hidden bg-[#275933] px-2 md:px-10">
                  <div className="relative flex w-full items-center justify-center overflow-hidden rounded-full border-[1px] border-white bg-[#214D2C]  py-4 italic text-white">
                    <Image
                      src="/assets/grid.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                    <div className="absolute right-6 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-[1px] border-[#F74E2D57] bg-[#F74E2D31] p-4 py-2 font-ed text-5xl font-black not-italic text-[#F74E2D]">
                      <p className="text-xl font-black not-italic text-[#F74E2D]">
                        {points}
                      </p>
                    </div>
                    <div className="mr-4 flex flex-row items-center justify-center space-x-2 italic md:mr-8">
                      <p>The Bullas</p>
                      <Image
                        src="/assets/milk2.png"
                        alt=""
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <p>
                        {scoreData?.bullas &&
                          (scoreData?.bullas / 1000).toFixed(2)}
                        mL
                      </p>
                    </div>
                    <div className="flex w-[132px] items-center justify-center rounded-full border-[1px] border-[#F74E2D57] bg-[#F74E2D31] px-4 py-2 font-ed text-5xl font-black not-italic text-[#F74E2D]">
                      {Math.floor(gameTimeRemaining / 60)}:
                      {(gameTimeRemaining % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="ml-4 flex flex-row items-center justify-center space-x-2 italic md:ml-8">
                      <p>The Beras</p>
                      <Image
                        src="/assets/milk2.png"
                        alt=""
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <p>
                        {scoreData?.beras &&
                          (scoreData?.beras / 1000).toFixed(2)}
                        mL
                      </p>
                    </div>
                  </div>
                  <div className="mt-12 flex h-full w-full flex-col items-center justify-start rounded-xl bg-white/5">
                    <div className="absolute bottom-[-20px]">
                      <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        style={{ width: 550, height: 550 }}
                      />
                    </div>
                    <div className="absolute bottom-0 flex h-36 w-full items-center justify-center pt-4">
                      <div className="group relative z-50">
                        <Image
                          src="/assets/push_arrow_1.png"
                          alt="wank"
                          width={240}
                          height={240}
                          className="absolute -left-24 -top-12"
                        />
                        <button
                          onClick={() => {
                            setPoints(points + 1);
                          }}
                          className="relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#F5F0D2] bg-[#FFC500] px-10 py-3 font-black uppercase italic text-[#F74E2D] transition-all ease-linear group-hover:translate-y-1"
                        >
                          Smash
                        </button>
                        <Image
                          src="/assets/push_arrow_2.png"
                          alt="wank"
                          width={240}
                          height={240}
                          className="absolute -bottom-20 -right-32"
                        />
                        <div className="absolute bottom-[-6px] left-0 z-10 h-full w-full rounded-full bg-[#F74E2D] px-10 py-3 text-2xl " />
                      </div>
                    </div>
                  </div>
                </div>
              );
            case "completed":
              return (
                <div className="relative flex max-h-[64rem] w-full max-w-[112rem] grow flex-col items-start justify-center overflow-hidden bg-[#FEF7E7] px-2 pb-16 md:px-10 md:pb-0">
                  <div className="absolute left-[-10px] top-0 h-20 w-[110%]">
                    <Image
                      src="/assets/header.png"
                      alt=""
                      fill
                      className="object-cover object-bottom"
                    />
                  </div>
                  <div className="mt-24 flex h-full w-full flex-col items-center justify-start space-y-8">
                    <div className="flex w-full flex-col items-center justify-center p-4">
                      <p className="mb-2 text-center text-5xl font-black uppercase italic text-[#235C33] md:text-7xl">
                        OOGA BOOGAAAAA!
                      </p>
                      <p className="mb-8 text-center text-2xl font-medium uppercase italic text-[#235C33]">
                        YOU JUST WANK THE HOLY BERA, YOU STUPID FUCK
                      </p>
                      <p className="rounded-3xl bg-[#F74E2D12] px-6 py-4 text-center text-xl font-medium uppercase italic text-[#F74E2D]">
                        You milked{" "}
                        <span className="relative font-bold">
                          {convertPointsToHoney(points)}ml{" "}
                          <Image
                            src="/assets/meet_line.png"
                            alt=""
                            width={42}
                            height={42}
                            className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 object-contain"
                          />
                        </span>{" "}
                        of moola for {data?.team ?? "no one"}
                      </p>
                    </div>
                    <div className="relative h-auto w-full">
                      <div className="relative flex w-full flex-row items-center justify-center overflow-hidden rounded-3xl border-[1px] border-[#235C33] bg-[#F74E2D] p-2">
                        <div className="flex h-full w-full flex-col rounded-3xl border-[1px] border-dotted border-[#235C33] md:flex-row">
                          <div className="relative flex w-full flex-row items-center justify-center gap-x-4 border-r-[1px] border-dashed border-[#235C33] p-8 md:w-1/2 md:justify-end md:gap-x-12">
                            {data && data.team === "beras" && (
                              <Image
                                src="/assets/check.png"
                                alt=""
                                width={40}
                                height={40}
                                className="absolute right-4 top-4 object-contain"
                              />
                            )}
                            <div className=" flex flex-col items-start justify-center">
                              <div className="mb-4 flex flex-row items-center justify-center space-x-3 text-xl italic">
                                <p className="text-[#FEF7E7]">The Beras</p>
                                <Image
                                  src="/assets/milk.png"
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <p className="text-white">
                                  {scoreData?.beras &&
                                    (scoreData?.beras / 1000).toFixed(2)}
                                  mL
                                </p>
                              </div>
                              <div className="flex flex-row items-center justify-center space-x-3 text-xl italic">
                                <p className="font-medium text-[#FEF7E7]">
                                  The Beras
                                </p>
                                <Image
                                  src="/assets/milk.png"
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <p className="font-bold text-white">
                                  {scoreData?.beras &&
                                    (scoreData?.beras / 1000).toFixed(2)}
                                  mL
                                </p>
                              </div>
                            </div>
                            <div className="relative aspect-square h-36 w-36 md:h-56 md:w-56">
                              <Image
                                fill
                                alt=""
                                src="/assets/the_beras_logo.png"
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="relative flex w-full flex-row items-center justify-center gap-x-4 p-8 md:w-1/2 md:justify-start md:gap-x-12">
                            {data && data.team === "bullas" && (
                              <div>
                                <Image
                                  src="/assets/check.png"
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="absolute left-4 top-4 object-contain"
                                />
                              </div>
                            )}
                            <div className="relative aspect-square h-36 w-36 md:h-56 md:w-56">
                              <Image
                                fill
                                alt=""
                                src="/assets/the_bullas_logo.png"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <div className="mb-4 flex flex-row items-center justify-center space-x-3 text-xl italic">
                                <p className="font-medium text-[#FEF7E7]">
                                  The Bullas
                                </p>
                                <Image
                                  src="/assets/milk.png"
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <p className="font-bold text-white">
                                  {scoreData?.bullas &&
                                    (scoreData?.bullas / 1000).toFixed(2)}
                                  mL
                                </p>
                              </div>
                              <div className="flex flex-row items-center justify-center space-x-3 text-xl italic">
                                <p className="text-[#FEF7E7]">The Bullas</p>
                                <Image
                                  src="/assets/milk.png"
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <p className="text-white">
                                  {scoreData?.bullas &&
                                    (scoreData?.bullas / 1000).toFixed(2)}
                                  mL
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Image
                        src="/assets/completed1.png"
                        alt=""
                        width={130}
                        height={130}
                        className="absolute left-[-36px] top-[-36px] hidden object-contain md:flex"
                      />
                      <Image
                        src="/assets/completed2.png"
                        alt=""
                        width={140}
                        height={140}
                        className="absolute bottom-[-36px] left-[-36px] hidden object-contain md:flex"
                      />
                      <Image
                        src="/assets/completed3.png"
                        alt=""
                        width={150}
                        height={150}
                        className="absolute right-[-36px] top-[-48px] hidden object-contain md:flex"
                      />
                    </div>

                    <div className="group relative z-50 w-auto">
                      <button
                        onClick={() => window.open(tweetUrl, "_blank")}
                        className="relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#295A30] bg-[#FDB700] px-10 py-3 font-bold uppercase italic text-[#295A30] transition-all ease-linear group-hover:translate-y-1"
                      >
                        <FaXTwitter className="" />
                        Share your score on
                        <FaXTwitter className="" />
                      </button>
                      <div className="absolute bottom-[-6px] left-0 z-10 h-full w-full rounded-full bg-[#295A30] px-10 py-3 text-2xl " />
                    </div>
                    <div className="relative hidden h-[1px] w-full border-[1px] border-[#295A3032] md:flex">
                      <div className="absolute left-[-9px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#295A3032]" />
                      <div className="absolute right-[-9px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#295A3032]" />
                    </div>
                    <div className="relative mb-6 flex flex-row items-center justify-center gap-x-1">
                      <p className=" text-lg font-light italic text-black md:text-xl ">
                        Building on{" "}
                        <span className="font-bold text-[#F74E2D]">
                          Berachain
                        </span>
                      </p>
                      <Image
                        src="/assets/berachain.png"
                        alt=""
                        width={32}
                        height={32}
                        className="object-contain object-center"
                      />
                      <div className="absolute bottom-[-42px] left-[100%] hidden h-[256px] w-[256px]  md:flex">
                        <Image
                          src="/assets/arrow.png"
                          alt=""
                          fill
                          className="object-contain object-bottom"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default LeaguePage;
