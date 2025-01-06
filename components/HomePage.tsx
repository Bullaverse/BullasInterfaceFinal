import Navbar from "@/components/navbar";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDiscord } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start bg-[#275933]">
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </div>
  );
};

export default HomePage;

const Section1 = () => {
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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative mb-8 mt-24">
          <p className="relative z-10 text-center text-5xl font-black italic text-[#FFC500] md:text-7xl">
            Welcome To The Wild World <br /> of Bullas of Berachain!
          </p>
          <Image
            src="/assets/section1_crown.png"
            alt=""
            width={90}
            height={90}
            className="absolute right-[30%] top-[-55px] object-cover"
          />
          <Image
            src="/assets/section1_line.png"
            alt=""
            width={300}
            height={300}
            className="absolute bottom-[-40px] right-[100px] z-0 object-cover"
          />
        </div>
        <p className="mb-12 w-3/4 text-center text-lg italic text-[#FEF7E7] md:w-2/4 md:text-xl">
          No, your eyes aren&apos;t lying to you that&apos;s not only Beras
          living on Berachain. In fact, Beras can&apos;t live without Bullas.
        </p>
        <div className="relative h-auto w-full rounded-3xl border-[1px] border-[#FEF7E7] p-4">
          <div className="relative h-96 w-full overflow-hidden  rounded-3xl">
            <Image
              src="/assets/section1.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <Image
        src="/assets/section1_circle.png"
        alt=""
        width={175}
        height={175}
        className="absolute bottom-[360px] right-[-40px] z-40 object-cover"
      />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="relative flex h-full w-full max-w-[112rem] flex-col items-center justify-start overflow-hidden bg-[#FEF7E7] px-2  py-24 md:px-10">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <p className="mb-16 w-[90%] text-center text-5xl font-black italic text-[#275933]">
          It&apos;s not bearish bullas, though, but giga bullish bullas. So
          bullish that they can make the most bearish bera bullish. No bullshit!
        </p>
        <div className="relative mb-16">
          <div className="relative mb-16 aspect-square h-96 overflow-hidden rounded-full border-[4px] border-[#275933] bg-[#F74E2D] p-4">
            <Image
              src="/assets/section2.png"
              alt=""
              fill
              className="mt-6 object-cover"
            />
          </div>
          <div className="group absolute bottom-[-24px] left-1/2 mb-20 hidden -translate-x-1/2 text-lg md:flex md:text-xl">
            <button
              onClick={() => {
                window.open("https://discord.com/invite/bullas", "_blank");
              }}
              className="relative z-50 flex flex-row items-center justify-center gap-x-2 whitespace-nowrap rounded-full border-[1px] border-[#275933] bg-[#FDB700] px-8 py-3 font-bold italic text-[#275933] transition-all ease-linear group-hover:translate-y-1"
            >
              <FaDiscord />
              <p>Get Crazy With Us</p>
            </button>
            <div className="absolute bottom-[-6px] left-0 z-10 w-full rounded-full border-[1px] border-[#275933] bg-[#275933] px-8 py-3 text-[#275933]">
              Get Crazy With Us
            </div>
            <Image
              src="/assets/section2_lines.png"
              alt=""
              width={250}
              height={250}
              className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 object-cover"
            />
          </div>
        </div>
        <div className="h-auto w-full space-y-8 rounded-3xl bg-[#275933] p-8">
          <div className="flex h-auto w-full flex-col items-center justify-center rounded-3xl border-[1px] border-[#FEF7E7] py-16">
            <p className="mb-8 w-3/4 text-center text-5xl font-black text-[#FEF7E7] md:text-7xl">
              Every Bullas Respects <br />
              The Curve
            </p>
            <p className="relative w-3/4 text-center text-lg italic text-[#FEF7E7] md:text-xl ">
              Not all bullas are the same, though. There are left-curve bullas
              and mid-curve bullas, the righ-curve is a complete bera territory.
              <Image
                src="/assets/section2_arrow.png"
                alt=""
                width={100}
                height={100}
                className="absolute bottom-[-100px] left-[85%] object-cover"
              />
            </p>
          </div>
          <div className="flex h-auto w-full flex-col items-center justify-center gap-8 md:flex-row">
            <div className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-[1px] border-[#FEF7E7] py-16">
              <Image
                src="/assets/bulla1.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-[1px] border-[#FEF7E7] py-16">
              <Image
                src="/assets/bulla2.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-[1px] border-[#FEF7E7] py-16">
              <Image
                src="/assets/bulla3.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section3 = () => {
  return (
    <div className="relative flex h-full w-full max-w-[112rem] flex-col items-center justify-center overflow-hidden bg-[#275933] px-2 py-24  md:flex-row md:px-10">
      <div className="flex h-[72rem] w-full flex-col items-center justify-center py-16 md:w-[40%]">
        <div className="relative h-full w-full rounded-3xl border-[1px] border-[#FEF7E7] p-4">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl ">
            <Image
              src="/assets/section3.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <Image
            src="/assets/section1_circle.png"
            alt=""
            width={175}
            height={175}
            className="absolute right-[-75px] top-[-75px] z-40 object-cover"
          />
        </div>
      </div>
      <div className=" flex h-[72rem]  w-full flex-col items-center justify-center md:w-[60%]">
        <div className="flex h-full w-full flex-col items-start justify-center border-b-[1px] border-dashed border-[#FEF7E7]  p-16">
          <p className="mb-2 text-4xl font-extrabold italic text-[#FFC500]">
            Aka ( Retarded Bulla )
          </p>
          <p className="text-lg font-light italic text-white md:text-xl">
            Is retartded and, therefore, totally chill. He doesn&apos;t need any
            fundamentals to be bullish, gut feeling and good vibes is enough.
            Don&apos;t approach him when he finally sees red, though.
          </p>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-center border-b-[1px] border-dashed border-[#FEF7E7]  p-16">
          <p className="mb-2 text-4xl font-extrabold italic text-[#FFC500]">
            Aka ( Angry Bulla )
          </p>
          <p className="text-lg font-light italic text-white md:text-xl">
            Thinks he&apos;s the smartest kid on the block. Stubborn and
            arrogant, he spends lots of time time and energy to justify his
            bullishness, butting heads with other bullas in endless arguments.
            Of course, he hates Beras as they&apos;re retarded, but still win
            more than him.
          </p>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-center   p-16">
          <p className="mb-2 text-4xl font-extrabold italic text-[#FFC500]">
            The Beras
          </p>
          <p className="text-lg font-light italic text-white md:text-xl">
            They&apos;re retarded and can&apos;t even read, but it&apos;s just a
            display. In fact, beras are geniuses whose profound knowledge and
            bera senses make mid-curve bullas weep in jealousy.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 h-16 w-full">
          <Image
            src="/assets/section3_text.png"
            alt=""
            fill
            className=" z-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Section4 = () => {
  return (
    <div className="relative flex h-full w-full max-w-[112rem] flex-row items-center justify-center overflow-hidden bg-[#F74E2C] px-2  py-16 md:px-10">
      <Image
        src="/assets/section4_grid.png"
        alt=""
        fill
        className="absolute left-0 top-0 z-0 object-cover"
      />
      <div className="z-10 flex h-full w-full flex-col items-center justify-center">
        <Image
          src="/assets/section4_stars.png"
          alt=""
          width={175}
          height={175}
          className="relative mb-8 object-cover"
        />
        <p className="mb-16 w-full text-center text-5xl font-black text-[#FEF7E7] md:w-[90%] md:text-7xl">
          Recently, A Moola War Broke Out Between Angry Bullas and Chill Beras.
        </p>
        <div className="h-auto w-full space-y-8 rounded-3xl bg-[#FEF7E7] p-8">
          <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-[1px] border-[#275933] py-16">
            <Image
              src="/assets/section4.png"
              alt=""
              fill
              className="object-cover"
              sizes="90vw"
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <p className="w-[95%] text-center text-2xl italic text-[#275933] md:text-3xl">
              Both want to take a hold of the mysterious Cosmic Bera, the
              unwordly creature of the Berachain land, the alpha and omega of
              the bera universe, whose honey-filled udders churn out the sweet,
              sweet liquid gold that fuels the crypto markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section5 = () => {
  return (
    <div className="relative flex h-full w-full max-w-[112rem] flex-row items-center justify-center overflow-hidden bg-[#275933] px-2  pb-24 pt-44 md:px-10 ">
      <div className="absolute left-[-10px] top-0 h-32 w-[110%]">
        <Image
          src="/assets/section5_header.png"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-center">
        <p className="mb-3 text-left text-4xl font-black italic text-[#FEF7E7] md:text-5xl">
          Will Bulla&apos;s Stubbornness And Sharp Horns
        </p>
        <p className="mb-12 text-left text-4xl font-black italic text-[#FEF7E7] md:text-5xl">
          Finally Bring Bullas To Victory?
        </p>
        <p className="mb-3 text-left text-4xl font-black italic text-[#FEF7E7] md:text-5xl">
          Or Will Beras Outsmart Bullas With Their
        </p>
        <p className="mb-12 text-left text-4xl font-black italic text-[#FEF7E7] md:text-5xl">
          Dirty Bera Tricks?
        </p>
        <div className="group relative mb-20 hidden text-lg md:flex md:text-xl">
          <button className=" relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#F5F0D2] bg-[#F74E2D] px-8 py-3 font-bold italic text-[#F5F0D2] transition-all ease-linear group-hover:translate-y-1">
            <p>Bulla&apos;s Collection</p>
            <ArrowUpRight />
          </button>
          <div className="absolute bottom-[-6px] left-0 z-10 w-full rounded-full border-[1px] border-[#F5F0D2] bg-[#F5F0D2] px-8 py-3 text-[#F5F0D2]">
            Bulla&apos;s Collection
          </div>
        </div>
        <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-[1px] border-[#FEF7E7] py-16">
          <Image
            src="/assets/section5.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Section6 = () => {
  return (
    <div className="relative flex h-full w-full max-w-[112rem] flex-col items-center justify-center overflow-hidden bg-[#275933] px-2  py-24 md:px-10">
      <Image
        src="/assets/section6_left.png"
        alt=""
        height={175}
        width={175}
        className="absolute left-0 top-1/2 -translate-y-1/2 object-cover object-bottom"
      />
      <Image
        src="/assets/section6_right.png"
        alt=""
        height={175}
        width={175}
        className="absolute right-0 top-1/2 -translate-y-1/2 object-cover object-bottom"
      />
      <p className="mb-16 w-[90%] text-center text-4xl font-black text-[#FEF7E7] md:text-5xl">
        The Only Way To Find Out Is To Join The Moola Wars And See For Yourself!
      </p>
      <div className="group relative mb-20 hidden text-lg md:flex md:text-xl">
        <button
          onClick={() => {
            window.open("https://discord.com/invite/bullas", "_blank");
          }}
          className=" relative z-50 flex flex-row items-center justify-center gap-x-2 rounded-full border-[1px] border-[#275933] bg-[#FDB700] px-8 py-3 font-bold italic text-[#275933] transition-all ease-linear group-hover:translate-y-1"
        >
          <FaDiscord />
          <p>Get Crazy With Us</p>
        </button>
        <div className="absolute bottom-[-6px] left-0 z-10 w-full rounded-full border-[1px] border-[#F5F0D2] bg-[#F5F0D2] px-8 py-3 text-[#F5F0D2]">
          Get Crazy With Us
        </div>
      </div>
    </div>
  );
};

const Section7 = () => {
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
      <p className="mb-8 text-lg font-light italic text-[#F5F0D2] md:text-xl ">
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
